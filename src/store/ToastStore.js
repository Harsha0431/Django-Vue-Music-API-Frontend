import { defineStore } from "pinia";
import {ref} from 'vue'

export const ToastStore = defineStore('Toast Store' ,()=>{
    const showToast = ref(false)
    const message = ref('')
    const type = ref('') //['alert', 'success' , 'error']
    const showAcknowledgement = ref(true)
    const acknowledgementMessage = ref('Please make sure have logged in to Spotify app from your browser')
    return{
        showToast,
        message,
        type,
        showAcknowledgement,
        acknowledgementMessage
    }
})