class Restaurant {

  private _registDate;
  private _name;
  private _price;
  
  constructor(name, price) {
    this._registDate = new Date();
    this._name  = name;
    this._price  = price;
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