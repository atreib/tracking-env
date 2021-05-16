const queue = require("./rabbitmq/connection");
const uniqueIdGenerator = require("./utils/uniqueIdGenerator");
const routePath = require('./data/belem-novo.json');
const queueName = 'routeQueue';

const generateRoutePath = () => {
    return routePath;
}

const receiveRouteInfo = () => {
    return {
        "client_key": 'd825a5f4-b27e-4efc-aaae-6716cbeb9454',
        "origin_route_id": '11366',
        "route_name": "Belém Novo", 
        "route_path": [...generateRoutePath()],
    };
}

const generateRouteInfo = async () => {
    const routeInfo = receiveRouteInfo();
    const uniqueId = uniqueIdGenerator.makeUniqueId(routeInfo.client_key, routeInfo.origin_route_id);
    return {
        ...routeInfo,
        "event_arrival": new Date(),
        "route_id": uniqueId,
    };
};

const sendRouteInfo = async (channel, routeInfo) => {
    const message = JSON.stringify(routeInfo);
    const response = await queue.sendToQueue(channel, queueName, message);
    return response;
}

const startSending = async (channel) => {
    try {
        console.log('Generating new route info...');
        const routeInfo = await generateRouteInfo();
        console.log('  Sending route info...');
        const response = await sendRouteInfo(channel, routeInfo);
        console.log('  Result: ', response);
    } catch (err) {
        console.log('  Result: ERROR');
        console.log(' ');
        console.error('[*]', err);
        console.log(' ');
    }
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