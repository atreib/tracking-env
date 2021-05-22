import { IVehicleData } from "../dtos/vehicle-data.dtos";

export interface ITrackingStore {
  /**
   * Updates a vehicle data on our tracking store
   * @param vehicle (IVehicleData) our updated vehicle data
   * @returns (boolean) operation's sucess
   */
  updateVehicleData(vehicle: IVehicleData): boolean;
}
