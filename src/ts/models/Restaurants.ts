import { Restaurant } from './Restaurant';

export class Restaurants {
  
  private _restaurants: Restaurant[] = [];

  public add(restaurant: Restaurant): void {
    this._restaurants.push(restaurant);
  }

  public removeById(id: number): void {
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

  public getById(id: number): Restaurant {
    return this._restaurants.filter(restaurant => restaurant.id == id)[0];
  }

  public toArray(): Restaurant[] {
    return [].concat(this._restaurants);
  }

  public toArrayOfActive(): Restaurant[] {
    return [].concat(this._restaurants.filter(restaurant => restaurant.active));
  }

  public hasActive(): boolean {
    return this._restaurants.some(restaurant => restaurant.active);
  }

  public length(): number {
    return this._restaurants.length;
  }

  public activeLength(): number {
    return this._restaurants.filter(restaurant => restaurant.active).length;
  }
}