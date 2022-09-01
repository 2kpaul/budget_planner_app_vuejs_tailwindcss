import axios from 'axios'
import router from '@/router';
import { v4 as uuidv4 } from 'uuid'

const db_url = 'http://localhost:3000';

function getItems(resource) {
    return axios.get(db_url + '/' + resource)
        .then(response => {
            //console.log(response.data)
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}

function getItem(resource, id) {
         axios.get(db_url + '/'+ resource +'/' + id)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}

function saveItem(resource, entry) {
    
    axios.post(db_url + '/' + resource, entry)
        .then(response => {
            router.push({ name: 'home'})
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteItem(resource, id) {
    axios.delete(db_url + '/' + resource + '/' + id)
        .then(response => {
            //redirect
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export default { getItems, getItem, saveItem, deleteItem }

