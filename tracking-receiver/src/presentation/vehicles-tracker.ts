import { ITrackVehicles } from '../domain/protocols/track-vehicles.protocols';

export class VehiclesTracker {
  constructor(private readonly _vehiclesTracker: ITrackVehicles) {}

  async track(): Promise<void> {
    try {
      await this._vehiclesTracker.track();
    } catch (err) {
      // TODO: Create a middleware for logging errors
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}
