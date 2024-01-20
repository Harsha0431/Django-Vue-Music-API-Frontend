<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore';
import { onMounted, ref } from 'vue';

const spotifyStore = useSpotifyStore()

const likedListData = ref([])

onMounted(async()=>{
    
})

</script>

<template>
    <div>
        Liked List
    </div>
</template>