import axios from 'axios'

const URI = import.meta.env.VITE_URI

export async function getLikedPlaylistData(token, list) {
    return axios
        .post(`${URI}/api/tracks/playlist/preview/data/`, list, {
            headers: {
                Authorization: `TOKEN ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status == 401)
                    return { code: -2, message: err.response.data.detail }
            } else return { code: 0, message: 'Network error' }
        })
}
