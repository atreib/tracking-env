export interface IQueue {
  /**
   * Consumes a queue and callback every message
   * @param queueName (string) The name of the queue
   * @param callback ((message: string) => void) Callback function called when a new message is received
   */
  consume(queueName: string, callback: (message: string) => Promise<void>): Promise<void>;
}
