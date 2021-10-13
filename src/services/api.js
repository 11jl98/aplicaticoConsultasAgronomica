import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api.winfit.com.br/',
    headers: {
        'Authorization': 'Bearer free123',
    }
})

export default api