// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose, { Connection } from 'mongoose';

let instance: Connection;

export const getConnection = async (): Promise<Connection> => {
  if (!instance)
    instance = await mongoose.createConnection(
      'mongodb://mongoadmin:mongoadmin@localhost/vehicle-tracking?authSource=admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    );
  return instance;
};
