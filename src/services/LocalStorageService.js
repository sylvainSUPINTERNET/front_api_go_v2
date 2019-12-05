'use strict';


import jsonwebtoken from "jsonwebtoken";
import configAuth from "../config/authentication";

export default class localStorageService {

    constructor() {
    }


    static setEntry(keyName, keyValue) {
        localStorage.setItem(keyName, keyValue);
        return localStorage.getItem(keyName);
    }

    static getToken() {
        return localStorage.getItem("access_token");
    }


    static decodeToken() {
        jsonwebtoken.verify(localStorage.getItem("access_token"), configAuth.jwtSecret, (err, decoded) => {
            if (err) {
                console.log(err);
                return err;
            } else {

                return decoded
            }
        })
    }
}
