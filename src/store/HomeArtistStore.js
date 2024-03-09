import {ref} from 'vue'
import { defineStore } from "pinia"

export const useHomeArtistStore = defineStore('home-artist-store', ()=>{
    const userArtists = ref([])
    const suggestedArtists = ref([])
    return {
        userArtists,
        suggestedArtists
    }
})