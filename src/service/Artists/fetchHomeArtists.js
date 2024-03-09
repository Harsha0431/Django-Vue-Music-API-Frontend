import axios from 'axios'

const URI = import.meta.env.VITE_URI

export async function fetchHomeArtists(token) {
    try {
        return await axios
        .get(`${URI}/api/tracks/user/artists/home`, {
            headers: {
                Authorization: `TOKEN ${token}`
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log('Error to add track to liked list: ', err.message)
            return { code: -1, message: 'Network error' }
        })
    }
    catch (err) {
        console.log('Error to add track to liked list: ', err.message)
        return {code:-1 ,  message: "Network Error"}
    }
}