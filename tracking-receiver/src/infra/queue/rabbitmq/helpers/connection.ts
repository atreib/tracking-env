// eslint-disable-next-line import/no-extraneous-dependencies
import amqplib, { Connection } from 'amqplib';

let instance: Connection;

export const getConnection = async (): Promise<Connection> => {
  if (!instance) instance = await amqplib.connect('amqp://localhost');
  return instance;
};
