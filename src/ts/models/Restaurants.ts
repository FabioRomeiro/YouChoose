import { Restaurant } from './Restaurant';

export class Restaurants {
  
  private _restaurants: Restaurant[] = [];

  add(restaurant: Restaurant): void {
    this._restaurants.push(restaurant);
  }

  getById(id: number): Restaurant {
    return this._restaurants.filter(restaurant => restaurant.id == id)[0];
  }

  toArray(): Restaurant[] {
    return [].concat(this._restaurants);
  }

  length(): number {
    return this._restaurants.length;
  }
}