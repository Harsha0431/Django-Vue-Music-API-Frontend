import { defineStore } from "pinia";
import {ref} from 'vue'
import { useSpotifyStore } from "./SpotifyStore";
import { getLikedTracksListService , getInterestedTracksListService } from "@/service/playlist/likedListService";


//Option API method
export const userStoreOption = defineStore("User", {
    id:'User',
    state: () => ({
        username: '',
        userId: ''
    }) ,
    actions:{
        setUsername(value){
            this.username=value;
        }
    }
})

//Composition API
export const userStore = defineStore('User',()=>{
    const username = ref('')
    const userMail = ref('')
    const userToken = ref('')
    const userRole = ref('user')
    const isLoggedIn = ref(false)
    function setUser(data){
        useSpotifyStore().is_active = true
        username.value = data.username
        userMail.value = data.userMail || ''
        userToken.value = data.userToken || ''
        isLoggedIn.value = data.isLoggedIn || false
        userRole.value = data.userRole || 'user'
        getUserLikedList()
        getInterestedList()
    }

    async function getUserLikedList() {
        if (isLoggedIn.value) {
            const spotifyStore = useSpotifyStore()
            await getLikedTracksListService(userToken.value)
                .then((res) => {
                    if (res.code == 1)
                        spotifyStore.liked_list = res.data
                })
        }
    }

    async function getInterestedList() {
        if (isLoggedIn.value) {
            const spotifyStore = useSpotifyStore()
            await getInterestedTracksListService(userToken.value).then((res) => {
                if (res.code == 1) {
                    let track_set = new Set(spotifyStore.track_list)
                    if (res.data.length > 4) {
                        track_set = new Set()
                    }
                    res.data.forEach((track) => {
                        if (!spotifyStore.previous_list.includes(track))
                            track_set.add(track)
                    })
                    spotifyStore.track_list = [...track_set]
                    spotifyStore.interested_list_from_model = res.data
                }
            })
        }
    }

    function resetUser(){
        username.value = ''
        userMail.value = ''
        userToken.value = ''
        isLoggedIn.value = false
        userRole.value = 'user'
    }

    return {
        username,
        userMail,
        userToken,
        isLoggedIn,
        userRole,
        setUser,
        resetUser
    }
})