<script setup>
import PlaylistView from '@/components/PlaylistDataView/PlaylistView.vue'
import areArraysEqual from '@/helpers/ArraysCompare/areArraysEqual'
import { getLikedPlaylistData } from '@/service/playlist/listDataService'
import { usePlaylistStore } from '@/store/PlaylistStore'
import { useSpotifyStore } from '@/store/SpotifyStore'
import { ToastStore } from '@/store/ToastStore'
import { userStore } from '@/store/User'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const spotifyStore = useSpotifyStore()
const userStoreObj = userStore()
const toastStore = ToastStore()
const playlistStore = usePlaylistStore()

const router = useRouter()
const dataFetched = ref(0)

onBeforeMount(async () => {
    if (!userStoreObj.isLoggedIn) {
        router.push('/login')
        return
    }

    if (
        areArraysEqual(spotifyStore.interested_list_from_model, playlistStore.interestedList.list)
    ) {
        dataFetched.value = 1
        return
    }

    await getLikedPlaylistData(userStoreObj.userToken, {
        track_list: spotifyStore.interested_list_from_model
    }).then((res) => {
        if (res.code == 1) {
            playlistStore.updateInterestedList(res.data)
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
})
</script>

<template>
    <div class="h-full w-full">
        <span v-if="dataFetched == 0" class="text-gray-900 dark:text-gray-200">Loading ...</span>
        <span v-else-if="dataFetched == -1" class="text-gray-900 dark:text-gray-200">
            Failed to load data. Refresh this page or view other library
        </span>
        <span v-else-if="playlistStore.interestedList.data.length<1" class="text-gray-900 dark:text-gray-200">
            Failed to load data. Refresh this page or view other library
        </span>
        <div v-else class="flex flex-col gap-y-4 h-full w-full">
            <div class="flex flex-col align-middle text-start">
                <span class="text-2xl tracking-wide dark:text-gray-300 text-gray-900 font-bold bg-transparent">
                    Essentials
                </span>
                <span class="text-sm tracking-wide dark:text-gray-400 text-gray-700 font-semibold">
                    A collection of your essential liked and listened tracks
                </span>
            </div>

            <div class="w-full h-full min-h-[1px]">
                <PlaylistView :list="playlistStore.interestedList.data" />
            </div>
        </div>
    </div>
</template>

<style scoped>
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
