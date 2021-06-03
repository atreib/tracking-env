import { ITrackingData } from '../dtos/tracking-data.dtos';
import { IVehicleData } from '../dtos/vehicle-data.dtos';
import { adaptTrackingData } from '../helpers/adapt-tracking-data';
import { ITrackingRepository } from '../protocols/tracking-repository.protocols';
import { DbStoreTrackedVehicleMessage } from './db-store-tracked-vehicle-message';

interface ISutTypes {
  sut: DbStoreTrackedVehicleMessage;
  trackingRepoStub: ITrackingRepository;
}

const makeTrackingRepoStub = (): ITrackingRepository => {
  class TrackingRepoStub implements ITrackingRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateVehicleData(vehicle: IVehicleData): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new TrackingRepoStub();
};

const makeSut = (): ISutTypes => {
  const trackingRepoStub = makeTrackingRepoStub();
  const sut = new DbStoreTrackedVehicleMessage(trackingRepoStub);
  return { sut, trackingRepoStub };
};

const MOCK_TRACKED_MESSAGE = JSON.stringify({
  clientKey: 'mock_client_key',
  eventDeparture: new Date(),
  eventArrival: new Date(),
  latitude: 0.0,
  longitude: 0.0,
  originVehicleId: 'mock_',
  plate: 'mock_',
  vehicleId: 'mock_',
  originRouteId: 'mock_',
  routeName: 'mock_',
  routeId: 'mock_',
  eventId: 'mock_',
});

describe('DbStoreTrackedVehicleMessage Test Suite', () => {
  it('Should updateVehicleData with adapted data from message', async () => {
    const { sut, trackingRepoStub } = makeSut();
    const spyUpdate = jest.spyOn(trackingRepoStub, 'updateVehicleData');

    await sut.persist(MOCK_TRACKED_MESSAGE);

    const trackedData: ITrackingData = adaptTrackingData(MOCK_TRACKED_MESSAGE);
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

    expect(spyUpdate).toHaveBeenCalledWith(vehicleData);
  });
});
