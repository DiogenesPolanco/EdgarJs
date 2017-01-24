module Edgarjs {

    enum location {
        local = 1,
        session = 2,
    }

    export class Storage {
        storageProvider: IStorage;
        constructor(_location: location, provider: IStorage) {
            this.storageProvider = provider;
        }

        Save(key, value): boolean {
            return this.storageProvider.setItem(key, value)
        }

        Get(key: string): Object {
            return this.storageProvider.getItem(key);
        }

        RemoveAll() {

            console.log("remove all keys");
        }

    }

    interface IStorage {

        getItem(key: string);
        setItem(key: string, value: string)
    }

    class StorageLocal implements IStorage {

        getItem(key): Object {
            return localStorage.getItem(key);
        }

        setItem(key: string, value: string): Boolean {

            localStorage.setItem(key, value);
            return localStorage.getItem(key) == value ? true : false;
        }
    }

    class StorageSession implements IStorage {

        getItem(key): Object {
            return sessionStorage.getItem(key);

        }
        setItem(key: string, value: string): Boolean {

            sessionStorage.setItem(key, value);
            return sessionStorage.getItem(key) == value ? true : false;
        }

    }


}