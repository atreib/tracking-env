import { IStoreTrackedVehicleMessage } from '../protocols/store-tracked-vehicle-message.protocols';
import { ITrackingData } from '../dtos/tracking-data.dtos';
import { IVehicleData } from '../dtos/vehicle-data.dtos';
import { adaptTrackingData } from '../helpers/adapt-tracking-data';
import { ITrackingRepository } from '../protocols/tracking-repository.protocols';

export class DbStoreTrackedVehicleMessage implements IStoreTrackedVehicleMessage {
  constructor(private readonly _trackingRepository: ITrackingRepository) {}

  async persist(trackedMessage: string): Promise<void> {
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
  }
}
