import { ITrackVehicles } from '../../domain/protocols/track-vehicles.protocols';
import { IStoreTrackedVehicleMessage } from '../protocols/store-tracked-vehicle-message.protocols';
import { IQueue } from '../protocols/queue.protocols';

export class QueueTrackVehicles implements ITrackVehicles {
  constructor(
    private readonly _queueName: string,
    private readonly _queue: IQueue,
    private readonly _callback: IStoreTrackedVehicleMessage,
  ) {}

  async track(): Promise<void> {
    await this._queue.consume(this._queueName, this._callback.persist);
  }
}
