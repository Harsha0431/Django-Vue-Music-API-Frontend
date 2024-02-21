<script setup>
import router from '@/router'
import { LoginService } from '@/service/login/loginService'
import { loaderStore } from '@/store/LoaderStore'
import { ToastStore } from '@/store/ToastStore'
import { userStore } from '@/store/User'
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import VueCookies from 'vue-cookies'
import { SignupService } from '../service/login/loginService'

const loadStoreObj = loaderStore()
const userStoreObj = userStore()
const toastStore = ToastStore()

const loginWithUsername = ref(false)
const signUpClicked = ref(false)

const username = ref('')
const password = ref('')
const email = ref('')

const registerEmail = ref('')
const registerUsername = ref('')
const registerPassword = ref('')
const registerPasswordConfirm = ref('')

const handleLoginSubmit = async () => {
    if (userStoreObj.isLoggedIn) router.push('/')
    loadStoreObj.toggleLoader()
    const login_data = loginWithUsername.value
        ? { username: username.value, password: password.value }
        : { email: email.value, password: password.value }
    await LoginService(login_data)
        .then((res) => {
            if (res.code == 1) {
                VueCookies.set('user-token', res.token, '7d')
                userStoreObj.setUser({
                    username: res.user.username,
                    userMail: res.user.email,
                    userToken: res.token,
                    isLoggedIn: true,
                    userRole: res.user.role
                })
                toastStore.message = 'Logged in successfully'
                toastStore.type = 'success'
                toastStore.showToast = true
                router.push('/')
            } else {
                toastStore.message = res.message
                toastStore.type = res.code == 0 ? 'alert' : 'error'
                toastStore.showToast = true
            }
        })
        .finally(() => loadStoreObj.toggleLoader())
}

const handleSignupSubmit = async () => {
    //TODO:Completed this module
    if (registerPassword.value != registerPasswordConfirm.value) {
        toastStore.message = 'Passwords do not match'
        toastStore.type = 'alert'
        toastStore.showToast = true
        return
    }
    loadStoreObj.toggleLoader()
    await SignupService({
        username: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value
    })
        .then((res) => {
            if (res.code == 1) {
                toastStore.message = 'Registered successfully'
                toastStore.type = 'success'
                toastStore.showToast = true
                signUpClicked.value = false
            } else {
                toastStore.message = res.message
                toastStore.type = res.code == 0 ? 'alert' : 'error'
                toastStore.showToast = true
            }
        })
        .catch(() => {
            toastStore.type = 'error'
            toastStore.message = 'Network error or Try again'
            toastStore.showToast = true
        })
        .finally(() => loadStoreObj.toggleLoader())
}

watchEffect(() => {
    if (userStoreObj.isLoggedIn) router.push('/')
})

onBeforeMount(() => {
    if (userStoreObj.isLoggedIn) router.push('/')
})

onMounted(() => {
    document.title = 'Login -musiBuzz'
})
</script>

