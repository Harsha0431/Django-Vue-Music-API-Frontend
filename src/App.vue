<script setup>
import MusicLoaderVue from '@/components/loaders/MusicLoader.vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar/NavbarCreated.vue'
import router from './router'
import SearchTab from '@/components/Tabs/SearchTab.vue'

import { loaderStore } from '@/store/LoaderStore'
import { onBeforeMount, ref, watchEffect } from 'vue'
import VueCookies from 'vue-cookies'
import ToastsView from './components/Toasts/ToastsView.vue'
import { VerifyToken } from './service/login/loginService'
import { themeStore } from './store/ThemeStore'
import { userStore } from './store/User'

import { useSpotifyStore } from '@/store/SpotifyStore'
import WebPlayback from './components/MusicPlayer/WebPlayback.vue'
import { useSearchStore } from '@/store/SearchStore'

const searchStore = useSearchStore()

const spotifyStore = useSpotifyStore()
const themeStoreObj = themeStore()
const loaderStoreObj = loaderStore()
const userStoreObj = userStore()

const default_token_login = ref(true)

const verify_user_token = async () => {
    loaderStoreObj.toggleLoader()
    await VerifyToken(VueCookies.get('user-token'))
        .then((res) => {
            if (res.code == 1) {
                spotifyStore.is_active = true
                userStoreObj.setUser({
                    username: res.user.username,
                    userMail: res.user.email,
                    userToken: VueCookies.get('user-token'),
                    isLoggedIn: true,
                    userRole: res.user.role
                })
            } else {
                router.push('/login')
            }
        })
        .catch((err) => {
            console.log(err.message)
            router.push('/login')
        })
        .finally(() => {
            loaderStoreObj.toggleLoader()
            default_token_login.value = false
        })
}

watchEffect(() => {
    if (!userStoreObj.isLoggedIn && !default_token_login.value) router.push('/login')
})

onBeforeMount(() => {
    if (default_token_login.value)
        if (VueCookies.get('user-token')) verify_user_token()
        else router.push('/login')
})

// const containerId = document.getElementById('body-container-listener');

document.body.addEventListener('keydown', async (e) => {
    if (e.key == 'Escape') {
        if (searchStore.showSearchTab) {
            const routePushValidate = await router.push('/')
            if (!routePushValidate) searchStore.showSearchTab = false
            else {
                router.push('/')
                searchStore.showSearchTab = false
            }
        }
    }
})
</script>

//TODO:Add this snippet in body-container class
{{ themeStoreObj.isDarkTheme && 'bg-[#1a1b1f]' }} for dark theme
<template>
    <div
        disabled
        class="body-container"
        id="body-container-listener"
        :class="[
            'body-container overflow-hidden h-[100vh] w-[100vw]',
            themeStoreObj.isDarkTheme ? 'dark' : 'w-full'
        ]"
    >
        <ToastsView />
        <SearchTab />

        <div
            class="loader-box fixed inset-0 bg-gray-800 opacity-50 top-0 z-[100]"
            v-show="loaderStoreObj.showLoader"
        >
            <div
                v-show="loaderStoreObj.showLoader"
                class="fixed inset-0 bg-gray-800 opacity-50"
            ></div>
            <MusicLoaderVue />
        </div>
        <nav class="body-nav-container">
            <Navbar />
        </nav>

        <main class="body-main-container w-full h-full overflow-hidden dark:bg-[#18171f]">
            <RouterView />
        </main>

        <footer class="body-footer-container sticky bottom-0 dark:bg-[#18171f] z-[150]">
            <web-playback />
        </footer>
    </div>
</template>

<style scoped>
.body-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 0px 0px;
    grid-template-areas:
        'nav'
        'main'
        'footer';
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
}

.body-nav-container {
    grid-area: nav;
}

.body-main-container {
    grid-area: main;
}
.body-footer-container {
    grid-area: footer;
}
</style>
./helpers/ToggleTheme/ToggleTheme
