<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore'
import { ToastStore } from '@/store/ToastStore'

const props = defineProps(['list'])
const spotifyStore = useSpotifyStore()
const toastStore = ToastStore()

const playSelectedTrack = (id) => {
    if (spotifyStore.isPlaying) spotifyStore.playSelectedTrack(id)
    else {
        toastStore.type = 'alert'
        toastStore.message = 'Please play music to switch track'
        toastStore.showToast = true
    }
}

</script>

<template>
    <div class="flex w-full h-full justify-center overflow-y-auto">
        <div class="flex h-full w-full justify-center pr-2">
            <div class="flex gap-x-4 flex-wrap gap-y-3 justify-start relative">
                <div
                    v-for="(track, index) in props.list"
                    :key="index"
                    class="group px-4 justify-center place-items-center rounded-md py-2 flex gap-x-4 h-fit w-full overflow-hidden dark:bg-[#39374267] bg-[#efefef] dark:hover:bg-[#2a2931] hover:bg-[#e8e8e8] transition-all z-0"
                >
                    <div
                        class="w-[50px] h-[50px] md:w-[60px] md:h-[60px] overflow-hidden rounded-md"
                    >
                        <img
                            class="rounded-md w-full h-full hover:scale-105 transition-all"
                            :src="track.track_image"
                            :alt="track.track_name"
                        />
                    </div>
                    <div class="flex justify-between place-items-center w-full gap-x-2">
                        <div class="flex flex-col w-full">
                            <span class="font-semibold tracking-wide w-fit text-[14px]">{{
                                track.track_name
                            }}</span>
                            <!-- TODO:When click on artist name , redirect to artist profile page -->
                            <span
                                class="tracing-wide font-semibold transition-all text-[13px] dark:text-gray-400 dark:hover:text-gray-300 text-gray-600 hover:text-gray-800 hover:underline cursor-pointer w-fit z-10"
                            >
                                {{ track.artist_name }}
                            </span>
                        </div>
                        <div
                            class="md:opacity-0 flex transition-all justify-center place-items-center group-hover:opacity-100"
                        >
                            <div class="">
                                <button
                                    v-if="
                                        spotifyStore.track_list[spotifyStore.current_track] ==
                                        track.track_id
                                    "
                                    class="rounded-full z-[100] h-fit relative bg-[#ff3957e2] transition-all p-2 hover:bg-[#ff3957]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="pause w-6 h-6 stroke-gray-200"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                                        />
                                    </svg>
                                </button>
                                <button
                                    @click="() => playSelectedTrack(track.track_id)"
                                    v-else
                                    class="rounded-full z-[100] h-fit relative bg-[#ff3957e2] transition-all p-2 hover:bg-[#ff3957]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        class="stroke-gray-200 play w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
