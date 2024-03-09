<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loaderStore } from '@/store/LoaderStore'
import { getArtistRelatedTracks } from '@/service/search/SearchService'
import { ToastStore } from '@/store/ToastStore'

import ArtistRelatedTracksView from '../components/PlaylistDataView/ArtistRelatedTracksView.vue'

const route = useRoute()
const router = useRouter()
const useLoaderStore = loaderStore()
const useToastStore = ToastStore()

const artistList = ref([])
const dataFetched = ref(false)

async function fetchArtistRelatedTracks() {
    useLoaderStore.showLoader = true
    await getArtistRelatedTracks(route.query.id)
        .then((response) => {
            if (response.code == 1 && response.data.length > 0) {
                artistList.value = response.data
                useToastStore.type = 'success'
                useToastStore.showToast = true
                useToastStore.message = response.message
                useLoaderStore.showLoader = false
                dataFetched.value = true
            } else {
                useToastStore.showToast = true
                if (response.code == 0) useToastStore.type = 'alert'
                else useToastStore.type = 'error'
                useToastStore.message = response.message
                useToastStore.showToast = true
                useLoaderStore.showLoader = false
                dataFetched.value = true
            }
        })
        .finally(() => {
            useLoaderStore.showLoader = false
            dataFetched.value = true
        })
}

onBeforeMount(async () => {
    document.title = `${route.params.name} - Artist`
    if (!route.params.name || route.params.name.length < 1) {
        router.replace('/')
        return
    } else if (!route.query.id || route.query.id.length < 1) {
        router.replace({
            name: 'search',
            query: {
                q: route.params.name,
                type: 'artist',
                offset: 0,
                limit: 20
            }
        })
        return
    }
    await fetchArtistRelatedTracks()
})
</script>

<template>
    <div class="w-full h-full">
        <div
            class="w-full flex flex-col gap-y-4 items-center justify-center h-full"
            v-if="dataFetched && artistList.length > 0"
        >
            <div class="w-[95%] sm:max-w-[600px] h-full min-h-[1px]">
                <ArtistRelatedTracksView :list="artistList" :artistName="route.params.name">
                </ArtistRelatedTracksView>
            </div>
        </div>
        <span
            v-else
            class="text-gray-900 text-center dark:text-gray-200 relative top-[5px] text-base max-ssm:text-sm tracking-wide"
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
