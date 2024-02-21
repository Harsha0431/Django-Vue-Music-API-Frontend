<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore'
import { loaderStore } from '@/store/LoaderStore'
import { onMounted } from 'vue'

const store = useSpotifyStore()
const loaderStoreObj = loaderStore()

onMounted(() => {
    window.onSpotifyIframeApiReady = async (IFrameAPI) => {
        const element = document.getElementById('embed-iframe')
        const options = {
            width: `${window.innerWidth > 500 ? '100%' : '100%'}`,
            height: `${window.innerWidth > 500 ? '80' : '80'}`,
            uri: `${store.track_list[store.current_track]}`
        }
        const callback = (EmbedController) => {
            EmbedController.addListener('playback_update', (e) => {
                // if(e.data.position>(e.data.duration*3/4) && !e.data.position==0 && !e.data.duration == 0)
                // {
                //   const recent = store.track_list[store.current_track]
                //   store.addToCompletelyListenedList(recent)
                // }

                if (e.data.position == e.data.duration && e.data.duration != 0) {
                    store.nextTrack()
                    // store.addToCompletelyListenedList(recent)
                    // store.track_list.shift()
                    // store.previous_list.unshift(recent)
                    if (store.track_list.length > 0) {
                        EmbedController.loadUri(store.track_list[store.current_track])
                        EmbedController.play()
                    }
                }

                if (e.data.position != 0) {
                    store.isPlaying = true
                } else {
                    store.isPlaying = false
                }

                if (e.data.position == 0 && store.isInterrupted) {
                    EmbedController.loadUri(store.track_list[store.current_track])
                    EmbedController.play()
                    store.isInterrupted = false
                    store.pauseClicked = false
                }

                if (e.data.isPaused) {
                    store.isPlaying = false
                }

                if (e.data.position != e.data.duration && store.pauseClicked) {
                    console.log('here not equal interrupt')

                    EmbedController.pause()
                    store.isPlaying = false
                    store.pauseClicked = false
                }

                if (e.data.position == e.data.duration && e.data.duration == 0) {
                    store.isPlaying = false
                }

                if (e.data.position != e.data.duration && store.isInterrupted) {
                    EmbedController.loadUri(store.track_list[store.current_track])
                    store.isInterrupted = false
                    EmbedController.play()
                }
            })
        }
        loaderStoreObj.toggleLoader()
        try {
            await IFrameAPI.createController(element, options, callback)
        } finally {
            loaderStoreObj.toggleLoader()
        }
    }
})
</script>

<template>
    <div class="px-4 pb-2 flex justify-end max-vsm:scale-95">
        <div id="embed-iframe" class=""></div>
    </div>
</template>
