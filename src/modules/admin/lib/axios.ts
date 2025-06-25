import axios from 'axios'

const api = axios.create({
  baseURL: 'https://laravel-be-production-8f4a.up.railway.app/api/admins',

})

const csrf = axios.create({
  baseURL: 'https://laravel-be-production-8f4a.up.railway.app',

})

export { api, csrf }
