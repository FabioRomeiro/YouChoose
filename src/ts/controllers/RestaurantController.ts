import { RestaurantsView, EditorModeView, MessengerView } from '../views/index';
import { Restaurant, Restaurants } from '../models/index';
import { ModeHelper } from '../helpers/index';
import { logExecutionTime, domInject } from '../helpers/decorators/index';

export class RestaurantController {

  @domInject('[data-form-input=name]')
  private _inputName: HTMLInputElement;

  @domInject('[data-form-input=id]')
  private _inputId: HTMLInputElement;

  @domInject('[data-form-input=price]')
  private _inputPrice: HTMLInputElement;
  
  @domInject('[data-price-display]')
  private _priceDisplay: Element;

  private _submitButtonLabel: Element;

  private _restaurants = new Restaurants();

  private _restaurantsView = new RestaurantsView('[data-options-list]');
  private _editorModeView = new EditorModeView('data-feature');
  private _messengerView = new MessengerView();

  private _modeHelper = new ModeHelper(this._updateList.bind(this), this._editorModeView);

  constructor() {

    this._submitButtonLabel = <Element>document.querySelector('[data-submit-button]').childNodes[1];
    
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

  private _setIcon(item: Element, iconName: string, color?: string): void {

    let anchor = this._findChild(item, 'A');
    let icon = this._findChild(anchor, 'I');

    if (color) {
      anchor.classList.add(`color-${ color }`);
    }

    icon.classList.remove('eye-stroke', 'eye');
    icon.classList.add(iconName);
  };

  private _removeFunction(item: Element): void {

    this._setIcon(item, 'garbage', 'red');

    item.addEventListener('click', function (event: Event) {
      event.preventDefault();
      event.stopPropagation();

      let restaurant = this._restaurants.getById(item.getAttribute('data-item-id'));
      
      this._restaurants.removeById(restaurant.id);

      if (this._restaurants.length()) {
        item.remove();
      } else {
        this.menuMode(event);
      }

      this._messengerView.update({
        type: 'danger',
        message: `"${ restaurant.name }" has been deleted`,
        icon: 'garbage'
      }, 3000);

    }.bind(this));
  }

  private _editFunction(item: Element): void {
    this._setIcon(item, 'pencil', 'yellow');

    let restaurant = this._restaurants.getById(+item.getAttribute('data-item-id'));;

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

  public raffle(event: Event): void {
    event.preventDefault();

    if (!this._restaurants.length()) {

      let emptyMessage = document.querySelector('[data-empty-list]');
      
      emptyMessage.classList.add('alert');
      setTimeout(() => {
        emptyMessage.classList.remove('alert');
      }, 5000);

    } else if (!this._restaurants.hasActive()) {
      
      this._messengerView.update({
        type: 'warning',
        message: 'There\'s no active items on the list',
        icon: 'eye-stroke'
      }, 5000);

    } else {
      
      this._restaurantsView.toggleRaffling();

      const restaurants = this._restaurants.toArrayOfActive();
      
      setTimeout(() => {
        let choosenIndex = Math.floor(Math.random() * restaurants.length);
        
        this._restaurantsView.toggleRaffling();
        this._messengerView.update({
          type: 'success',
          message: `The choosen one is "${ restaurants[choosenIndex].name }"`,
          icon: 'check'
        }, 10000);

      }, restaurants.length > 1 ? 5000 : 0);
    }
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
    this._updateList();
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