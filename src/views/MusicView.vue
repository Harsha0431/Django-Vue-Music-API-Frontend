<script setup>
import { computed, onBeforeMount, ref, watchEffect } from 'vue'
import { userStore } from '@/store/User'
import { createPlaylistService } from '@/service/playlist/createAddService'
import { useRoute, useRouter } from 'vue-router'
import LikedListView from './LikedListView.vue'
import RecommendedList from './RecommendedList.vue'
import InterestedList from './InterestedList.vue'
import { useSpotifyStore } from '@/store/SpotifyStore'

const router = useRouter()
const routes = useRoute()
const currentRouteName = computed(() => {
    return routes.name || 'liked-list'
})

//Store objects
const userStoreObj = userStore()

//Local Variables
const childComponent = ref()
const childRouteName = ref(currentRouteName.value || 'liked-list')

const spotifyStore = useSpotifyStore()

//Functions
const handleCreatePlaylist = async () => {
    const data = { playlist_name: 'playlist3' }
    await createPlaylistService(data).then((res) => {
        console.log(res)
    })
}

watchEffect(() => {
    console.log(childRouteName.value)
    if (childRouteName.value == 'liked-list') {
        childComponent.value = LikedListView
        spotifyStore.current_playing = 'liked'
    } else if (childRouteName.value == 'interested-list') {
        childComponent.value = InterestedList
        spotifyStore.current_playing = 'interested'
    } else if (childRouteName.value == 'recommended-list') {
        childComponent.value = RecommendedList
        spotifyStore.current_playing = 'recommended'
    }
})

onBeforeMount(() => {
    document.title = 'Music'
    if (!userStoreObj.isLoggedIn) {
        router.push('/login')
        return
    }
    if (currentRouteName.value == 'liked-list') {
        childComponent.value = LikedListView
        spotifyStore.current_playing = 'liked'
    } else if (currentRouteName.value == 'interested-list') {
        childComponent.value = InterestedList
        spotifyStore.current_playing = 'interested'
    } else if (currentRouteName.value == 'recommended-list') {
        spotifyStore.current_playing = 'recommended'
        childComponent.value = RecommendedList
    } else childComponent.value = LikedListView
})
</script>

<template>
    <div
        class="flex w-full h-full dark:text-gray-50 px-2 ssm:px-4 max-ssm:flex-col gap-y-4 ssm:gap-x-6"
    >
        <div
            class="ssm:w-[300px] max-ssm:hidden md:w-[400px] gap-y-2 flex flex-col px-4 py-2 ssm:text-gray-300 ssm:hover:text-gray-200 text-gray-200 relative mt-8 text-[18px] max-ssm:text-[16px]"
        >
            <button
                class="w-fit tracking-wide font-semibold dark:hover:text-gray-300 hover:text-gray-800"
                @click="childRouteName = 'liked-list'"
                :class="[
                    childRouteName == 'liked-list'
                        ? 'text-gray-900 dark:text-gray-200'
                        : 'text-gray-700 dark:text-gray-400'
                ]"
            >
                Liked Songs
            </button>
            <button
                class="w-fit tracking-wide font-semibold dark:hover:text-gray-300 hover:text-gray-800"
                @click="childRouteName = 'interested-list'"
                :class="[
                    childRouteName == 'interested-list'
                        ? 'text-gray-900 dark:text-gray-200'
                        : 'text-gray-700 dark:text-gray-400'
                ]"
            >
                Interested
            </button>
            <button
                class="w-fit tracking-wide font-semibold dark:hover:text-gray-300 hover:text-gray-800"
                @click="childRouteName = 'recommended-list'"
                :class="[
                    childRouteName == 'recommended-list'
                        ? 'text-gray-900 dark:text-gray-200'
                        : 'text-gray-700 dark:text-gray-400'
                ]"
            >
                Recommended
            </button>
            <button
                class="w-fit tracking-wide font-semibold dark:hover:text-gray-300 hover:text-gray-800"
                :class="[
                    childRouteName == 'custom-playlist'
                        ? 'text-gray-900 dark:text-gray-200'
                        : 'text-gray-700 dark:text-gray-400'
                ]"
            >
                Your Playlists
            </button>
        </div>
        <div class="ssm:hidden flex w-full justify-end p-2">
            <select
                v-model="childRouteName"
                class="bg-transparent dark:text-gray-200 text-gray-800 border px-0.5 py-1 border-gray-400 focus:outline-none font-semibold tracking-wide"
            >
                <option
                    @click="childRouteName = 'liked-list'"
                    value="liked-list"
                    class="text-gray-800 font-semibold tracking-wide"
                >
                    Favorites
                </option>
                <option
                    @click="childRouteName = 'interested-list'"
                    value="interested-list"
                    class="text-gray-800 font-semibold tracking-wide"
                >
                    Interested
                </option>
                <option
                    @click="childRouteName = 'recommended-list'"
                    value="recommended-list"
                    class="text-gray-800 font-semibold tracking-wide"
                >
                    Recommended
                </option>
                <option value="playlist" class="text-gray-800 font-semibold tracking-wide">
                    Your Playlists
                </option>
            </select>
        </div>
        <div class="h-full min-h-[1px] pb-4 w-full">
            <Transition name="slide-fade" class="w-full h-full">
                <LikedListView v-if="childRouteName == 'liked-list'" />
                <RecommendedList v-else-if="childRouteName == 'recommended-list'" />
                <InterestedList v-else-if="childRouteName == 'interested-list'" />
                <LikedListView v-else />
            </Transition>
        </div>
    </div>
</template>

<!-- //TODO:Add transitions if needed -->
<!-- <style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s linear;
}

.slide-fade-leave-to {
    opacity: 0;
}
.slide-fade-enter-from {
    transform: translateY(100%);
}
</style> -->
