import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8800/api', // API backend
    headers: {
        'Content-Type': 'application/json',
    },
});
