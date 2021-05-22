import { IStoreTrackedVehicles } from '../domain/protocols/store-tracked-vehicles.protocols';

export class VehiclesTracker {
  constructor(private readonly _vehiclesTracker: IStoreTrackedVehicles) {}

  track(): void {
    this._vehiclesTracker.track();
  }
}
