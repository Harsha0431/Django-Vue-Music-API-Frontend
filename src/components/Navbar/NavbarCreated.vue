<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { userStore } from '@/store/User';

import { addToLikedListService, removeFromLikedListService } from '@/service/playlist/addRemoveLikedItem';

import {RouterLink, useRouter} from 'vue-router';
import { themeStore } from '@/store/ThemeStore';
import { useSpotifyStore } from '@/store/SpotifyStore';
import { ToastStore } from '@/store/ToastStore';
import VueCookies from 'vue-cookies';
import { ref, watchEffect } from 'vue';
const themeStoreObj = themeStore();
const userStoreObj = userStore();
const spotifyStore = useSpotifyStore();
const toastStoreObj = ToastStore();
const isLikeInProgress = ref(false)

const router = useRouter();

const toggleTheme = () =>{
    themeStoreObj.toggleTheme();
}

const navigation = [
    { name: 'Home', link: '/', current: true },
    { name: 'library', link: '/library', current: false },
    { name: 'Artist', link: '/artist', current: false },
    { name: 'About', link: '/about', current: false },
]

const handleLogout = () =>{
    userStoreObj.resetUser()
    VueCookies.remove('user-token')
    router.push('/login')
}

const handleTrackChange = (mode) =>{
    if(!spotifyStore.isPlaying && mode!='prev'){
        toastStoreObj.message = "Please play music to change track"
        toastStoreObj.type = "alert"
        toastStoreObj.showToast = true
        return
    }
    if(mode == 'next'){
        if(spotifyStore.track_list.length < 2)
        {
            toastStoreObj.message = "No tracks in queue to play. Skipped to recommendation list"
            toastStoreObj.type = "alert"
            toastStoreObj.showToast = true

            spotifyStore.setCurrentPlayingList('recommended')
            return
        }
        spotifyStore.nextTrack()
        // const recent = spotifyStore.track_list.shift();
        // spotifyStore.previous_list.unshift(recent)
        // spotifyStore.isInterrupted = true
    }
    if(mode == 'prev'){
        if(spotifyStore.previous_list.length < 1){
            toastStoreObj.message = "No previous track"
            toastStoreObj.type = "alert"
            toastStoreObj.showToast = true
            return
        }
        const recent = spotifyStore.previous_list.shift();
        spotifyStore.track_list.unshift(recent)
        spotifyStore.current_track = 0
        spotifyStore.isInterrupted = true
    }
}

const handleLikeTrackClick = async() =>{
    if( spotifyStore.liked_list.includes(spotifyStore.track_list[spotifyStore.current_track]))
    {
        const index = spotifyStore.liked_list.indexOf(spotifyStore.track_list[spotifyStore.current_track])
        if(index > -1){
            isLikeInProgress.value = true
            await removeFromLikedListService({"track_id":spotifyStore.track_list[spotifyStore.current_track]} , userStoreObj.userToken)
                .then((res)=>{
                    if(res.code == 1)
                    {
                        toastStoreObj.message = res.message
                        toastStoreObj.type = 'success'
                        spotifyStore.interested_list_from_model.splice(index,1)
                        spotifyStore.liked_list.splice(index,1)
                    }
                    else{
                        toastStoreObj.message = res.message
                        toastStoreObj.type = 'alert'
                    }
                    toastStoreObj.showToast = true
                })
                .finally(()=>{
                    isLikeInProgress.value = false
                })
        }
    }
    else{
        isLikeInProgress.value = true
        await addToLikedListService({"track_id":spotifyStore.track_list[spotifyStore.current_track]} , userStoreObj.userToken)
            .then((res)=>{
                    if(res.code == 1)
                    {
                        toastStoreObj.message = res.message
                        toastStoreObj.type = 'success'
                        spotifyStore.addToLikedList(spotifyStore.track_list[spotifyStore.current_track])
                    }
                    else{
                        toastStoreObj.message = res.message
                        toastStoreObj.type = 'alert'
                    }
                    toastStoreObj.showToast = true
                })
                .finally(()=>{
                    isLikeInProgress.value = false
                })
    }
}

