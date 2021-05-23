import { BaseError } from './base.errors';

export class InvalidJsonMessageError extends BaseError {
  constructor() {
    super(`Invalid JSON message`);
    this.name = this.constructor.name;
  }
}
