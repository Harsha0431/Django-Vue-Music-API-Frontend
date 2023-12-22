<script setup>
import { onBeforeMount, ref } from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
const artistName = ref('');

onBeforeMount(()=>{
    artistName.value = route.params.name;
})

</script>



<template>
    <div>
        Artist Name: <h1>{{artistName}}</h1>
    </div>
</template>