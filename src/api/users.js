'use strict';

import axios from 'axios';


export default class users {

    static async get(token) {

        let url = 'http://localhost:4200/api/usersList';

        try {
            const { data } =  await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }


    static async getOne(token, uuid) {

        let url = `http://localhost:4200/api/users/${uuid}`;

        try {
            const { data } =  await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }

    static async delete(token, uuid) {

        let url = `http://localhost:4200/api/users/${uuid}`;

        try {
            const { data } =  await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }

    static async put(token, uuidUser, email){
        let url = `http://localhost:4200/api/users/${uuidUser}`;

        let body = {
            email: email
        };

        try {
            const { data } =  await axios.put(url, body,{ headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }

}
