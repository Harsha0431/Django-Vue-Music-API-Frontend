import axios from 'axios'

const URI = import.meta.env.VITE_URI

export async function getSearchQuery(text, type, offset , limit) {
    try {
        return await axios
            .get(`${URI}/api/music/search?search=${text}&type=${type}&offset=${offset}&limit=${limit}`)
            .then((response) => {
                return response.data
            })
    } catch (err) {
        return { code: -1, message: 'Network error' }
    }
}
