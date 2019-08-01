import { View } from './index';
import { Restaurants } from '../models/Restaurants';

export class RestaurantsView extends View<Restaurants> {

  private _getDollars(price: number) : string {
    
    let dollars = '';
    
    price = price > 5 ? 5 : price;
    price = price <= 0 ? 1 : price;

    for (let i = price; i > 0 ; i--) {
      dollars += '$';
    }

    return dollars;
  }

  private _getRestaurantsHTMLItems(models: Restaurants) {
    if (!models.length()) {

      return `
        <li data-empty-list class="options-item empty">
          <span>It has no items yet, try adding one</span>
        </li>
      `;
    } else {

      return models.toArray().map(model =>
        `<li class="options-item" data-item data-item-id="${ model.id }" ${ !model.active ? 'disabled' : '' }>
          <a class="eye-icon" href>
            <i class="custom-icon eye${ model.active ? '-stroke' : ''}"></i>
          </a>
          <span class="name">${ model.name}</span>
          <span class="budget">${ this._getDollars(model.price)}</span>
        </li>`
      ).join('');
    }
  }

  public toggleRaffling(): void {
    this._dadElement.classList.toggle('raffling');
  }

  public template(models: Restaurants): string {
    return `
      ${ this._getRestaurantsHTMLItems(models) }
    `;
  }
}