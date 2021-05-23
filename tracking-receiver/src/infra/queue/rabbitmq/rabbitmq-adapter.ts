/* eslint-disable class-methods-use-this, import/no-extraneous-dependencies */
import { IQueue } from '../../../data/protocols/queue.protocols';
import { getConnection } from './helpers/connection';

export class RabbitMQAdapter implements IQueue {
  async consume(queueName: string, callback: (message: string) => Promise<void>): Promise<void> {
    const conn = await getConnection();
    const channel = await conn.createChannel();
    await channel.assertExchange(queueName, 'fanout', { durable: true });
    const q = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(q.queue, queueName, '');
    channel.consume(q.queue, (message) => {
      if (message) {
        callback(message.content.toString());
        channel.ack(message);
      }
    });
  }
}
