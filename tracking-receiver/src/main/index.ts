import { DbStoreTrackedVehicleMessage } from '../data/use-cases/db-store-tracked-vehicle-message';
import { QueueTrackVehicles } from '../data/use-cases/queue-track-vehicles';
import { RabbitMQAdapter } from '../infra/queue/rabbitmq/rabbitmq-adapter';
import { MongoTrackingRepository } from '../infra/tracking-repository/mongodb/tracking-repository';
import { VehiclesTracker } from '../presentation/vehicles-tracker';

const queueName = 'trackingQueue';
const queueAdapter = new RabbitMQAdapter();
const trackDataRepository = new MongoTrackingRepository();

const storeTrackedVehicles = new DbStoreTrackedVehicleMessage(trackDataRepository);
const trackVehicles = new QueueTrackVehicles(queueName, queueAdapter, storeTrackedVehicles);
const vehiclesTracker = new VehiclesTracker(trackVehicles);

console.log('starting up...');
vehiclesTracker.track().then(() => {
  console.log('  finished');
});
