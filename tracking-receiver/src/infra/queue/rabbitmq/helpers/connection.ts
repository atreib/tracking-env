// eslint-disable-next-line import/no-extraneous-dependencies
import amqplib, { Connection } from 'amqplib';

let instance: Connection;

export const getConnection = async (): Promise<Connection> => {
  // TODO: Create env var for rabbitmq connection url
  if (!instance) instance = await amqplib.connect('amqp://localhost');
  return instance;
};
