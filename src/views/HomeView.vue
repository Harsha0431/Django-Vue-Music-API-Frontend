<script setup>
import { onBeforeMount } from 'vue'
import { useSpotifyStore } from '@/store/SpotifyStore'
import { ToastStore } from '@/store/ToastStore'
import MusicBarAnimated from '@/components/loaders/MusicBarAnimated.vue'
import { useRouter } from 'vue-router'
import { useHomeArtistStore } from '@/store/HomeArtistStore'
import HomeArtistsView from '@/components/PlaylistDataView/HomeArtistsView.vue'

const spotifyStore = useSpotifyStore()
const toastStore = ToastStore()
const homeArtistStore = useHomeArtistStore()

const router = useRouter()

onBeforeMount(() => {
    document.title = 'musiBuzz'
})

const handleCategoryPlayBtnClick = async (type) => {
    if (spotifyStore.current_playing == type && spotifyStore.isPlaying) {
        spotifyStore.pauseClicked = true
        return
    }
    if (!spotifyStore.isPlaying) {
        toastStore.type = 'alert'
        toastStore.message = 'Please click on play icon to play tracks'
        toastStore.showToast = true
        return
    }
    await spotifyStore.setCurrentPlayingList(type)
}

const handleOpenListClick = (type) => {
    router.push({
        name: type
    })
}
</script>

