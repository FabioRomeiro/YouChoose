import { RestaurantController } from './controllers/RestaurantController';

(function registServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    
    navigator.serviceWorker.register('../ServiceWorker.js');
  }
})()

const controller = new RestaurantController();

function _getModeMethod(buttonName: string): any {
  
  let methods: any = {
    'add': controller.addMode,
    'edit': controller.editMode,
    'remove': controller.removeMode,
    'menu': controller.menuMode  
  };

  return methods[buttonName];
}

document
  .querySelectorAll('[data-button]')
  .forEach(button => {
    button.addEventListener(
      'click', 
      _getModeMethod(button.getAttribute('data-button')).bind(controller));
  });

document
  .querySelector('[data-form]')
  .addEventListener('submit', controller.submit.bind(controller));

document
  .querySelector('[data-raffle-button]')
  .addEventListener('click', controller.raffle.bind(controller));
