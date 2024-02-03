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
        <div class="ssm:w-[300px] md:w-[400px] flex flex-col">
            <button class="w-fit" @click="childRouteName = 'liked-list'">Liked Songs</button>
            <button class="w-fit" @click="childRouteName = 'interested-list'">Interested</button>
            <button class="w-fit" @click="childRouteName = 'recommended-list'">Recommended</button>
            <button class="w-fit">Your Playlists</button>
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
