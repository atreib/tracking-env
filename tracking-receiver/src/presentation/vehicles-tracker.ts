import { IVehiclesTracker } from '../domain/protocols/vehicles-tracker.protocols';

export class VehiclesTracker {
  constructor(private readonly _vehiclesTracker: IVehiclesTracker) {}

  track(): void {
    this._vehiclesTracker.track();
  }
}
