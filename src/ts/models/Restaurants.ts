class Restaurants {
  
  private _restaurants: Restaurant[] = [];

  add(restaurant: Restaurant): void {
    this._restaurants.push(restaurant);
  }

  toArray(): Restaurant[] {
    return [].concat(this._restaurants);
  }
}