<script setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
    document.title = `${route.params.name} - Artist`
    if(! route.params.name || route.params.name.length < 1)
        router.replace('/')
    console.log(route.params.name, route.query.id)
})
</script>

<template>
    <div>This is Artist page</div>
</template>
