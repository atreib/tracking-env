import { DbStoreTrackedVehicles } from '../data/use-cases/db-store-tracked-vehicles';
import { RabbitMQAdapter } from '../infra/queue/rabbitmq/rabbitmq-adapter';
import { MongoTrackingRepository } from '../infra/tracking-repository/mongodb/tracking-repository';
import { VehiclesTracker } from '../presentation/vehicles-tracker';

const queueName = 'trackingQueue';
const rabbitmqAdapter = new RabbitMQAdapter();
const trackingRepo = new MongoTrackingRepository();

const dbStoreTrackedVehicles = new DbStoreTrackedVehicles(queueName, rabbitmqAdapter, trackingRepo);
const vehiclesTracker = new VehiclesTracker(dbStoreTrackedVehicles);

console.log('starting up...');
vehiclesTracker.track().then(() => {
  console.log('  finished');
});