function handleAddToPlaylistClick(){
    alert("Not yet developed")
}

watchEffect(()=>{
    if(toastStoreObj.showAcknowledgement){
        setTimeout(()=>{toastStoreObj.showAcknowledgement = false} , 5000)
    }
})


</script>

<template>
    <div class="w-full sticky z-50 dark:bg-[#18171f]">
        <div v-if="toastStoreObj.showAcknowledgement" :class="[toastStoreObj.showAcknowledgement?'translate-y-0':'-translate-y-24 hidden']" class="transition-all duration-1000 px-2 py-2 bg-[#ff3956] text-center rounded-ee-full rounded-es-full">
            <span class="text-[#fff] tracking-wider max-ssm:text-[14px] max-vsm:text-[13px]">{{ toastStoreObj.acknowledgementMessage }}</span>
        </div>
        <!-- Try nav color with #211e2b -->
        <Disclosure as="nav" class="navbar dark:bg-[#17161f] bg-white border-b-2 dark:border-b-0 shadow-sm dark:shadow-none " v-slot="{ open }">
            <div class="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="nav-logo max-sm:hidden">
                        <span class="dark:text-gray-300 text-gray-800 font-semibold">MusiBuzz</span>
                    </div>
                    <div class="relative inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-700 dark:focus:ring-white">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div class="flex items-center justify-center">
                        <div class="flex justify-center gap-4 sm:gap-8 md:gap-12 ">
                            <div class="hidden sm:flex gap-2 md:gap-4">
                                <RouterLink to="/" active-class="active-nav-icon" class="nav-icon text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</RouterLink>
                                <RouterLink to="/library" active-class="active-nav-icon" class="nav-icon text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Library</RouterLink>
                            </div>
                            <button class="nav-icon-search stroke-red-500 focus:animate-bounce focus:ring-0 ring-1 ring-inset ring-red-500 p-1.5 rounded-full flex justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                <svg viewBox="0 0 24 24" class="w-6 flex" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                            <div class="hidden sm:flex gap-2 md:gap-6">
                                <RouterLink to="/artist" active-class="active-nav-icon" class="nav-icon text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Artist</RouterLink>
                                <RouterLink to="/about" active-class="active-nav-icon" class="nav-icon text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">About</RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="relative inset-y-0 right-0 flex items-center gap-2">
                        <button @click="toggleTheme" class="ml-auto relative p-1">
                            <svg v-if="!themeStoreObj.isDarkTheme" class="w-6 fill-gray-500 hover:fill-gray-700 dark:fill-gray-400 dark:hover:fill-gray-300" viewBox="0 0 35 35" data-name="Layer 2" id="Layer_2" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
                                    </g>
                            </svg>
                            <svg v-else class="w-6 fill-gray-300 hover:fill-gray-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g clip-path="url(#a)">
                                        <path d="M12 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1ZM4.929 3.515a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 0 0 1.414-1.414L4.93 3.515ZM1 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H1ZM18 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM17.657 16.243a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 1 0 1.414-1.414l-2.828-2.828ZM7.757 17.657a1 1 0 1 0-1.414-1.414L3.515 19.07a1 1 0 1 0 1.414 1.414l2.828-2.828ZM20.485 4.929a1 1 0 0 0-1.414-1.414l-2.828 2.828a1 1 0 1 0 1.414 1.414l2.828-2.828ZM13 19a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#ffffff" d="M0 0h24v24H0z"></path>
                                        </clipPath>
                                    </defs>
                                </g>
                            </svg>
                        </button>
                        <Menu as="div" v-if="userStoreObj.isLoggedIn" class="relative inline-block text-left">
                            <MenuButton>
                                <button class="flex justify-center align-middle rounded-full avatar dark:bg-[#2d2d2d]">
                                    <span class="font-semibold px-[10px] text-lg py-[3px] text-white">{{userStoreObj.isLoggedIn?userStoreObj.username[0].toUpperCase():'G'}}</span>
                                </button>
                            </MenuButton>
                        
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="absolute py-2 right-0 z-10 mt-2 w-max origin-top-right rounded-md dark:bg-gray-600 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="py-1 px-3">
                                        <MenuItem v-slot="{ active }">
                                            <button :class="[active ? 'dark:bg-gray-700 dark:text-gray-100 bg-gray-200' : 'text-gray-700 dark:text-gray-200', 'block w-full px-4 py-2 text-left text-sm rounded-lg']">Account settings</button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <button @click="toggleTheme" :class="[active ? 'dark:bg-gray-700 dark:text-gray-100 bg-gray-200' : 'text-gray-700 dark:text-gray-200', 'block text-left w-full px-4 py-2 text-sm rounded-lg']">Switch Theme</button>
                                        </MenuItem>
                                        <form @submit.prevent="handleLogout">
                                            <MenuItem v-slot="{ active }">
                                                <button type="submit" :class="[active ? 'dark:bg-gray-700 dark:text-gray-100 bg-gray-200' : 'text-gray-700 dark:text-gray-200', 'block w-full px-4 py-2 text-left text-sm rounded-lg']">Sign out</button>
                                            </MenuItem>
                                        </form>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                        <button v-else>
                            <RouterLink to="/login" class="font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Login</RouterLink>
                        </button>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="sm:hidden flex justify-center">
                <div class="space-y-1 px-2 pb-3 pt-2 text-center w-min flex flex-col justify-center">
                    <RouterLink v-for="item in navigation" :key="item.name" as="a" :to="item.link" active-class="mobile-active-nav-icon" :class="['text-gray-500 hover:text-gray-700 dark:text-gray-400', 'block text-center rounded-md px-4 py-2 text-base font-medium']">{{ item.name }}</RouterLink>
                </div>
            </DisclosurePanel>
        </Disclosure>
        <div v-if="userStoreObj.isLoggedIn" class="w-full relative vsm:ml-3 pb-2 mt-2 flex justify-center">
            <div class="flex dark:bg-[#2d2d2d] bg-[#efefefc4] relative ssm:ml-6 py-2 px-10 gap-8 rounded-2xl">
                <div class="flex gap-4 justify-evenly">
                    <button @click="()=>handleTrackChange('prev')" class="prev-btn stroke-[#ef4b56] transition-colors hover:stroke-[#ef4b56f4] opacity-75 hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                        </svg>
                    </button>
                    <button disabled class="stroke-[#ef4b56] cursor-not-allowed">
                        <svg v-if="spotifyStore.is_active && spotifyStore.isPlaying" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                    </button>
                    <button @click="()=>handleTrackChange('next')" class="skip-btn stroke-[#ef4b56] transition-colors hover:stroke-[#ef4b56f4] opacity-75 hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        </svg>
                    </button>
                </div>

                <button class="relative active:animate-ping" :class="[isLikeInProgress?'animate-ping':'']" @click="handleLikeTrackClick">
                    <svg v-if="spotifyStore.liked_list.includes(spotifyStore.track_list[spotifyStore.current_track])" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 like-icon-filled fill-red-600 ">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 lik-icon-outline stroke-[#ef4b56f4] hover:animate-pulse hover:stroke-[#ef4b56]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                <!-- Add to playlist -->
                <button @click="handleAddToPlaylistClick">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="stroke-[#ef4b56] transition-colors hover:stroke-[#ef4b56f4] w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

            </div>
        </div>
    </div>
</template>

<style scoped>
    .nav-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 10px;
        font-weight: 600;
        letter-spacing: 0.3px;
    }

    .active-nav-icon{
        background: #ff3956;
        border-radius: 8px;
        color: #fff !important;
        font-weight: 700;
    }
    .mobile-active-nav-icon{
        background: #ff3956;
        border-radius: 8px;
        color: white !important;
    }

    .active-nav-icon:hover{
        background: #ff1337;
        transition: background 0.3s linear;
    }
    .avatar{
        background: #ff2c4cdf;
    }
</style>