import axios from 'axios'

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

export default { getItems, getItem }

