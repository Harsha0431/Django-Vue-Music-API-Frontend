import axios from 'axios'

const URI = import.meta.env.VITE_URI

export async function fetchSuggestSeedArtist(token) {
    try {
        return await axios
            .get(`${URI}/api/tracks/user/artists/suggested`, {
                headers: {
                    Authorization: `TOKEN ${token}`
                }
            })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                console.log('Error to get artist data for suggestion with seed: ', err.message)
                return { code: -1, message: 'Network error' }
            })
    } catch (err) {
        console.log('Error to get artist data for suggestion with seed: ', err.message)
        return { code: -1, message: 'Network Error' }
    }
}
