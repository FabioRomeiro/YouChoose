import { RestaurantsView, EditorModeView } from '../views/index';
import { Restaurant, Restaurants } from '../models/index';
import { ModeHelper } from '../helpers/index';

export class RestaurantController {

  private _inputName: HTMLInputElement;
  private _inputPrice: HTMLInputElement;
  private _inputId: HTMLInputElement;
  private _priceDisplay: Element;
  private _submitButtonLabel: Element;

  private _restaurants = new Restaurants();

  private _restaurantsView = new RestaurantsView('[data-options-list]');
  private _editorModeView = new EditorModeView('data-feature');

  private _modeHelper = new ModeHelper(this._updateList.bind(this), this._editorModeView);

  constructor() {
    this._inputName = <HTMLInputElement>document.querySelector('[data-form-input=name]');
    this._inputPrice = <HTMLInputElement>document.querySelector('[data-form-input=price]');
    this._inputId = <HTMLInputElement>document.querySelector('[data-form-input=id]');

    this._submitButtonLabel = <Element>document.querySelector('[data-submit-button]').childNodes[1];
    
    this._priceDisplay = document.querySelector("[data-price-display]");

    this._modeHelper.activateMenuMode(this._toggleFunction.bind(this));

    this._inputPrice.oninput = this._updatePriceSlider.bind(this);
    this._updatePriceSlider();
  }

  private _updateList() {
    this._restaurantsView.update(this._restaurants);
  }

  private _cleanUpFields(): void {
    this._inputName.value = "";
    this._inputPrice.value = "0";
    this._inputId.value = "";
    this._updatePriceSlider();
  }

  private _isFilled() {
    return this._inputPrice.value && this._inputName.value;
  }

  private _updatePriceSlider(): void {
    this._inputPrice.setAttribute("value", this._inputPrice.value);
    this._priceDisplay.innerHTML = '$'.repeat(parseInt(this._inputPrice.value));
  }

  private _findChild(element: Element, tagName: string): Element {
    let j: number;
    for (j = 0; element.childNodes[j].nodeName != tagName.toUpperCase(); j++);
    return <Element>element.childNodes[j];
  }

  private _setIcon(item: Element, iconName: string): void {

    let anchor = this._findChild(item, 'A');
    let icon = this._findChild(anchor, 'I');

    icon.classList.remove('eye-stroke', 'eye');
    icon.classList.add(iconName);
  };

  private _removeFunction(item: Element): void {
    this._setIcon(item, 'x');

    item.addEventListener('click', function (event: Event) {
      event.preventDefault();
      event.stopPropagation();
      
      this._restaurants.removeById(item.getAttribute('data-item-id'));

      if (this._restaurants.length()) {
        item.remove();
      } else {
        this.menuMode(event);
      }

    }.bind(this));
  }

  private _editFunction(item: Element): void {
    this._setIcon(item, 'pencil');

    let restaurant = this._restaurants.getById(+item.getAttribute('data-item-id'));

    item.addEventListener('click', function (event: Event) {
      event.preventDefault();
      event.stopPropagation();

      this._inputName.value = restaurant.name;
      this._inputPrice.value = restaurant.price;
      this._inputId.value = restaurant.id;
      this._updatePriceSlider();
    }.bind(this));
  }

  private _toggleFunction(item: Element): void {
    
    let restaurant = this._restaurants.getById(+item.getAttribute('data-item-id'));

    item.addEventListener('click', function (event: Event) {
      event.preventDefault();
      event.stopPropagation();

      restaurant.toggleActive();

      item.toggleAttribute('disabled');
      this._setIcon(item, item.hasAttribute('disabled') ? 'eye' : 'eye-stroke');
    }.bind(this));
  }

  public submit(event: Event): void {

    event.preventDefault();

    if (!this._isFilled()) return;
    
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
    
    this.menuMode(event);
  }

  public addMode(event: Event): void {
    event.preventDefault();
    this._modeHelper.activateAddMode(this._toggleFunction.bind(this));
    this._inputName.focus();
  }

  public editMode(event: Event): void {
    event.preventDefault();
    this._submitButtonLabel.innerHTML = "Save!";
    this._modeHelper.activateEditMode(this._editFunction.bind(this));
  }

  public removeMode(event: Event): void {
    event.preventDefault();
    this._modeHelper.activateRemoveMode(this._removeFunction.bind(this));
  }

  public menuMode(event: Event): void {
    event.preventDefault();
    this._cleanUpFields();
    this._submitButtonLabel.innerHTML = "Add!";

    this._modeHelper.activateMenuMode(this._toggleFunction.bind(this));
  }
}