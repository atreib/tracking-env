/* eslint-disable max-classes-per-file */
import { IVehicleData } from '../dtos/vehicle-data.dtos';
import { IQueue } from '../protocols/queue.protocols';
import { ITrackingRepository } from '../protocols/tracking-repository.protocols';
import { DbStoreTrackedVehicles } from './db-store-tracked-vehicles';

interface ISutTypes {
  sut: DbStoreTrackedVehicles;
  queueNameStub: string;
  queueAdapterStub: IQueue;
  trackingRepoStub: ITrackingRepository;
}

const makeQueueStub = (): IQueue => {
  class QueueStub implements IQueue {
    // eslint-disable-next-line class-methods-use-this
    async consume(queueName: string, callback: (message: string) => Promise<void>): Promise<void> {
      const mockJsonReturn = JSON.stringify({ mock: true });
      await callback(mockJsonReturn);
    }
  }
  return new QueueStub();
};

const makeTrackingRepository = (): ITrackingRepository => {
  class TrackingRepoStub implements ITrackingRepository {
    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    async updateVehicleData(vehicle: IVehicleData): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new TrackingRepoStub();
};

const makeSut = (): ISutTypes => {
  const queueNameStub = 'mock_queue_name';
  const queueAdapterStub = makeQueueStub();
  const trackingRepoStub = makeTrackingRepository();
  const sut = new DbStoreTrackedVehicles(queueNameStub, queueAdapterStub, trackingRepoStub);
  return { sut, queueNameStub, queueAdapterStub, trackingRepoStub };
};

describe('DbStoreTrackedVehicles Test Suite', () => {
  it('Should consume queue with correct callback', async () => {
    const { sut, queueNameStub, queueAdapterStub } = makeSut();
    const spyConsume = jest.spyOn(queueAdapterStub, 'consume');
    await sut.track();
    expect(spyConsume).toHaveBeenCalledWith(queueNameStub, expect.any(Function));
  });
});
