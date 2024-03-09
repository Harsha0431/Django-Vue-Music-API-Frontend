import { defineStore } from "pinia";
import {ref} from 'vue'

export const useArtistPageStore = defineStore('artist-page-store', () => {
    const artistData = ref([])
    const dataFetched = ref(false)

    return {
        artistData,
        dataFetched
    }
})