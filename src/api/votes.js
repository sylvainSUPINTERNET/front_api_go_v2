'use strict';

import axios from 'axios';


export default class votes {

    static async get(token) {

        let url = 'http://localhost:4200/api/votesList';

        try {
            const { data } =  await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }

    static async getOne(token, uuid) {

        let url = 'http://localhost:4200/api/votes/'+uuid;

        try {
            const { data } =  await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }



    static async post(token, data){
        let url = 'http://localhost:4200/api/votes';

        let body = {
            title: data.title,
            desc: data.desc
        };

        try {
            const { data } =  await axios.post(url, body ,{ headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }

    static async put(token, uuidVote, uuidUser){
        let url = `http://localhost:4200/api/votes/${uuidVote}/${uuidUser}`;

        let body = {};

        try {
            const { data } =  await axios.put(url, body,{ headers: { Authorization: `Bearer ${token}` } });
            return data;
        } catch (e) {
            return e;
        }
    }

}
