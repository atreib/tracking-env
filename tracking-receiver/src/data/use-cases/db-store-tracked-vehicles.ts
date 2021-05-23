import { IStoreTrackedVehicles } from '../../domain/protocols/store-tracked-vehicles.protocols';
import { ITrackingData } from '../dtos/tracking-data.dtos';
import { IVehicleData } from '../dtos/vehicle-data.dtos';
import { adaptTrackingData } from '../helpers/adapt-tracking-data';
import { IQueue } from '../protocols/queue.protocols';
import { ITrackingRepository } from '../protocols/tracking-repository.protocols';

export class DbStoreTrackedVehicles implements IStoreTrackedVehicles {
  constructor(
    private readonly _queueName: string,
    private readonly _queue: IQueue,
    private readonly _trackingRepository: ITrackingRepository,
  ) {}

  async track(): Promise<void> {
    // TODO: Inject this callback as a class
    const trackedVehicleCallback = async (trackedMessage: string): Promise<void> => {
      const trackedData: ITrackingData = adaptTrackingData(trackedMessage);
      const { eventDeparture, latitude, longitude, plate, vehicleId, routeName, routeId } = trackedData;
      const vehicleData: IVehicleData = {
        lastEvent: eventDeparture,
        latitude,
        longitude,
        plate,
        vehicleId,
        routeName,
        routeId,
      };
      await this._trackingRepository.updateVehicleData(vehicleData);
    };
    await this._queue.consume(this._queueName, trackedVehicleCallback);
  }
}
