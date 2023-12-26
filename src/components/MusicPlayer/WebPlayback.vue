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
      height: `${window.innerWidth > 500?'220':'230'}`,
      uri:`${store.track_list[store.current_track]}`
    };
    const callback = (EmbedController) => {
      EmbedController.addListener('playback_update', e => {
        if(e.data.position==e.data.duration && e.data.duration!=0){
          const recent = store.track_list[store.current_track]
          store.track_list.shift()
          store.track_list.push(recent)
          EmbedController.loadUri(store.track_list[store.current_track])
          EmbedController.play()
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
