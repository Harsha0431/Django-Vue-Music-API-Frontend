import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search_store', () => {
    const showSearchTab = ref(false);
    const searchText = ref('')
    const category = ref('artist')
    const category_list = [
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
        showSearchTab,
        searchText,
        category,
        category_list
    }
})
