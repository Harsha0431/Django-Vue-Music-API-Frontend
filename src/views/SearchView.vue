<script setup>
import { useSearchStore } from '@/store/SearchStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const searchStore = useSearchStore()

onMounted(()=>{
    searchStore.showSearchTab = true
    searchStore.searchText = route.query.q || ''
    searchStore.category = route.query.type || 'artist'
    searchStore.offset = route.query.offset || 0
    searchStore.limit = route.query.limit || 20
})
</script>

<template>
    <div class="backdrop-blur-md backdrop:bg-transparent"></div>
</template>