<template>
    <div class="flex justify-center h-full login-box-light">
        <div
            class="flex flex-col justify-center ssm:w-[400px] max-ssm:w-[360px] max-vsm:w-[95vw] max-vsm:px-4"
        >
            <div
                v-if="!signUpClicked"
                class="login-container flex flex-col w-full shadow-lg dark:bg-[#18171f] bg-[#fff]"
            >
                <div class="sign-in-container w-full flex flex-col px-2 pb-4 pt-8">
                    <span class="text-2xl text-center dark:text-gray-400 pb-4">Login</span>
                    <div
                        class="login-form flex flex-col justify-center align-middle px-6 max-vsm:px-2"
                    >
                        <form @submit.prevent="handleLoginSubmit" class="flex flex-col gap-6">
                            <div
                                class="input-fields flex text-gray-600 dark:text-gray-100 justify-center flex-col gap-4"
                            >
                                <input
                                    v-if="loginWithUsername"
                                    required
                                    type="text"
                                    v-model="username"
                                    placeholder="Username"
                                    class="px-4 py-[10px] border-[1px] text-sm rounded-md focus:inset-0 focus:outline-none dark:bg-gray-800 dark:border-gray-600 focus:border-gray-400"
                                />
                                <input
                                    v-else
                                    required
                                    type="email"
                                    pattern="^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$"
                                    class="px-4 py-[10px] border-[1px] text-sm rounded-md focus:inset-0 focus:outline-none dark:bg-gray-800 dark:border-gray-600 focus:border-gray-400"
                                    v-model="email"
                                    placeholder="Registered email"
                                />
                                <input
                                    required
                                    type="password"
                                    class="px-4 py-[10px] text-sm border-[1px] rounded-md focus:inset-0 focus:outline-none dark:bg-gray-800 dark:border-gray-600 focus:border-gray-400"
                                    v-model="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                class="w-full bg-[#ff3956] hover:bg-[#ff1337] py-2 text-center rounded-lg font-semibold tracking-wide text-white"
                            >
                                Login
                            </button>
                        </form>
                        <span class="flex justify-between">
                            <span
                                class="pt-2 px-2 text-gray-700 dark:text-gray-400 hover:underline cursor-pointer"
                                @click="loginWithUsername = !loginWithUsername"
                                >Login with {{ loginWithUsername ? 'email' : 'username' }}</span
                            >
                            <span
                                class="pt-2 px-2 text-gray-700 dark:text-gray-400 hover:underline cursor-pointer"
                                >Forgot Password?</span
                            >
                        </span>
                    </div>
                    <div
                        class="login-footer flex justify-center gap-1 pt-2 flex-wrap px-2 mt-4 border-t-2 dark:border-gray-600"
                    >
                        <span class="text-center dark:text-gray-400 text-gray-600 tracking-wide"
                            >Don't have an account?</span
                        >
                        <button
                            @click="signUpClicked = true"
                            class="hover:underline m-0 text-center dark:text-[#5353c5] text-blue-800"
                        >
                            Sign up now
                        </button>
                    </div>
                </div>
            </div>
            <div
                v-else
                class="sign-up-container flex flex-col w-full shadow-lg bg-[#fff] dark:bg-[#18171f] pb-4"
            >
                <span class="text-2xl text-center dark:text-gray-400 pb-4">Sign up</span>
                <form
                    @submit.prevent="handleSignupSubmit"
                    class="flex flex-col justify-center align-middle gap-6 px-6 max-vsm:px-2"
                >
                    <div
                        class="flex flex-col gap-4 justify-center dark:text-gray-100 text-gray-600"
                    >
                        <input
                            required
                            type="email"
                            pattern="^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$"
                            class="px-4 py-[10px] border-[1px] text-sm rounded-md focus:inset-0 focus:outline-none dark:bg-gray-800 dark:border-gray-600 focus:border-gray-400"
                            v-model="registerEmail"
                            placeholder="Email"
                        />
                        <input
                            required
                            minlength="5"
                            type="text"
                            class="px-4 py-[10px] border-[1px] text-sm rounded-md focus:inset-0 focus:outline-none dark:bg-gray-800 dark:border-gray-600 focus:border-gray-400"
                            v-model="registerUsername"
                            placeholder="Username"
                        />
                        <input
                            required
                            minlength="8"
                            type="password"
                            pattern="^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$"
                            class="px-4 py-[10px] border-[1px] text-sm dark:bg-gray-800 dark:border-gray-600 rounded-md focus:inset-0 focus:outline-none focus:border-gray-400"
                            v-model="registerPassword"
                            placeholder="Password"
                        />
                        <input
                            required
                            type="password"
                            class="px-4 py-[10px] border-[1px] text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 focus:inset-0 focus:outline-none focus:border-gray-400"
                            v-model="registerPasswordConfirm"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-[#ff3956] hover:bg-[#ff1337] py-2 text-center rounded-lg font-semibold tracking-wide text-white"
                    >
                        Register
                    </button>
                </form>
                <div
                    class="sign-up-footer flex justify-center gap-1 pt-2 flex-wrap px-2 mt-4 border-t-2 dark:border-gray-600"
                >
                    <span class="text-center dark:text-gray-400 text-gray-600 tracking-wide"
                        >Have an account?</span
                    >
                    <button
                        @click="signUpClicked = false"
                        class="hover:underline m-0 text-center dark:text-[#5353c5] text-blue-800"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
