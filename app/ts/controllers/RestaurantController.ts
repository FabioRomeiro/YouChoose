class RestaurantController {

  private _inputName: HTMLInputElement;
  private _inputPrice: HTMLInputElement;
  private _restaurants = new Restaurants();
  private _restaurantsView = new RestaurantsView('#restaurants-list');

  constructor() {
    this._inputName = <HTMLInputElement>document.querySelector('[name=name]');
    this._inputPrice = <HTMLInputElement>document.querySelector('[name=price]');
    this._restaurantsView.update(this._restaurants);
  }

  add(event: Event): void {

    event.preventDefault();

    const restaurant = new Restaurant(
      this._inputName.value,
      parseInt(this._inputPrice.value)
    );

    this._restaurants.add(restaurant);
    this._restaurantsView.update(this._restaurants);

    this._restaurants.toArray().forEach(console.log);
  }
}