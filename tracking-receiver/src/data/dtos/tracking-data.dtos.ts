export interface ITrackingData {
  clientKey: string;
  eventDeparture: Date;
  eventArrival: Date;
  latitude: number;
  longitude: number;
  originVehicleId: number | string;
  plate: string;
  vehicleId: string;
  originRouteId: number | string;
  routeName: string;
  routeId: string;
  eventId: string;
}
