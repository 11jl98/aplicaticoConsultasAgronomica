import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.5.124:8055/',
    headers: {
        'Authorization': 'Bearer free123',
    }
})

export default api