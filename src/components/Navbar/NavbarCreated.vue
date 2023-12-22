<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { userStore } from '@/store/User';

import {RouterLink} from 'vue-router';
import { themeStore } from '@/store/ThemeStore';
import VueCookies from 'vue-cookies';
const themeStoreObj = themeStore();
const userStoreObj = userStore();
const toggleTheme = () =>{
    themeStoreObj.toggleTheme();
}

const navigation = [
    { name: 'Home', link: '/', current: true },
    { name: 'Music', link: '/music', current: false },
    { name: 'Artist', link: '/artist', current: false },
    { name: 'About', link: '/about', current: false },
]

const handleLogout = () =>{
    userStoreObj.resetUser()
    VueCookies.remove('user-token')
}
</script>

<template>
    <Disclosure as="nav" class="w-full sticky z-50 navbar bg-white border-b-2 shadow-sm dark:bg-gray-700" v-slot="{ open }">
        <div class="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="nav-logo max-sm:hidden">
                    LOGO
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
                            <RouterLink to="/music" active-class="active-nav-icon" class="nav-icon text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Music</RouterLink>
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
                        <svg v-if="themeStoreObj.isDarkTheme" class="w-6 fill-gray-500 hover:fill-gray-700 dark:fill-gray-400 dark:hover:fill-gray-300" viewBox="0 0 35 35" data-name="Layer 2" id="Layer_2" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
                                </g>
                        </svg>
                        <svg v-else class="w-6 fill-gray-500 hover:fill-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <button class="flex justify-center align-middle rounded-full avatar">
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
        color: white !important;
    }
    .mobile-active-nav-icon{
        background: #ff3956;
        border-radius: 8px;
        color: white !important;
    }

    .active-nav-icon:hover{
        background: #ff1337;
    }
    .avatar{
        background: #ff2c4cdf;
    }
</style>