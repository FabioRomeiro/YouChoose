export class ConnectionFactory {

  public static readonly _dbVersion: number = 4;
  public static readonly _dbName: string = 'you-choose';
  public static readonly _dbStores: string[] = ['restaurants'];
  
  private static _close: Function = null;

  private static connection: IDBDatabase;
  
  constructor() {
    throw new Error('You cannot instantiate a ConnectionFactory class');
  }

  get connection(): IDBDatabase {
    return this.connection;
  }

  public static _createStores(connection: IDBDatabase): void {
    
    this._dbStores.forEach(store => {
      
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }

      let objectStore = connection.createObjectStore(store, { keyPath: 'id' });

      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('price', 'price', { unique: false });
    });

  }

  public static getConnection(): Promise<IDBDatabase> {

    return new Promise<IDBDatabase>((resolve, reject) => {
      
      let openRequest = window.indexedDB.open(this._dbName, this._dbVersion);

      openRequest.onupgradeneeded = (e: any) => {
        
        ConnectionFactory._createStores(e.target.result);
      };

      openRequest.onsuccess = (e: any) => {

        if (!this.connection) {
          
          this.connection = e.target.result;

          this._close = this.connection.close.bind(this.connection);

          this.connection.close = function() {
            throw new Error('You can only close a connection by using ConnectionFactory closeConnection method');
          };
        }
        resolve(this.connection);
      };

      openRequest.onerror = (e: any) => {

        reject(e.target.error.name);
      };
    });
  }
  
  public static closeConnection(): void {
    
    if (!this.connection) 
      return;
    
    this._close();
    this.connection = null;
  }
}