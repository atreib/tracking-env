/* eslint-disable max-classes-per-file */
import { IStoreTrackedVehicleMessage } from '../protocols/store-tracked-vehicle-message.protocols';
import { IQueue } from '../protocols/queue.protocols';
import { QueueTrackVehicles } from './queue-track-vehicles';

interface ISutTypes {
  sut: QueueTrackVehicles;
  queueNameStub: string;
  queueAdapterStub: IQueue;
  persistTrackedVehicleStub: IStoreTrackedVehicleMessage;
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

const makePersistTrackedVehicleStub = (): IStoreTrackedVehicleMessage => {
  class PersistTrackedVehicleStub implements IStoreTrackedVehicleMessage {
    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    async persist(message: string): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mock = true;
    }
  }
  return new PersistTrackedVehicleStub();
};

const makeSut = (): ISutTypes => {
  const queueNameStub = 'mock_queue_name';
  const queueAdapterStub = makeQueueStub();
  const persistTrackedVehicleStub = makePersistTrackedVehicleStub();
  const sut = new QueueTrackVehicles(queueNameStub, queueAdapterStub, persistTrackedVehicleStub);
  return { sut, queueNameStub, queueAdapterStub, persistTrackedVehicleStub };
};

describe('QueueTrackVehicles Test Suite', () => {
  it('Should consume queue with correct callback', async () => {
    const { sut, queueNameStub, queueAdapterStub, persistTrackedVehicleStub } = makeSut();
    const spyConsume = jest.spyOn(queueAdapterStub, 'consume');
    await sut.track();
    expect(spyConsume).toHaveBeenCalledWith(queueNameStub, persistTrackedVehicleStub.persist);
  });
});
