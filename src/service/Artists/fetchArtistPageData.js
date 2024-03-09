import axios from 'axios'

const URI = import.meta.env.VITE_URI

export async function fetchUserArtists(token) {
    try {
        return await axios
            .get(`${URI}/api/tracks/user/artists/`, {
                headers: {
                    Authorization: `TOKEN ${token}`
                }
            })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                console.log('Error to get artist data for Artist page: ', err.message)
                return { code: -1, message: 'Network error' }
            })
    } catch (err) {
        console.log('Error to get artist data for Artist page: ', err.message)
        return { code: -1, message: 'Network Error' }
    }
}
