class RestaurantController {

  private _inputName;
  private _inputPrice;

  constructor() {
    this._inputName = document.querySelector('[name=name]');
    this._inputPrice = document.querySelector('[name=price]');
  }

  add(event) {
    event.preventDefault();

    const restaurant = new Restaurant(
      this._inputName.value,
      this._inputPrice.value
    );

    console.log(restaurant);
  }
}