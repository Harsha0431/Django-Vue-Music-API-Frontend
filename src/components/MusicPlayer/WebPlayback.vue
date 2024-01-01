<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore';
import {loaderStore } from '@/store/LoaderStore'
import { onMounted } from 'vue';

const store = useSpotifyStore()
const loaderStoreObj = loaderStore()

onMounted(()=>{
  window.onSpotifyIframeApiReady = async(IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
      width: `${window.innerWidth > 500?'450':'100%'}`,
      height: `${window.innerWidth > 500?'140':'150'}`,
      uri:`${store.track_list[store.current_track]}`
    };
    const callback = (EmbedController) => {
      
      EmbedController.addListener('playback_update', e => {

        if(e.data.position>e.data.duration/2)
        {
          const recent = store.track_list[store.current_track]
          store.addToCompletelyListenedList(recent)
        }

        if(e.data.position==e.data.duration && e.data.duration!=0){
          const recent = store.track_list[store.current_track]
          store.addToCompletelyListenedList(recent)
          store.track_list.shift()
          store.previous_list.unshift(recent)
          if(store.track_list.length>0){
            EmbedController.loadUri(store.track_list[store.current_track])
            EmbedController.play()
          }
        }

        if (e.data.position!=0){
          store.isPlaying = true
        }

        if (e.data.position!=e.data.duration && store.isInterrupted) {
          EmbedController.loadUri(store.track_list[store.current_track])
          EmbedController.play()
          store.isInterrupted = false
        }
      });
    };
    loaderStoreObj.toggleLoader();
    try {
      await IFrameAPI.createController(element, options, callback);
    } finally {
      loaderStoreObj.toggleLoader();
    }
  };
})

</script>


<template>
  <div class="px-4 flex justify-end">
    <div id="embed-iframe"></div>
  </div>
</template>
