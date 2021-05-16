const { v4: uuidv4 } = require('uuid');
const queue = require("./rabbitmq/connection");
const uniqueIdGenerator = require("./utils/uniqueIdGenerator");
const routePath = require('./data/belem-novo.json');
const queueName = 'trackingQueue';
const FORWARD_DIRECTION = 1;
const BACKWARD_DIRECTION = 2;

let vehiclePosition = 0;
let vehicleDirection = FORWARD_DIRECTION;
const getNextPosition = () => {
    const position = routePath[vehiclePosition];

    if (vehicleDirection == FORWARD_DIRECTION) {
        vehiclePosition++;
        if (vehiclePosition == routePath.length) {
            vehicleDirection = BACKWARD_DIRECTION;
            vehiclePosition = routePath.length - 1;
            vehiclePosition--;
        }
    }
    else if (vehicleDirection == BACKWARD_DIRECTION) 
    {
        vehiclePosition--;
        if (vehiclePosition < 0) {
            vehicleDirection = FORWARD_DIRECTION;
            vehiclePosition = 0;
            vehiclePosition++;
        }
    }

    return {
        latitude: position.latitude,
        longitude: position.longitude,
    }
}

const receiveVehicleTrackingInfo = () => {
    return {
        "client_key": 'd825a5f4-b27e-4efc-aaae-6716cbeb9454',
        ...getNextPosition(),
        "event_departure": new Date(),
        "origin_vehicle_id": 1,
        "plate": 'IRC-7747',
        "origin_route_id": 11366,
        "route_name": "Casa", 
    };
}

const generateVehicleTrackingInfo = () => {
    const trackingInfo = receiveVehicleTrackingInfo();
    const routeUniqueId = uniqueIdGenerator.makeUniqueId(trackingInfo.client_key, trackingInfo.origin_route_id);
    const vehicleUniqueId = uniqueIdGenerator.makeUniqueId(trackingInfo.client_key, trackingInfo.origin_vehicle_id);
    return {
        ...trackingInfo,
        "vehicle_id": vehicleUniqueId,
        "route_id": routeUniqueId,
        "event_arrival": new Date(),
        "event_id": uuidv4(),
    };
};

const sendVehicleTrackingInfo = async (channel, vehicleTrackingInfo) => {
    const message = JSON.stringify(vehicleTrackingInfo);
    const response = await queue.sendToQueue(channel, queueName, message);
    return response;
}

const startSending = async (channel) => {
    try {
        console.log('Generating new vehicle tracking info...');
        const vehicleTrackingInfo = await generateVehicleTrackingInfo();
        const { vehicle_id, latitude, longitude } = vehicleTrackingInfo;
        console.log('  Vehicle received: ', vehicle_id);
        console.log('  Position: ', latitude, longitude);
        console.log('  Sending vehicle tracking info...');
        const response = await sendVehicleTrackingInfo(channel, vehicleTrackingInfo);
        console.log('  Result: ', response);
    } catch (err) {
        console.log('  Result: ERROR');
        console.log(' ');
        console.error('[*]', err);
        console.log(' ');
    }
    
    setTimeout(() => { startSending(channel); }, 2000);
}


const connect = async () => {
    const conn = await queue.connect();
    const channel = await queue.createChannel(conn, queueName);
    return channel;
}

connect().then((channel) => {
    console.log(' ');
    console.log('  STARTING SIMULATION')
    console.log('  Connected to: ', queueName);
    console.log(' ');
    
    startSending(channel);
});