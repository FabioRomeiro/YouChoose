class Restaurant {

  private _registDate: Date;

  constructor(private _name: string, private _price: number) {
    this._registDate = new Date();
  }

  get registDate() {
    return this._registDate;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}