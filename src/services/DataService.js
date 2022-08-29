import axios from 'axios'

const db_url = 'http://localhost:3000';

export default {
    getItems(resource) {
        axios.get(db_url + '/' + resource)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })
    },

    getItem(resource, id) {
        axios.get(db_url + '/'+ resource +'/' + id)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })
    },
}