<template>
    <div
        class="px-4 relative mt-2 flex flex-col ssm:gap-y-8 gap-y-6 overflow-x-hidden h-full overflow-y-auto pb-4"
    >
        <div class="mt-4 flex justify-center">
            <div
                class="flex justify-around max-ssm:min-w-max max-ssm:justify-center max-ssm:align-middle max-ssm:flex-col flex-wrap ssm:w-full gap-4"
            >
                <div
                    class="liked-tracks group max-ssm:w-[340px] max-vsm:max-w-[260px] ssm:min-w-[250px] relative flex justify-center gap-4 px-3 py-2 rounded-lg dark:bg-[#2d2c34] dark:hover:bg-[#3c3b45be] transition-colors text-center dark:text-gray-100 bg-[#f5f5f5a8] hover:bg-[#efeeeed6] shadow-sm"
                >
                    <div
                        class="absolute hidden transition-all rounded-lg inset-0 group-hover:backdrop-blur-lg group-hover:flex group-hover:justify-around"
                    >
                        <button
                            @click="handleCategoryPlayBtnClick('liked')"
                            class="flex items-center justify-center h-full opacity-75 hover:opacity-100"
                        >
                            <svg
                                v-if="
                                    spotifyStore.isPlaying &&
                                    spotifyStore.current_playing == 'liked'
                                "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            @click="handleOpenListClick('liked-list')"
                            class="opacity-75 hover:opacity-100 tracking-wide font-semibold text-gray-900 dark:text-gray-300"
                        >
                            Open
                        </button>
                    </div>
                    <svg
                        class="w-14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                fill="#ff3956"
                            ></path>
                        </g>
                    </svg>
                    <span
                        class="flex group-hover:invisible h-full align-middle relative justify-center items-center text-center font-semibold"
                        >Liked Tracks</span
                    >
                    <MusicBarAnimated v-if="spotifyStore.current_playing == 'liked'" class="ml-4" />
                </div>

                <div
                    class="interested-tracks group max-ssm:w-[340px] max-vsm:max-w-[260px] ssm:min-w-[250px] relative flex text-center justify-center gap-4 px-3 py-2 rounded-lg dark:bg-[#2d2c34] dark:hover:bg-[#3c3b45be] transition-colors dark:text-gray-100 bg-[#f5f5f5a8] hover:bg-[#efeeeed6] shadow-sm"
                >
                    <div
                        class="absolute hidden transition-all rounded-lg inset-0 group-hover:backdrop-blur-lg group-hover:flex group-hover:justify-around"
                    >
                        <button
                            @click="handleCategoryPlayBtnClick('interested')"
                            class="flex items-center justify-center h-full opacity-75 hover:opacity-100"
                        >
                            <svg
                                v-if="
                                    spotifyStore.isPlaying &&
                                    spotifyStore.current_playing == 'interested'
                                "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            @click="handleOpenListClick('interested-list')"
                            class="opacity-75 hover:opacity-100 tracking-wide font-semibold text-gray-900 dark:text-gray-300"
                        >
                            Open
                        </button>
                    </div>
                    <svg
                        fill="#ff3956"
                        class="w-14"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 222.944 222.944"
                        xml:space="preserve"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path
                                    d="M206.253,53.877l-0.178-6.012L95.421,68.558v105.815c-5-1.839-9.735-2.836-15.102-2.836 c-18.204,0-32.932,11.53-32.932,25.703s14.787,25.703,32.911,25.703c18.138,0,32.914-11.53,32.914-25.703 c0-1.288-0.296-73.767-0.352-98.264l75.561-14.137v70.707c-5-1.836-9.689-2.831-15.02-2.831c-18.182,0-32.891,11.53-32.891,25.703 s14.796,25.703,32.931,25.703c18.197,0,33.022-11.53,33.022-25.703C206.464,177.372,206.263,58.919,206.253,53.877z"
                                ></path>
                                <path
                                    d="M88.683,40.961c0,0,17.806-11.563,21.205-17.338c1.695-2.879,2.89-6.029,2.691-10.187C112.227,6.077,106.841,0,100.244,0 c-6.491,0-11.583,5.401-11.583,5.401S83.86,0,77.078,0c-6.596,0-11.983,6.077-12.335,13.437c-0.199,4.157,1.001,7.321,2.691,10.187 C70.811,29.348,88.683,40.961,88.683,40.961z"
                                ></path>
                                <path
                                    d="M61.647,108.086c1.695-2.879,2.89-6.029,2.691-10.186c-0.353-7.359-5.739-13.437-12.335-13.437 c-6.491,0-11.583,5.401-11.583,5.401s-4.801-5.401-11.583-5.401c-6.596,0-11.983,6.077-12.335,13.437 c-0.199,4.157,1.001,7.321,2.691,10.186c3.377,5.725,21.249,17.338,21.249,17.338S58.248,113.861,61.647,108.086z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                    <span
                        class="flex group-hover:invisible justify-center items-center text-center font-semibold h-full"
                        >Interested Tracks</span
                    >
                    <MusicBarAnimated
                        v-if="spotifyStore.current_playing == 'interested'"
                        class="ml-4"
                    />
                </div>

                <div
                    class="recommended-tracks group max-ssm:w-[340px] max-vsm:max-w-[260px] ssm:min-w-[250px] relative flex justify-center gap-4 px-3 py-2 rounded-lg dark:bg-[#2d2c34] dark:hover:bg-[#3c3b45be] transition-colors dark:text-gray-100 bg-[#f5f5f5a8] hover:bg-[#efeeeed6] shadow-sm"
                >
                    <div
                        class="absolute hidden transition-all rounded-lg inset-0 group-hover:backdrop-blur-lg group-hover:flex group-hover:justify-around"
                    >
                        <button
                            @click="handleCategoryPlayBtnClick('recommended')"
                            class="flex items-center justify-center h-full opacity-75 hover:opacity-100"
                        >
                            <svg
                                v-if="
                                    spotifyStore.isPlaying &&
                                    spotifyStore.current_playing == 'recommended'
                                "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            @click="handleOpenListClick('recommended-list')"
                            class="opacity-75 hover:opacity-100 tracking-wide font-semibold text-gray-900 dark:text-gray-300"
                        >
                            Open
                        </button>
                    </div>
                    <svg
                        class="w-14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2L14.09 8.74L21 9.27L15.5 14.14L17.18 21L12 17.74L6.82 21L8.5 14.14L3 9.27L9.91 8.74L12 2Z"
                            fill="#ff3956"
                        />
                    </svg>
                    <span
                        class="flex group-hover:invisible justify-center items-center text-center font-semibold h-full"
                        >Recommended Tracks</span
                    >
                    <MusicBarAnimated
                        v-if="spotifyStore.current_playing == 'recommended'"
                        class="ml-4"
                    />
                </div>
            </div>
        </div>
        <div
            class="flex justify-center relative mt-3 max-sm:mt-2 w-full flex-col gap-y-8 lg:text-base text-sm tracking-wide dark:text-gray-300 text-gray-700"
        >
            <div v-show="homeArtistStore.userArtists.length > 0" class="flex flex-col gap-y-3">
                <span class="font-semibold"> Artists You've Discovered </span>
                <div>
                    <home-artists-view :list="homeArtistStore.userArtists" />
                </div>
            </div>
            <div v-show="homeArtistStore.suggestedArtists.length > 0" class="flex flex-col gap-y-4">
                <span class="font-semibold">Suggested Artists for You</span>
                <div>
                    <home-artists-view :list="homeArtistStore.suggestedArtists" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-explore-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

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
