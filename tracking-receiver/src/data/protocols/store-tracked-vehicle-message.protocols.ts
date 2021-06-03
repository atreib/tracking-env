export interface IStoreTrackedVehicleMessage {
  persist(trackedMessage: string): Promise<void>;
}
