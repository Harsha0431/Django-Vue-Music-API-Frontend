<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore'
import { userStore } from '@/store/User'
import { ref, onBeforeMount } from 'vue'
import { getLikedPlaylistData } from '@/service/playlist/listDataService'
import { ToastStore } from '@/store/ToastStore'
import { useRouter } from 'vue-router'
import { usePlaylistStore } from '@/store/PlaylistStore'

import areArraysEqual from '@/helpers/ArraysCompare/areArraysEqual'
import PlaylistView from '../components/PlaylistDataView/PlaylistView.vue'

const spotifyStore = useSpotifyStore()

const userStoreObj = userStore()

const toastStore = ToastStore()

const playlistStore = usePlaylistStore()

const router = useRouter()

const dataFetched = ref(0)

async function fetchRecommendedTracksData() {
    await getLikedPlaylistData(userStoreObj.userToken, {
        track_list: spotifyStore.recommendation_list
    }).then((res) => {
        if (res.code == 1) {
            playlistStore.updateRecommendedList(res.data)
            dataFetched.value = 1
        } else if (res.code == -2) {
            toastStore.message = 'Please login to continue'
            toastStore.type = 'alert'
            toastStore.showToast = true
            router.push('/login')
        } else {
            dataFetched.value = -1
        }
    })
}

onBeforeMount(async () => {
    if (!userStoreObj.isLoggedIn) {
        router.push('/login')
        return
    }
    if (spotifyStore.recommendation_list.length > 0) {
        if (areArraysEqual(spotifyStore.recommendation_list, playlistStore.recommendedList.list)) {
            dataFetched.value = 1
            return
        }
        fetchRecommendedTracksData()
    } else {
        await spotifyStore.fetchRecommendedTracks_from_db('from-data-list').then(() => {
            fetchRecommendedTracksData()
        })
    }
})
</script>

<template>
    <div class="h-full w-full">
        <span v-if="dataFetched == 0">Loading ...</span>
        <span v-else-if="dataFetched == -1"
            >Failed to load data. Refresh this page or view other library</span
        >
        <div v-else class="flex flex-col gap-y-4 h-full w-full">
            <div class="flex flex-col align-middle text-start">
                <span class="text-2xl tracking-wide text-gray-300 font-bold bg-transparent">
                    Recommended Gems
                </span>
                <span class="text-sm tracking-wide text-gray-400 font-semibold">
                    Tracks carefully selected based on your preferences.
                </span>
            </div>

            <div class="w-full h-full min-h-[1px]">
                <PlaylistView :list="playlistStore.recommendedList.data" />
            </div>
        </div>
    </div>
</template>
