const amqplib = require('amqplib');

const connect = async () => {
    const conn = await amqplib.connect("amqp://localhost");
    return conn;
}
   
const createChannel = async (conn, queueName) => {
    const channel = await conn.createChannel();
    await channel.assertExchange(queueName, 'fanout', { durable: true });
    return channel;
}
   
const sendToQueue = async (channel, queueName, message) => {
    const response = await channel.publish(queueName, '', Buffer.from(message));
    return response;
}

const consume = async (channel, queueName, callback) => {
    const q = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(q.queue, queueName, '');
    channel.consume(q.queue, (message) => {
        if (message) {
            callback((message.content.toString()));
            channel.ack(message);
        }
    });
}

module.exports = {
    connect,
    createChannel,
    consume,
    sendToQueue
}