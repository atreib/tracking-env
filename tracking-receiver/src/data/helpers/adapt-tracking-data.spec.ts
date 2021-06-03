import { InternalError } from '../../domain/errors/internal.errors';
import { InvalidJsonMessageError } from '../../domain/errors/invalid-json-message.errors';
import { adaptTrackingData as sut } from './adapt-tracking-data';

describe('Tracked Data Message Adapter Test Suite', () => {
  it('Should throw InvalidJsonMessageError if message is invalid', () => {
    expect(() => {
      sut('<invalid_mock_message>');
    }).toThrow(new InvalidJsonMessageError());
  });

  it('Should throw InvalidJsonMessageError if message is invalid', () => {
    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => {
      const validJsonMock = JSON.stringify({ mock: true });
      sut(validJsonMock);
    }).toThrow(new InternalError());
  });
});
