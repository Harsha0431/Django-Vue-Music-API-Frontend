<script setup>
import PlaylistView from '@/components/PlaylistDataView/PlaylistView.vue'
import { useSearchStore } from '@/store/SearchStore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSearchQuery } from '@/service/search/SearchService'
import { ToastStore } from '@/store/ToastStore'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const toastStore = ToastStore()

const loadingNextOffset = ref(false)

const handleLoadMoreClick = async () => {
    loadingNextOffset.value = true
    const newOffset = searchStore.offset + searchStore.limit
    searchStore.limit = 10
    await getSearchQuery(searchStore.searchText, searchStore.category, newOffset, searchStore.limit)
        .then((res) => {
            if (res.code == 1) {
                console.log(res.data)
                if (res.data.length < 1) {
                    toastStore.message = 'No matching data found'
                    toastStore.type = 'alert'
                    toastStore.showToast = true
                    loadingNextOffset.value = false
                    searchStore.noMoreTracks = true
                    return
                }
                searchStore.noMoreTracks = false
                searchStore.searchResult = searchStore.searchResult.concat(res.data)
                loadingNextOffset.value = false
                searchStore.offset = newOffset
                router.replace({
                    name: 'search',
                    query: {
                        q: searchStore.searchText,
                        type: searchStore.category,
                        offset: searchStore.offset,
                        limit: searchStore.limit
                    }
                })
            }
            else{
                toastStore.message = 'No matching data found'
                toastStore.type = 'alert'
                toastStore.showToast = true
                searchStore.noMoreTracks = true
            }
        })
        .finally(() => {
            loadingNextOffset.value = false
        })
    loadingNextOffset.value = false
}

onMounted(() => {
    searchStore.showSearchTab = true
    searchStore.searchText = route.query.q || ''
    searchStore.category = route.query.type || 'track'
    searchStore.offset = route.query.offset || 0
    searchStore.limit = route.query.limit || 20
})
</script>

<template>
    <div class="w-full h-full flex justify-center px-4 py-1.5">
        <div
            v-show="searchStore.searchDataFetched"
            v-if="searchStore.searchDataFetched && searchStore.searchResult.length > 0"
            class="h-full w-full overflow-hidden flex flex-col place-items-center justify-center py-4"
        >
            <div class="w-full sm:max-w-[600px] justify-center h-full">
                <PlaylistView :list="searchStore.searchResult" />
            </div>
            <div class="flex w-full justify-center pt-1">
                <button
                    v-if="!searchStore.noMoreTracks"
                    @click="handleLoadMoreClick"
                    :disabled="loadingNextOffset"
                    class="w-fit px-3 py-1 bg-[#ff3957e2] disabled:cursor-not-allowed tracking-wider hover:bg-[#ff3957] text-sm font-semibold rounded-lg backdrop-blur-md shadow text-gray-50 transition-all"
                >
                    {{ loadingNextOffset ? 'Loading...' : 'Load More' }}
                </button>
                <span v-else class="text-gray-900 dark:text-gray-200"
                    >No more data found to display</span
                >
            </div>
        </div>
        <span
            v-else-if="searchStore.searchDataFetched && searchStore.searchResult < 1"
            class="text-gray-900 dark:text-gray-200"
        >
            No matching data found
        </span>
    </div>
</template>

<style>
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #44414a;
    border-radius: 25rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #504d57;
}
</style>
