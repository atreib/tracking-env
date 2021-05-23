import { IStoreTrackedVehicles } from '../domain/protocols/store-tracked-vehicles.protocols';
import { VehiclesTracker } from './vehicles-tracker';

interface ISutTypes {
  sut: VehiclesTracker;
  vehiclesTrackerStub: IStoreTrackedVehicles;
}

const makeVehiclesTrackerStub = (): IStoreTrackedVehicles => {
  class VehiclesTrackerStub implements IStoreTrackedVehicles {
    // eslint-disable-next-line class-methods-use-this
    async track(): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mock = 'mock';
    }
  }
  return new VehiclesTrackerStub();
};

const makeSut = (): ISutTypes => {
  const vehiclesTrackerStub = makeVehiclesTrackerStub();
  const sut = new VehiclesTracker(vehiclesTrackerStub);
  return { sut, vehiclesTrackerStub };
};
describe('Vehicles Tracker Controller Test Suite', () => {
  it('Should call track implementation', () => {
    const { sut, vehiclesTrackerStub } = makeSut();
    const trackSpy = jest.spyOn(vehiclesTrackerStub, 'track');
    sut.track();
    expect(trackSpy).toHaveBeenCalled();
  });

  it('Should catch any error and log it on console', () => {
    const { sut, vehiclesTrackerStub } = makeSut();
    const err = new Error();
    const spyConsoleError = jest.spyOn(console, 'error');
    jest.spyOn(vehiclesTrackerStub, 'track').mockImplementationOnce(() => {
      throw err;
    });
    sut.track();
    expect(spyConsoleError).toHaveBeenCalledWith(err);
  });
});
