<script setup>
  import { RouterView } from 'vue-router';
  import router from './router';
  import Navbar from './components/Navbar/NavbarCreated.vue';
  import MusicLoaderVue from '@/components/loaders/MusicLoader.vue'
  import SearchView from './views/SearchView.vue';

  import { themeStore } from './store/ThemeStore';
  import {loaderStore} from '@/store/LoaderStore'
  import { onBeforeMount, ref, watchEffect } from 'vue';
  import VueCookies from 'vue-cookies';
  import { VerifyToken } from './service/login/loginService';
  import { userStore } from './store/User';
  import ToastsView from './components/Toasts/ToastsView.vue';

  import WebPlayback from './components/MusicPlayer/WebPlayback.vue';
  import { useSpotifyStore } from '@/store/SpotifyStore';

  const spotifyStore = useSpotifyStore()
  const themeStoreObj = themeStore() ;
  const loaderStoreObj = loaderStore();
  const userStoreObj = userStore();

  const default_token_login = ref(true);

  const verify_user_token = async() =>{
    loaderStoreObj.toggleLoader()
    await VerifyToken(VueCookies.get('user-token'))
      .then((res)=>{
        if(res.code == 1){
          spotifyStore.is_active = true
          userStoreObj.setUser({username: res.user.username , userMail: res.user.email , userToken: VueCookies.get('user-token') , isLoggedIn:true , userRole:res.user.role})
        }
        else{
          router.push('/login')
        }
      })
      .catch((err)=>{
        console.log(err.message)
        router.push('/login')
      })
      .finally(()=>{
        loaderStoreObj.toggleLoader()
        default_token_login.value = false
      })
  }

  watchEffect(()=>{
    if(!userStoreObj.isLoggedIn && !default_token_login.value)
      router.push('/login')
  })

  onBeforeMount(()=>{
    if(default_token_login.value)
      if(VueCookies.get('user-token'))
        verify_user_token()
      else
        router.push('/login')
  })
</script>


//TODO:Add this snippet in body-container class {{themeStoreObj.isDarkTheme&& 'bg-[#1a1b1f]'}} for dark theme
<template>
  <div class="body-container" :class="[ 'body-container' , themeStoreObj.isDarkTheme?'dark':'w-full']">
    <ToastsView />
    <div class="loader-box fixed inset-0 bg-gray-800 opacity-50 top-0 z-[100]" v-show="loaderStoreObj.showLoader">
      <div v-show="loaderStoreObj.showLoader" class="fixed inset-0 bg-gray-800 opacity-50"></div>
      <MusicLoaderVue />
    </div>
    <div class="music-player-container absolute bottom-5 right-2">
      <web-playback />
    </div>
    <nav class="body-nav-container">
      <Navbar />
    </nav>

    <main class="body-main-container w-full dark:bg-[#18171f]">
        <!-- <SearchView /> -->
        <RouterView />
    </main>

    <footer class="body-footer-container relative dark:bg-[#18171f]">
      This is footer
    </footer>

  </div>
</template>

<style scoped>
  .body-container{
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 0px 0px;
      grid-template-areas:
        "nav"
        "main"
        "footer";
      width:100vw;
      min-height: 100vh;
      overflow-x: hidden;
  }

  .body-nav-container{
    grid-area: nav;
  }

  .body-main-container{
    grid-area: main;
  }
  .body-footer-container{
    grid-area: footer;
  }
  
</style>
./helpers/ToggleTheme/ToggleTheme