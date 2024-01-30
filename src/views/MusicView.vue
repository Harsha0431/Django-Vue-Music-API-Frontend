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
    if(!userStoreObj.isLoggedIn)
        router.push('/login')
    else{
        if(currentRouteName.value == 'liked-list'){
            childComponent.value = LikedListView
        }
        else if (currentRouteName.value == 'interested-list')
            childComponent.value = InterestedList
        else if (currentRouteName.value == 'recommended-list')
            childComponent.value = RecommendedList
        else
            childComponent.value = LikedListView
    }
})

onMounted(async()=>{
})

</script>

<template>
    <div class="flex w-full text-gray-50">
        <div>
            <span>Your Playlists</span>
            <Transition name="slide-fade">
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