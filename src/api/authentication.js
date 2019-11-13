'use strict';

import axios from 'axios';


export default class authentication {

    static async login(body) {

        let url = 'http://localhost:9000/login';

        try {
            const { data } =  await axios.post(url, body);
            return data;
        } catch (e) {
            return e;
        }
    }

}
