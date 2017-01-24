// var exports ={};

export interface IStorage {
  getItem(key: string): any;
  setItem(key: string, value: string): any;
  remove(key: string): boolean;
  removeAll():void;
  supportStorage(): boolean;
}

export enum Location {
  local = 1,
  session = 2,
}

/**
 * Instance is an Storage controller. Automatically creates 
 * Only if Location given.
 */
export class EdgarJs {
  storageProvider: IStorage;
  private _location: Location;

  constructor(_location?: Location) {

    if (_location === Location.local) {
      this.storageProvider = new StorageLocal();

      if (this.storageProvider.supportStorage()) {
        this._location = (_location || Location.local);
      }
      else {
        console.log("INFO", "Local storage is not supported", null);
      }

    } else if (_location === Location.session) {
      this.storageProvider = new StorageSession();

      if (this.storageProvider.supportStorage()) {
        this._location = (_location || Location.session);
      }
      else {
        console.log("INFO", "Session storage is not supported", null);
      }

    } else {
      throw new Error('location is required');
    }

  }

  public Save(key: string, value: any): boolean {
    return this.storageProvider.setItem(key, value);
  }

  public SaveJSON(key: string, value: any): boolean {
    return this.Save(key, JSON.stringify(value));
  }
  public LoadJSON(key: string): any {
    return JSON.parse(this.storageProvider.getItem(key));
  }

  public Get(key: string): any {
    return this.storageProvider.getItem(key);
  }
   public remove(key: string): boolean {
     return this.storageProvider.remove(key);
   }
 
  public removeAll() {
    this.storageProvider.removeAll();
  }
 
}

/**
 * Private class. Instance represents a StorageLocal.
 */
class StorageLocal implements IStorage {

  public getItem(key: string): any {
    return window.localStorage.getItem(key);
  }

  public setItem(key: string, value: string): any {
    window.localStorage.setItem(key, value);
    return window.localStorage.getItem(key) == value ? true : false;
  }

  public remove(key): boolean {
    try {
      if (window.localStorage.getItem(key)) {
        window.localStorage.removeItem(key);
        return true;

      }
      return false;

    } catch (e) {
      return false;

    }
  }

 public removeAll():void {
    window.localStorage.clear();
  }


  public supportStorage(): boolean {
    try {
      var supportsLocalStorage = 'localStorage' in window && window['localStorage'] !== undefined;

      if (supportsLocalStorage) {
        window.localStorage.setItem('storageTest', '');
        window.localStorage.removeItem('storageTest');

      }
      return supportsLocalStorage;

    } catch (e) {
      return false;

    }
  }

}

/**
 * Private class. Instance represents a StorageSession.
 */
class StorageSession implements IStorage {

  public getItem(key: string): any {
    return window.sessionStorage.getItem(key);
  }

  public setItem(key: string, value: string): any {
    window.sessionStorage.setItem(key, value);
    return window.sessionStorage.getItem(key) == value ? true : false;
  }

  public remove(key: string): boolean {
    try {
      if (window.sessionStorage.getItem(key)) {
        window.sessionStorage.removeItem(key);
        return true;

      }
      return false;

    } catch (e) {
      return false;

    }
  }

  public removeAll():void {
    window.sessionStorage.clear();
  }

  public supportStorage(): boolean {
    try {
      var supportsSessionStorage = 'sessionStorage' in window && window['sessionStorage'] !== undefined;

      if (supportsSessionStorage) {
        window.sessionStorage.setItem('storageTest', '');
        window.sessionStorage.removeItem('storageTest');

      }
      return supportsSessionStorage;

    } catch (e) {
      return false;

    }
  }

}

//window.EdgarJs =  new EdgarJs(Location.local); 