import { InternalError } from '../../domain/errors/internal.errors';
import { InvalidJsonMessageError } from '../../domain/errors/invalid-json-message.errors';
import { ITrackingData } from '../dtos/tracking-data.dtos';

export const adaptTrackingData = (trackedMessage: string): ITrackingData => {
  try {
    const trackedData = JSON.parse(trackedMessage);
    // TODO: check for empty/undefined values
    return {
      clientKey: trackedData.client_key,
      eventDeparture: trackedData.event_departure,
      eventArrival: trackedData.event_arrival,
      latitude: trackedData.latitude,
      longitude: trackedData.longitude,
      originVehicleId: trackedData.origin_vehicle_id,
      plate: trackedData.plate,
      vehicleId: trackedData.vehicle_id,
      originRouteId: trackedData.origin_route_id,
      routeName: trackedData.route_name,
      routeId: trackedData.route_id,
      eventId: trackedData.event_id,
    };
  } catch (err) {
    if (new Error(err).message.indexOf('SyntaxError') >= 0) throw new InvalidJsonMessageError();
    throw new InternalError();
  }
};
