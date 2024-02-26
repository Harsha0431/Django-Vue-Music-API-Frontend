import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search_store', () => {
    const showSearchTab = ref(false);
    const searchText = ref('')
    const activeSearchText = ref('')
    const category = ref('track')
    const category_list = [
        {
            name: 'Music Track',
            value: 'track'
        },
        {
            name: 'Artist',
            value: 'artist'
        }
    ]

    const offset = ref(0)
    const limit = ref(20)

    const searchResult = ref([])

    const searchDataFetched = ref(false)
    const noMoreTracks = ref(false)

    return {
        showSearchTab,
        activeSearchText,
        searchText,
        category,
        category_list,
        offset,
        limit,
        searchResult,
        searchDataFetched,
        noMoreTracks
    }
})
