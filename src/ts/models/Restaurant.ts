export class Restaurant {

  readonly registDate: Date;
  private _active: boolean;
  readonly id: number;

  constructor(private _name: string, private _price: number) {
    this.registDate = new Date();
    this._active = true;
    this.id = Math.round(Math.random() * 10000);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get price() {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get active() {
    return this._active;
  }

  set active(status: boolean) {
    this._active = status;
  }

  public toggleActive(): void {
    this._active = !this._active;
  }
}