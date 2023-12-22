import { defineStore } from "pinia"
import {ref} from 'vue'

export const loaderStore = defineStore('loader',()=>{
    const showLoader = ref(false)

    function toggleLoader(){
        showLoader.value = ! showLoader.value
    }

    return{
        showLoader ,
        toggleLoader
    }
})