<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore';
import { userStore } from '@/store/User';
import { onMounted, ref } from 'vue';
import { getLikedPlaylistData } from '@/service/playlist/listDataService';
import { ToastStore } from '@/store/ToastStore';
import { useRouter } from 'vue-router';
import { usePlaylistStore } from '@/store/PlaylistStore';

import areArraysEqual from '@/helpers/ArraysCompare/areArraysEqual'

const spotifyStore = useSpotifyStore()

const userStoreObj = userStore()

const toastStore = ToastStore()

const playlistStore = usePlaylistStore()

const router = useRouter()

const dataFetched = ref(0)

onMounted(async()=>{
    if(!userStoreObj.isLoggedIn){
        router.push('/login')
        return
    }
    
    if(areArraysEqual(spotifyStore.liked_list , playlistStore.likedList.list)){
        dataFetched.value = 1
        return
    }

    await getLikedPlaylistData(userStoreObj.userToken , {track_list:spotifyStore.liked_list})
        .then((res)=>{
            if(res.code == 1){
                playlistStore.updateLikedListData(res.data)
                console.log(playlistStore.likedList.data)
                dataFetched.value = 1
            }
            else if(res.code == -2){
                toastStore.message = 'Please login to continue'
                toastStore.type = 'alert'
                toastStore.showToast = true
                router.push('/login')
            }
            else{
                dataFetched.value = -1
            }
            
        })
})

</script>

<template>
    <div class="h-full w-full">
        <span v-if="dataFetched == 0">Loading ...</span>
        <span v-else-if="dataFetched == -1">Failed to load data. Refresh this page or view other library</span>
        <div v-else
            class="flex flex-col gap-y-2 h-full w-full"
        >
            <h1 class="text-3xl font-bold">Liked List</h1>
            <div class="flex flex-col gap-x-6 gap-y-8 h-full overflow-y-auto w-full">
                <div v-for="(track , index) in playlistStore.likedList.data" :key="index" class="flex gap-x-4 w-full">
                    <div class="overflow-hidden w-20 object-fill rounded-lg">
                        <img :src="track.track_image" :alt="track.track_name" class="object-fill hover:scale-105 transition-all rounded-lg" />
                    </div>
                    <div class="flex justify-between gap-x-4 w-full">
                        <div class="flex flex-col gap-y-1">
                            <span>{{ track.track_name }}</span>
                            <span>{{ track.artist_name }}</span>
                        </div>
                        <div class="place-items-center flex justify-center">
                            <button class="h-min">Play</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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