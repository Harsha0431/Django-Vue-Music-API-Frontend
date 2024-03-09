import { fetchHomeArtists } from "@/service/Artists/fetchHomeArtists";

export async function getHomeArtists(token) {
    return await fetchHomeArtists(token).then((res) => {
        return res
    })
}