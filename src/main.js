import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.mount('#app')

// Module that adds user interested tracks to database
import { addInterestedListToDbService } from './service/recommendations/interestedListService'
import { useSpotifyStore } from './store/SpotifyStore'
import { userStore } from '@/store/User'

const userStoreObj = userStore()
const SpotifyStore = useSpotifyStore()

async function addInterestedListToDb() {
    const token = userStoreObj.userToken
    await addInterestedListToDbService(token,{"track_list":SpotifyStore.interested_list, message:"On Close" })

}

// This triggers when user switch b\w tab
// document.addEventListener('visibilitychange', async function () {
//     if (document.visibilityState === 'hidden') {
//         console.log('Interested Tracks: \n')
//         console.log(SpotifyStore.interested_list)
//         await addInterestedListToDb()
//     }
// })

//This triggers when user closes tab
window.addEventListener('beforeunload', async function (event) {
    console.log('Interested Tracks: \n')
    console.log(SpotifyStore.interested_list)

    // Perform asynchronous operation
    await addInterestedListToDb()
    
    event.returnValue = 'Are you sure you want to leave?'
})