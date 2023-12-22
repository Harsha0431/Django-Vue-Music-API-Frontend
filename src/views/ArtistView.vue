<script setup>
import { onBeforeMount } from "vue";
import { useRoute , useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onBeforeMount(()=>{
    document.title = 'Artist';
    if(route.params.name)
        router.push(`/artist/${route.params.name}/profile`)
})
</script>

<template>
    <div>
        This is Artist page
    </div>
</template>