export abstract class View<T> {
  
  protected _dadElement: Element;

  constructor(selector: string, private _scape?: boolean) {
    this._dadElement = document.querySelector(selector);
  }


  public update(models: T): void {

    let template = this.template(models);
    if (this._scape) {
      template.replace(/<script>[\s\S]*?<\/script>/,'');
    }

    this._dadElement.innerHTML = template;
  }

  abstract template(models: T): string;
}