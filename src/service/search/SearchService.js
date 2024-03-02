import axios from 'axios'
import VueCookies from 'vue-cookies'

const URI = import.meta.env.VITE_URI

export async function getSearchQuery(text, type = 'track', offset = 0, limit = 20) {
    try {
        const data = {
            search: text,
            type: type,
            offset: offset,
            limit: limit
        }
        return await axios
            .post(`${URI}/api/tracks/search/`, data, {
                headers: {
                    Authorization: `TOKEN ${VueCookies.get('user-token')}`
                }
            })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status == 401)
                        return { code: 0, message: err.response.data.detail }
                } else return { code: 0, message: 'Network error' }
            })
    } catch (err) {
        return { code: -1, message: 'Network error' }
    }
}


export async function getArtistRelatedTracks(artist_id) {
    try {
        const data = {
            artist_id: artist_id
        }
        return await axios
            .post(`${URI}/api/tracks/artist/tracks/`, data, {
                headers: {
                    Authorization: `TOKEN ${VueCookies.get('user-token')}`
                }
            })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status == 401)
                        return { code: 0, message: err.response.data.detail }
                } else return { code: 0, message: 'Network error' }
            })
    } catch (err) {
        return { code: -1, message: 'Network error' }
    }
}
