<script setup>
import { useSearchStore } from '@/store/SearchStore'

const searchStore = useSearchStore()


</script>

<template>
    <div class="backdrop-blur-md backdrop:bg-transparent">
        <div class="search-container">
            <input type="search" v-model="searchStore.searchText" placeholder="Search For Artist, Music track, Album"
                class="w-full px-4 py-2 border-[1px] rounded-md focus:inset-0 focus:outline-none  focus:border-gray-400">
        </div>
    </div>
</template>
