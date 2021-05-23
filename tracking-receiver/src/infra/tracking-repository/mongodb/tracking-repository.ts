import { IVehicleData } from '../../../data/dtos/vehicle-data.dtos';
import { ITrackingRepository } from '../../../data/protocols/tracking-repository.protocols';
import { getConnection } from './helpers/connection';

export class MongoTrackingRepository implements ITrackingRepository {
  async updateVehicleData(vehicle: IVehicleData): Promise<boolean> {
    const connection = await getConnection();
    await connection.db
      .collection(vehicle.routeId)
      .findOneAndReplace({ _id: vehicle.vehicleId }, vehicle, { upsert: true });
    return true;
  }
}
