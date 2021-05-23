import { IStoreTrackedVehicles } from '../domain/protocols/store-tracked-vehicles.protocols';

export class VehiclesTracker {
  constructor(private readonly _vehiclesTracker: IStoreTrackedVehicles) {}

  track(): void {
    try {
      this._vehiclesTracker.track();
    } catch (err) {
      // TODO: Create a middleware for logging errors
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}
