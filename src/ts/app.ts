import { RestaurantController } from './controllers/RestaurantController';

const controller = new RestaurantController();

function _getModeMethod(buttonName: string): Function {
  if (buttonName == 'add')
    return controller.addMode;
  else if (buttonName == 'edit')
    return controller.editMode;
  else if (buttonName == 'remove')
    return controller.removeMode;
  else 
    return controller.menuMode;
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