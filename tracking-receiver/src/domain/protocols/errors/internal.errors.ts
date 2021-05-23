import { BaseError } from './base.errors';

export class InternalError extends BaseError {
  constructor() {
    super(`Internal server error`);
    this.name = this.constructor.name;
  }
}
