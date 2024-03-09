<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['list'])

const handleViewArtistClick = (id, name, image) => {
    router.push({
        name: 'artist-profile',
        params: {
            name: name
        },
        query: {
            id: id
        },
        props: {
            image: image
        }
    })
}

function getImage(artist_img, track_img) {
    if (artist_img) {
        if (artist_img.length > 0) return artist_img
        else return track_img
    } else {
        return track_img
    }
}
</script>
<template>
    <div>
        <div
            class="place-items-center grid lg:flex lg:flex-wrap lg:gap-x-4 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-vsm:grid-cols-2 max-vvsm:grid-cols-1 gap-x-3 gap-y-4"
        >
            <button
                @click="handleViewArtistClick(item.artist_id, item.artist, item.artist_img)"
                v-for="(item, index) in props.list"
                :key="index"
                class="w-fit rounded-sm dark:bg-[#2d2c34] dark:hover:bg-[#3c3b45be] transition-colors text-center dark:text-gray-100 bg-[#f5f5f5a8] hover:bg-[#efeeeed6] shadow-md overflow-hidden"
            >
                <div class="flex flex-col">
                    <div
                        class="max-w-[150px] max-h-[150px] rounded-md overflow-hidden object-contain"
                    >
                        <img
                            :src="getImage(item.artist_img, item.track_img)"
                            :alt="item.artist"
                            class="hover:scale-105 transition-all object-fill"
                        />
                    </div>
                    <div class="pb-2 pt-1 px-1">
                        <span
                            class="font-semibold line-clamp-1 tracking-wide text-sm text-gray-800 dark:text-gray-300"
                            >{{ item.artist }}</span
                        >
                        <span
                            v-if="item.followers"
                            class="text-xs text-gray-700 dark:text-gray-400 font-[500]"
                            >{{ item.followers }}
                            {{ item.followers == 1 ? 'follower' : 'followers' }}</span
                        >
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>
