const queue = require("./rabbitmq/connection");

const onReceiveMessage = (message) => {
    console.log(' ');
    console.log(new Date(), ' | ', message);
    console.log(' ');
}

const consume = (channel, queueName) => {
    queue.consume(channel, queueName, onReceiveMessage).then(() => {
        console.log('Started to listen to queue');
    }).catch((err) => {
        console.log('Could not start to listen to queue');
        console.error(err);
    });
}

const connect = async () => {
    const conn = await queue.connect();
    const channel = await queue.createChannel(conn, queueName);
    return channel;
}

const NEW_ROUTE_QUEUE = 'routeQueue';
const VEHICLE_TRACKING_QUEUE = 'trackingQueue';
const queueName = VEHICLE_TRACKING_QUEUE;

connect().then((channel) => {
    console.log(' ');
    console.log('  STARTING SIMULATION')
    console.log('  Connected to: ', queueName);
    console.log(' ');
    
    consume(channel, queueName);
});
