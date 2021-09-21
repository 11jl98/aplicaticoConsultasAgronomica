import Axios from 'axios';

export default function Api(){
 Axios.create({
     baseURL: 'https://localhost:8055/',
     auth: ''
 })
}