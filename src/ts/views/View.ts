export abstract class View<T> {
  
  protected _dadElement: Element;

  constructor(selector: string) {
    this._dadElement = document.querySelector(selector);
  }


  update(models: T): void {
    this._dadElement.innerHTML = this.template(models);
  }

  abstract template(models: T): string;
}