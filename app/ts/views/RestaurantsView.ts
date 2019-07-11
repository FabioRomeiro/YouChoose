class RestaurantsView extends View<Restaurants> {

  template(models: Restaurants): string {
    return `
      <div>
        <ul>
          ${models.toArray().map(model => 
            `<li>${model.name}</li>`
          ).join('')}
        </ul>
      </div>
    `;
  }
}