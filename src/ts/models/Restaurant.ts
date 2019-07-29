export class Restaurant {

  private _registDate: Date;
  private _active: boolean;
  private _id: number;

  constructor(private _name: string, private _price: number) {
    this._registDate = new Date();
    this._active = true;
    this._id = Math.round(Math.random() * 10000);
  }

  get registDate() {
    return this._registDate;
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

  get id() {
    return this._id;
  }

  public toggleActive(): void {
    this._active = !this._active;
  }
}