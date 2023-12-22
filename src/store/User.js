import { defineStore } from "pinia";
import {ref} from 'vue'


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
        username.value = data.username
        userMail.value = data.userMail || ''
        userToken.value = data.userToken || ''
        isLoggedIn.value = data.isLoggedIn || false
        userRole.value = data.userRole || 'user'
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