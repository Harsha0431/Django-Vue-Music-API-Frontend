<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore';
import { userStore } from '@/store/User';
import { onMounted, ref } from 'vue';
import { getLikedPlaylistData } from '@/service/playlist/listDataService';
import { ToastStore } from '@/store/ToastStore';
import { useRouter } from 'vue-router';

const spotifyStore = useSpotifyStore()

const userStoreObj = userStore()

const toastStore = ToastStore()

const likedListData = ref([])

const router = useRouter()

onMounted(async()=>{
    await getLikedPlaylistData(userStoreObj.userToken , {track_list:spotifyStore.liked_list})
        .then((res)=>{
            if(res.code == 1){
                likedListData.value = res.data
                console.log(likedListData.value)
            }
            if(res.code == -2){
                toastStore.message = 'Please login to continue'
                toastStore.type = 'alert'
                toastStore.showToast = true
                router.push('/login')
            }
        })
})

</script>

<template>
    <div>
        Liked List
    </div>
</template>