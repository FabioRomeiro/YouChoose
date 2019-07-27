import { Restaurant } from './Restaurant';

export class Restaurants {
  
  private _restaurants: Restaurant[] = [];

  add(restaurant: Restaurant): void {
    this._restaurants.push(restaurant);
  }

  removeById(id: number): void {
    let index: number;
    
    this._restaurants.some((restaurant, i)=> {
      if (restaurant.id == id) {
        index = i;
        return true;
      }
    });

    if (index >= 0) {
      this._restaurants.splice(index, 1);
    }
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