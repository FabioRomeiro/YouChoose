const controller = new RestaurantController();

document
  .querySelector('.form')
  .addEventListener('submit', controller.add.bind(controller));