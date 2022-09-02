import axios from 'axios'
import router from '@/router';
import { v4 as uuidv4 } from 'uuid'

const db_url = 'http://localhost:3000';

function getItems(resource) {
    return axios.get(db_url + '/' + resource)
        .then(response => {
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

async function saveItem(resource, entry) {

    await axios.post(db_url + '/' + resource, entry)
        
}

async function deleteItem(resource, id) {
    
    await axios.delete(db_url + '/' + resource + '/' + id)
        
}

export default { getItems, getItem, saveItem, deleteItem }

