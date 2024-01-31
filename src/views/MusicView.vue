<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { userStore } from '@/store/User';
import { createPlaylistService } from '@/service/playlist/createAddService';
import { useRoute, useRouter } from 'vue-router';
import LikedListView from './LikedListView.vue';
import RecommendedList from './RecommendedList.vue';
import InterestedList from './InterestedList.vue';

const router = useRouter()
const routes = useRoute()
const currentRouteName = computed(() => {
    return routes.name || 'liked-list'
})
//Store objects
const userStoreObj = userStore()

//Local Variables
const childComponent = ref()

//Functions
const handleCreatePlaylist = async() =>{
    const data = {playlist_name:"playlist3"}
    await createPlaylistService(data)
        .then((res)=>{
            console.log(res)
        })
}

onBeforeMount(()=>{
    document.title = 'Music' ;
    if(!userStoreObj.isLoggedIn){
        router.push('/login')
        return
    }
    
    if(currentRouteName.value == 'liked-list'){
        childComponent.value = LikedListView
    }
    else if (currentRouteName.value == 'interested-list')
        childComponent.value = InterestedList
    else if (currentRouteName.value == 'recommended-list')
        childComponent.value = RecommendedList
    else
        childComponent.value = LikedListView
})

onMounted(async()=>{
})

</script>

<template>
    <div class="flex w-full h-full dark:text-gray-50 px-2 ssm:px-4 max-ssm:flex-col gap-y-4 ssm:gap-x-6">
        <div class="ssm:w-[300px] md:w-[400px] flex flex-col">
            <button class="w-fit">Liked Songs</button>
            <button class="w-fit">Interested</button>
            <button class="w-fit">Recommended</button>
            <button class="w-fit">Your Playlists</button>
        </div>
        <div class="h-full min-h-[1px] pb-4 w-full">
            <Transition name="slide-fade" class="w-full h-full">
                <LikedListView v-if="currentRouteName=='liked-list'"/>
                <RecommendedList v-else-if="routes.name=='recommended-list'"/>
                <InterestedList v-else-if="routes.name=='interested-list'" />
                <LikedListView v-else />
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

</style>