

import jwtDecode from 'jwt-decode';
import axios from 'axios';

let API = axios.create({
    baseURL: "http://localhost:8080",
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export function isTokenExpired(token) {
    var decoded = jwtDecode(token)

    if (decoded.exp < Date.now() / 1000) {
        return true
    } else {
        return false
    }
}


const API_AUTH = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
    },
});

API_AUTH.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

API_AUTH.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        console.log(err)
        const originalConfig = err.config;


        if (originalConfig.url !== '/auth/jwt/create/' && err.response) {
            //access token expored!!
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const r = localStorage.getItem('refreshToken')
                    if (!isTokenExpired(r)) {
                        const rs = await API_AUTH.post('auth/jwt/refresh/', {
                            refresh: localStorage.getItem('refreshToken'),
                        })
                        localStorage.setItem('token', rs.data.access);

                        return API_AUTH(originalConfig);
                    } else {
                        localStorage.setItem('refreshToken', null)
                        localStorage.setItem('token', null)

                    }

                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);



export class Service {

    async loginStaff(payload) {
        const data = await API.post('/auth/jwt/create/', payload)
        return data
    }

    async postFile(data) {
        const res = await API.post(`http://localhost:8080/user/home/fileEncrypt`, data ,{
            headers: {'content-type': 'multipart/form-data'}
        })
        return res
    }

    async decryptFile(data) {
        const res = await API.post(`http://localhost:8080/user/home/fileDecrypt`, data ,{
            headers: {'content-type': 'multipart/form-data'}
        })
        return res
    }

}

export const service = new Service()
