var Edgarjs;
(function (Edgarjs) {
    var location;
    (function (location) {
        location[location["local"] = 1] = "local";
        location[location["session"] = 2] = "session";
    })(location || (location = {}));
    var Storage = (function () {
        function Storage(_location, provider) {
            this.storageProvider = provider;
        }
        Storage.prototype.Save = function (key, value) {
            return this.storageProvider.setItem(key, value);
        };
        Storage.prototype.Get = function (key) {
            return this.storageProvider.getItem(key);
        };
        return Storage;
    }());
    Edgarjs.Storage = Storage;
    var StorageLocal = (function () {
        function StorageLocal() {
        }
        StorageLocal.prototype.getItem = function (key) {
            return localStorage.getItem(key);
        };
        StorageLocal.prototype.setItem = function (key, value) {
            localStorage.setItem(key, value);
            return localStorage.getItem(key) == value ? true : false;
        };
        return StorageLocal;
    }());
    var StorageSession = (function () {
        function StorageSession() {
        }
        StorageSession.prototype.getItem = function (key) {
            return sessionStorage.getItem(key);
        };
        StorageSession.prototype.setItem = function (key, value) {
            sessionStorage.setItem(key, value);
            return sessionStorage.getItem(key) == value ? true : false;
        };
        return StorageSession;
    }());
})(Edgarjs || (Edgarjs = {}));
