import { defineStore } from "pinia"
import {ref} from 'vue'

export const themeStore = defineStore('theme',()=>{
    const isDarkTheme = ref( localStorage.getItem('isDarkTheme') == 'true' ||false)

    function toggleTheme(){
        isDarkTheme.value = !isDarkTheme.value
        localStorage.setItem('isDarkTheme' , isDarkTheme.value)
    }

    return{
        isDarkTheme ,
        toggleTheme
    }
})