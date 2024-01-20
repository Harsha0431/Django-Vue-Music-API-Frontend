import { defineStore } from "pinia";
import { ref } from 'vue'

export const useSearchStore = defineStore('search_store',()=>{
    const searchText = ref('')
    const category = ref('')
    const category_list = [
        {
            name: 'Album',
            value: 'album'
        },
        {
            name: 'Artist',
            value: 'artist'
        },
        {
            name: 'Music Track',
            value: 'track'
        }
    ]

    return {
        searchText, category, category_list
    }
})