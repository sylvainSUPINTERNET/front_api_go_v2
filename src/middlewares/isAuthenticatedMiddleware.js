'use strict';

import jsonwebtoken from 'jsonwebtoken';

import configAuth from "../config/authentication";

/**
 * Return true if allow else false
 * @param ROLES_ALLOW Array of string role from config
 * @param to vue-router
 * @param from vue-router
 * @param next vue-router
 */
export const isAuthenticatedMiddleware = (ROLES_ALLOW, to, from, next) => {
    if(localStorage.getItem("access_token")){

        jsonwebtoken.verify(localStorage.getItem("access_token"), configAuth.jwtSecret , (err, decoded) => {
            if(err){
                return next("/login");
            } else {

                if(from.path === "/login") {
                    localStorage.setItem("token_data", JSON.stringify(decoded));
                }

                if(checkRoles(localStorage.getItem("token_data"), ROLES_ALLOW)){
                    // role is OK
                    return next();
                } else {
                    alert("Sorry, you don't have the access level for this ...");
                    // does not contains the role
                    return next("/login");
                }
            }
        });
    } else {
        return next("/login");
    }
};


/**
 *
 * @param userDataFromJwt
 * @param roles_to_check
 * Return boolean if allow true else false
 */
export const checkRoles = (userDataFromJwt, roles_to_check) => {
    if(userDataFromJwt){
        return roles_to_check.includes(JSON.parse(userDataFromJwt).accessLevel);
    } else {
        return false;
    }
};
