<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { userStore } from '@/store/User';
import { createPlaylistService } from '@/service/playlist/createAddService';

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
    document.title = 'Music'
})

onMounted(async()=>{
})

</script>

<template>
    <div>
        This is Music page
    </div>
</template>