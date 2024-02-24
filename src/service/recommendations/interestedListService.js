//This modules adds user interested tracks to database
import axios from 'axios'
const URI = import.meta.env.VITE_URI

import VueCookies from 'vue-cookies'

export async function addInterestedListToDbService(data) {
    try {
        return await axios
            .post(`${URI}/api/tracks/interested/add_track/`, data, {
                headers: {
                    Authorization: `TOKEN ${VueCookies.get('user-token')}`
                }
            })
            .then((response) => {
                return response.data
            })
    } catch (err) {
        return { code: -1, message: 'Network error' }
    }
}

export async function fetchRecommendedTracksService() {
    try {
        return await axios
            .get(`${URI}/api/tracks/recommended/list/`, {
                headers: {
                    Authorization: `TOKEN ${VueCookies.get('user-token')}`
                }
            })
            .then((response) => {
                return response.data
            })
    } catch (err) {
        return { code: -1, message: 'Network error' }
    }
}
