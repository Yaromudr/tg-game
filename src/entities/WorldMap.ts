import { Location } from './Location';

export class WorldMap {
  locations: Location[];
  connections: Map<Location, Location[]>;

  constructor() {
    this.locations = [];
    this.connections = new Map();
  }

  // Метод для добавления локации
  addLocation(location: Location): void {
    this.locations.push(location);
    this.connections.set(location, []);
  }

  // Метод для связывания локаций
  connectLocations(location1: Location, location2: Location): void {
    this.connections.get(location1)?.push(location2);
    this.connections.get(location2)?.push(location1);
  }

  // Метод для получения связанных локаций
  getConnectedLocations(location: Location): Location[] {
    return this.connections.get(location) || [];
  }
}