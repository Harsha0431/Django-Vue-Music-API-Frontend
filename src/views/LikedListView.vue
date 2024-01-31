Tracks in flex list

------------------------------------------------------------------

<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore';
import { userStore } from '@/store/User';
import { onMounted, ref, onBeforeMount } from 'vue';
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

onBeforeMount(async()=>{
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
            <div class="flex w-full h-full justify-center">
                <div class="flex flex-col gap-x-6 gap-y-8 h-full overflow-y-auto w-full">
                    <div class="flex gap-x-4 w-full flex-wrap gap-y-4 justify-start relative">
                        <div v-for="(track , index) in playlistStore.likedList.data" :key="index"
                            class="group px-4 py-2 rounded-md flex gap-x-4 w-[320px] place-items-center overflow-hidden
                                    dark:bg-[#39374267] bg-[#efefef]
                                    dark:hover:bg-[#2a2931] hover:bg-[#e8e8e8] transition-all z-0"
                        >
                            <div class="md:w-[120px] md:h-auto overflow-hidden rounded-md">
                                <img
                                    class="rounded-md w-full h-full hover:scale-105 transition-all"
                                    :src="track.track_image" :alt="track.track_name"
                                />
                            </div>
                            <div class="flex flex-col gap-y-1 pt-2 w-full">
                                <span class="font-semibold tracking-wide w-fit text-[14px]">{{ track.track_name }}</span>
                                <!-- TODO:When click on artist name , redirect to artist profile page -->
                                <span class="tracing-wide font-semibold transition-all text-[13px]
                                            dark:text-gray-400 dark:hover:text-gray-300
                                            text-gray-600 hover:text-gray-800 hover:underline
                                            cursor-pointer w-fit z-10">{{ track.artist_name }}</span>
                                <div class="opacity-0 flex transition-all w-full justify-end group-hover:opacity-100">
                                    <button class="rounded-full z-[100] relative md:-mt-4 bg-[#ff3957e2] transition-all p-2 hover:bg-[#ff3957]">
                                        <svg v-if="spotifyStore.track_list[spotifyStore.current_track] == track.track_id" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="pause w-6 h-6 stroke-gray-200">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="stroke-gray-200 play w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
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