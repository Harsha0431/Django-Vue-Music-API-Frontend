import axios from 'axios'

const URI = import.meta.env.VITE_URI


export async function addToLikedListService(data , token) {
    return await axios.post(`${URI}/api/tracks/liked/add_track/`, data , {
        headers: {
            'Authorization': `TOKEN ${token}`
        }
    })
        .then(response => { return response.data })
        .catch(err => {
            console.log("Error to add track to liked list: ", err.message)
            return {code:-1, message:'Network error'}
        })
}

export async function removeFromLikedListService(data , token) {
    return await axios
        .post(`${URI}/api/tracks/liked/remove_track/`, data, {
            headers: {
                Authorization: `TOKEN ${token}`
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log('Error to remove track from liked list: ', err.message)
            return { code: -1, message: 'Network error' }
        })
}