<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { loaderStore } from '@/store/LoaderStore'
import { useArtistPageStore } from '@/store/ArtistPageStore'
import { fetchUserArtists } from '@/service/Artists/fetchArtistPageData'
import { userStore } from '@/store/User'
import { useRouter } from 'vue-router'
import HomeArtistsView from '@/components/PlaylistDataView/HomeArtistsView.vue'
import { ToastStore } from '@/store/ToastStore'

const useLoaderStore = loaderStore()
const artistStore = useArtistPageStore()
const useUserStore = userStore()
const router = useRouter()
const useToastStore = ToastStore()

async function fetchData() {
    useLoaderStore.showLoader = true
    await fetchUserArtists(useUserStore.userToken)
        .then((res) => {
            if (res.code == 1) {
                artistStore.artistData = res.data
                artistStore.dataFetched = true
            }
            else{
                useToastStore.message = res.message
                if(res.code == 0)
                    useToastStore.type = 'alert'
                else if(res.code == -1)
                    useToastStore.type = 'error'
                useToastStore.showToast = true
                router.push('/')
            }
            console.log(res)
            useLoaderStore.showLoader = false
        })
        .catch((err) => {
            console.log(err)
            useLoaderStore.showLoader = false
            router.replace('/')
        })
    useLoaderStore.showLoader = false
}

onBeforeMount(async () => {
    document.title = 'Artist - MusiBuzz'
})

onMounted(async () => {
    if (useUserStore.isLoggedIn) await fetchData()
    else router.push('/login')
})
</script>

<template>
    <div>
        <div class="w-full h-full relative mt-3 px-4 max-vsm:px-2 flex flex-col gap-y-2">
            <span
                class="sm:text-lg text-base dark:text-gray-300 text-gray-900 font-semibold relative ml-4 max-ssm:ml-2"
            >
                Artists you explored
            </span>
            <home-artists-view :list="artistStore.artistData" />
        </div>
    </div>
</template>
