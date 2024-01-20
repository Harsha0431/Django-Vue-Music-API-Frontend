<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { userStore } from '@/store/User';
import { createPlaylistService } from '@/service/playlist/createAddService';
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter()
const routes = useRoute()
const currentRouteName = computed(() => {
    return routes.name || 'music'
})
//Store objects
const userStoreObj = userStore()

//Local Variables

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
})

onMounted(async()=>{
})

</script>

<template>
    <div>
        This is Music page
        <div>
            Playlist
        </div>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <RouterView v-if="currentRouteName!='music'" />
            </keep-alive>
        </transition>
    </div>
</template>