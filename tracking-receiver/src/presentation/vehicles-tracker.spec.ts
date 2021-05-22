import { IStoreTrackedVehicles } from "../domain/protocols/store-tracked-vehicles.protocols";
import { VehiclesTracker } from "./vehicles-tracker";

interface ISutTypes {
  sut: VehiclesTracker;
  vehiclesTrackerStub: IStoreTrackedVehicles;
}

const makeVehiclesTrackerStub = (): IStoreTrackedVehicles => {
  class VehiclesTrackerStub implements IStoreTrackedVehicles {
    track(): void {}
  }
  return new VehiclesTrackerStub();
}

const makeSut = (): ISutTypes => {
  const vehiclesTrackerStub = makeVehiclesTrackerStub();
  const sut = new VehiclesTracker(vehiclesTrackerStub);
  return { sut, vehiclesTrackerStub };
}
describe('Vehicles Tracker Controller Test Suite', () => {
  it('Should call track implementation', () => {
    const { sut, vehiclesTrackerStub  } = makeSut();
    const trackSpy = jest.spyOn(vehiclesTrackerStub, 'track');
    sut.track();
    expect(trackSpy).toHaveBeenCalled();
  });
});
