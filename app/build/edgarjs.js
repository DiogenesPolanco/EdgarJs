 var exports = {};
 "use strict";
 var Location;
 (function(Location) {
     Location[Location["local"] = 1] = "local";
     Location[Location["session"] = 2] = "session";
 })(Location = exports.Location || (exports.Location = {}));
 /**
  * Instance is an Storage controller. Automatically creates
  * Only if Location given.
  */
 var EdgarJs = (function() {
     function EdgarJs(_location) {
         if (_location === Location.local) {
             this.storageProvider = new StorageLocal();
             if (this.storageProvider.supportStorage()) {
                 this._location = (_location || Location.local);
             } else {
                 console.log("INFO", "Local storage is not supported", null);
             }
         } else if (_location === Location.session) {
             this.storageProvider = new StorageSession();
             if (this.storageProvider.supportStorage()) {
                 this._location = (_location || Location.session);
             } else {
                 console.log("INFO", "Session storage is not supported", null);
             }
         } else {
             throw new Error('location is required');
         }
     }
     EdgarJs.prototype.Save = function(key, value) {
         return this.storageProvider.setItem(key, value);
     };
     EdgarJs.prototype.SaveJSON = function(key, value) {
         return this.Save(key, JSON.stringify(value));
     };
     EdgarJs.prototype.LoadJSON = function(key) {
         return JSON.parse(this.storageProvider.getItem(key));
     };
     EdgarJs.prototype.Get = function(key) {
         return this.storageProvider.getItem(key);
     };
     EdgarJs.prototype.remove = function(key) {
         return this.storageProvider.remove(key);
     };
     EdgarJs.prototype.removeAll = function() {
         this.storageProvider.removeAll();
     };
     return EdgarJs;
 }());
 exports.EdgarJs = EdgarJs;
 /**
  * Private class. Instance represents a StorageLocal.
  */
 var StorageLocal = (function() {
     function StorageLocal() {}
     StorageLocal.prototype.getItem = function(key) {
         return window.localStorage.getItem(key);
     };
     StorageLocal.prototype.setItem = function(key, value) {
         window.localStorage.setItem(key, value);
         return window.localStorage.getItem(key) == value ? true : false;
     };
     StorageLocal.prototype.remove = function(key) {
         try {
             if (window.localStorage.getItem(key)) {
                 window.localStorage.removeItem(key);
                 return true;
             }
             return false;
         } catch (e) {
             return false;
         }
     };
     StorageLocal.prototype.removeAll = function() {
         window.localStorage.clear();
     };
     StorageLocal.prototype.supportStorage = function() {
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
     };
     return StorageLocal;
 }());
 /**
  * Private class. Instance represents a StorageSession.
  */
 var StorageSession = (function() {
     function StorageSession() {}
     StorageSession.prototype.getItem = function(key) {
         return window.sessionStorage.getItem(key);
     };
     StorageSession.prototype.setItem = function(key, value) {
         window.sessionStorage.setItem(key, value);
         return window.sessionStorage.getItem(key) == value ? true : false;
     };
     StorageSession.prototype.remove = function(key) {
         try {
             if (window.sessionStorage.getItem(key)) {
                 window.sessionStorage.removeItem(key);
                 return true;
             }
             return false;
         } catch (e) {
             return false;
         }
     };
     StorageSession.prototype.removeAll = function() {
         window.sessionStorage.clear();
     };
     StorageSession.prototype.supportStorage = function() {
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
     };
     return StorageSession;
 }());
 window.EdgarJs = new EdgarJs(Location.local);