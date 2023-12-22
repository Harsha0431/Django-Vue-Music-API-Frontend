<script setup>
import { onMounted , ref, watchEffect } from "vue";
import {LoginService} from '@/service/login/loginService'
import { loaderStore } from "@/store/LoaderStore";
import VueCookies from 'vue-cookies';
import { userStore } from "@/store/User";
import router from "@/router";


const loadStoreObj = loaderStore()
const userStoreObj = userStore()

const loginWithUsername = ref(false)

const username = ref('');
const password = ref('');
const email = ref('');

const handleLoginSubmit = async() =>{
    //TODO: Complete Login for wrong credentials and username login
    loadStoreObj.toggleLoader();
    const login_data = loginWithUsername.value ? {username:username.value,password:password.value} : {email:email.value,password:password.value}
    await LoginService(login_data)
        .then((res)=>{
            if(res.code == 1){
                VueCookies.set('user-token' , res.token , '7d')
                userStoreObj.setUser({username: res.user.username , userMail: res.user.email , token: res.token , isLoggedIn:true , userRole:res.user.role})
            }
            else{
                alert(res.message)
            }
        })
        .finally(()=>loadStoreObj.toggleLoader())

}

watchEffect(()=>{
    if(userStoreObj.isLoggedIn)
        router.back()
})

onMounted(()=>{
    document.title = 'Login -musiBuzz'
})

</script>

<template>
    <div class="flex justify-center h-full login-box-light" >
        <div class="flex flex-col justify-center ssm:w-[400px] max-ssm:w-[360px] max-vsm:w-[95vw] max-vsm:px-4">
            <div class="login-container flex flex-col w-full shadow-lg bg-[#fff]">
                <div class="sign-in-container w-full flex flex-col px-2 pb-4 pt-8">
                    <span class="text-2xl text-center pb-4">Login</span>
                    <div class="login-form flex flex-col justify-center align-middle px-6 max-vsm:px-2">
                        <form @submit.prevent="handleLoginSubmit" class="flex flex-col gap-6">
                            <div class="input-fields flex text-gray-600 justify-center flex-col gap-4">
                                <input v-if="loginWithUsername" required type="text" v-model="username" placeholder="Username" class="px-4 py-[10px] border-[1px] text-sm rounded-md focus:inset-0 focus:outline-none  focus:border-gray-400"/>
                                <input v-else required type="email" pattern="^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$" class="px-4 py-[10px] border-[1px] text-sm rounded-md focus:inset-0 focus:outline-none  focus:border-gray-400" v-model="email" placeholder="Registered email"/>
                                <input required type="password" class="px-4  py-[10px] text-sm border-[1px] rounded-md focus:inset-0 focus:outline-none focus:border-gray-400" v-model="password" placeholder="Password"/>
                            </div>
                            <button type="submit" class="w-full bg-gray-900 py-2 text-center rounded-lg font-semibold tracking-wide hover:bg-gray-800 text-white">Login</button>
                        </form>
                        <span class="flex justify-between">
                            <span class="pt-2 px-2 text-blue-800 hover:underline cursor-pointer" @click="loginWithUsername = !loginWithUsername">Login with {{loginWithUsername?'email':'username'}}</span>
                            <span class="pt-2 px-2 text-blue-800 hover:underline cursor-pointer">Forgot Password?</span>
                        </span>
                    </div>
                    <div class="login-footer flex justify-center gap-1 pt-2 flex-wrap px-2 mt-4 border-t-2 ">
                        <span class="text-center text-gray-600 tracking-wide">Don't have an account?</span>
                        <span class="hover:underline cursor-pointer text-center text-blue-800">Sign up now</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .login-box-dark{
        background-color: #314151;
    }

    .login-box-light{
        background-color: #fff;
    }
</style>