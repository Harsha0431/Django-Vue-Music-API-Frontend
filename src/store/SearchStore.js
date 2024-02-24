import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search_store', () => {
    const showSearchTab = ref(false);
    const searchText = ref('')
    const category = ref('track')
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

    const offset = ref(0)
    const limit = ref(20)

    return {
        showSearchTab,
        searchText,
        category,
        category_list,
        offset,
        limit
    }
})
