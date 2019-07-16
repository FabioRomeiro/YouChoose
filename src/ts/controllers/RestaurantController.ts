import { RestaurantsView, EditorModeView } from '../views/index';
import { Restaurant, Restaurants } from '../models/index';

export class RestaurantController {

  private _inputName: HTMLInputElement;
  private _inputPrice: HTMLInputElement;
  private _inputId: HTMLInputElement;
  private _priceDisplay: Element;

  private _restaurants = new Restaurants();
  private _restaurantsView = new RestaurantsView('[data-options-list]');
  private _editorModeView = new EditorModeView('data-feature');

  constructor() {
    this._inputName = <HTMLInputElement>document.querySelector('[data-form-input=name]');
    this._inputPrice = <HTMLInputElement>document.querySelector('[data-form-input=price]');
    this._inputId = <HTMLInputElement>document.querySelector('[data-form-input=id]');
    
    this._priceDisplay = document.querySelector("[data-price-display]");

    this._restaurantsView.update(this._restaurants);

    this._inputPrice.oninput = this._updatePriceSlider.bind(this);
    this._updatePriceSlider();
  }

  private cleanUpFields(): void {
    this._inputName.value = "";
    this._inputPrice.value = "0";
    this._inputId.value = "";
    this._updatePriceSlider();
  }

  private isFilled() {
    return this._inputPrice.value && this._inputName.value;
  }

  submit(event: Event): void {

    event.preventDefault();

    if (!this.isFilled()) return;
    
    let restaurant: Restaurant;

    if (this._inputId.value) {
      
      restaurant = this._restaurants.getById(parseInt(this._inputId.value));
      restaurant.name = this._inputName.value;
      restaurant.price = parseInt(this._inputPrice.value);
      
    } else {

      restaurant = new Restaurant(
        this._inputName.value,
        parseInt(this._inputPrice.value)
      );

      this._restaurants.add(restaurant);
    }

    this.cleanUpFields();
    this._restaurantsView.update(this._restaurants);
  }

  private _updatePriceSlider(): void {
    this._inputPrice.setAttribute("value", this._inputPrice.value);
    this._priceDisplay.innerHTML = '$'.repeat(parseInt(this._inputPrice.value));
  }

  addMode(event: Event): void {
    
    event.preventDefault();

    this._editorModeView.activateAddMode();
  }

  editMode(event: Event): void {
    event.preventDefault();

    this._editorModeView.activateEditMode();
  }

  removeMode(event: Event): void {
    event.preventDefault();

    this._editorModeView.activateRemoveMode();
  }

  menuMode(event: Event): void {
    event.preventDefault();

    this._editorModeView.activateMenuMode();
  }
}