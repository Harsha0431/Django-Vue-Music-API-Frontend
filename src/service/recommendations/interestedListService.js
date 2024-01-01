//This modules adds user interested tracks to database
import axios from 'axios';
const URI = import.meta.env.VITE_URI

export async function addInterestedListToDbService(token, data) {
    try {
        return await axios.post(`${URI}/api/tracks/interested/add_track/`, data, {
            headers: {
                'Authorization': `TOKEN ${token}`
            }
        })
            .then((response) => {
                console.log(response.status)
            })
    }
    catch (err) {
        return {code:-1, message:'Network error'}
    }
}