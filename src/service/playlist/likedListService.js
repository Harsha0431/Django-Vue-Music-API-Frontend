import axios from 'axios'

const URI = import.meta.env.VITE_URI

export async function getLikedTracksListService(token) {
    try {
        return axios
            .get(`${URI}/api/tracks/liked/list/`, {
                headers: {
                    Authorization: `TOKEN ${token}`
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
    }
    catch (err) {
        return { code: -1, message: 'Network error' }
    }
}


export async function getInterestedTracksListService(token) {
    try {
        return axios
            .get(`${URI}/api/tracks/interested/list/`, {
                headers: {
                    Authorization: `TOKEN ${token}`
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