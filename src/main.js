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

const SpotifyStore = useSpotifyStore()

async function addInterestedListToDb() {
    await addInterestedListToDbService({"track_list":SpotifyStore.interested_list, message:"On Close" })

}

// This triggers when user switch b\w tab
document.addEventListener('visibilitychange', async function () {
    if (document.visibilityState === 'hidden') {
        if(SpotifyStore.interested_list.length>0)
            await addInterestedListToDb()
                .then((res) => {
                    if (res.code == 1) {
                        SpotifyStore.interested_list = []
                    }
                    console.log("Interested list added to database on browser visibility change")
                })
    }
})

//This triggers when user closes tab
// window.addEventListener('beforeunload', async function (event) {
//     // Perform asynchronous operation
//     await addInterestedListToDb()
//     event.returnValue = 'Are you sure you want to leave?'
// })