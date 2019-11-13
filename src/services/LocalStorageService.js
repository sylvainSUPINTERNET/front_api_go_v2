'use strict';


export default class localStorageService {

    constructor() {
    }


    static setEntry(keyName, keyValue) {
        localStorage.setItem(keyName, keyValue);
        return localStorage.getItem(keyName);
    }
}
