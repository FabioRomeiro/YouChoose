import { Restaurant } from "../models/index";

export class RestaurantDAO {

  private _store: string;

  constructor(private _connection: IDBDatabase) {
    this._store = 'restaurants';
  }

  public add(restaurant: Restaurant): Promise<string> {

    return new Promise((resolve,reject) => {
      
      let req = this._connection
        .transaction(this._store, 'readwrite')
        .objectStore(this._store)
        .add(restaurant);

      req.onerror = (e: any) => {
        reject(e.target.error.name);
      };

      req.onsuccess = (e: any) => {
        resolve();
      };
    });
  }

  public update(restaurant: Restaurant): Promise<string> {

    return this
      .removeById(restaurant.id)
      .then(() => this.add(restaurant));
  }

  public removeById(id: number): Promise<string> {

    return new Promise<string>((resolve, reject) => {

      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .delete(id);

      request.onsuccess = (e: any) => {
        resolve();
      };

      request.onerror = (e: any) => {
        reject();
      };
    });
  }

  public getById(id: number): Promise<any> {
    
    return new Promise<any>((resolve,reject) => {
      
      let request = this._connection
        .transaction([this._store])
        .objectStore(this._store)
        .get(id);

      request.onsuccess = (e: any) => {
        resolve(request.result);
      };

      request.onerror = (e: any) => {
        reject();
      };
    });
  }

  public list(): Promise<any[]> {
    
    return new Promise<any[]>((resolve,reject) => {

      let cursor = this._connection
        .transaction(this._store, 'readwrite')
        .objectStore(this._store)
        .openCursor();
      
      let restaurants: Object[] = [];

      cursor.onsuccess = (e: any) => {
        
        let actual = e.target.result;

        if (actual) {

          restaurants.push(actual.value);
          actual.continue();
        } else {
          resolve(restaurants);
        }
      };
      
      cursor.onerror = (e: any) => {
        console.log(e.target.error);
        reject();
      };
    });
  }
}