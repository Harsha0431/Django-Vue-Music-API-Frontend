<script setup>
import { useSearchStore } from '@/store/SearchStore'
import { useRouter } from 'vue-router'
import { ToastStore } from '@/store/ToastStore'
import { getSearchQuery } from '@/service/search/SearchService'
import { loaderStore } from '@/store/LoaderStore'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const router = useRouter()
const searchStore = useSearchStore()
const toastStore = ToastStore()
const loadingStore = loaderStore()

const outClickRef = ref(null)

const handleSearchBtnClick = async () => {
    if (searchStore.searchText.length < 1) {
        toastStore.showToast = true
        toastStore.message = 'Please enter some text'
        toastStore.type = 'alert'
        return
    }

    router.replace({
        name: 'search',
        query: {
            q: searchStore.searchText,
            type: searchStore.category,
            offset: searchStore.offset,
            limit: searchStore.limit
        }
    })
    try {
        loadingStore.showLoader = true
        searchStore.offset = 0
        searchStore.limit = 20
        await getSearchQuery(
            searchStore.searchText,
            searchStore.category,
            searchStore.offset,
            searchStore.limit
        )
            .then((res) => {
                if (res.code == 1) {
                    if (res.data.length < 1) {
                        toastStore.message = 'No matching data found'
                        toastStore.type = 'alert'
                        toastStore.showToast = true
                        return
                    }
                    searchStore.searchResult = res.data
                    searchStore.activeSearchText = searchStore.searchText
                    searchStore.activeCategory = searchStore.category
                    searchStore.noMoreTracks = false
                    searchStore.showSearchTab = false
                    searchStore.searchDataFetched = true
                } else {
                    toastStore.showToast = true
                    toastStore.message = res.message
                    if (res.code == 0) {
                        toastStore.type = 'alert'
                    } else {
                        toastStore.type = 'error'
                    }
                }
            })
            .finally(() => {
                loadingStore.showLoader = false
            })
    } catch (err) {
        console.log('Error in Search tab: ' + err.message)
    }
}

onClickOutside(outClickRef, () => {
    if (searchStore.showSearchTab) {
        searchStore.showSearchTab = false
        if (searchStore.searchResult.length == 0) router.push('/')
    }
})
</script>

<template>
    <div
        class="absolute flex flex-col h-[100vh] w-[100vw] z-[140] backdrop-blur-sm overflow-hidden"
        v-show="searchStore.showSearchTab"
    >
        <Transition name="scale">
            <div
                ref="outClickRef"
                v-show="searchStore.showSearchTab"
                class="flex justify-center place-items-center dark:text-white text-black w-full top-[10vh] relative"
            >
                <div class="bg-transparent p-4 rounded-lg max-w-[700px] w-full">
                    <div class="relative mt-2 dark:text-gray-300 flex flex-col gap-y-2">
                        <div class="my-auto h-6 flex-col">
                            <select
                                v-model="searchStore.category"
                                class="max-sm:text-sm text-base dark:text-gray-200 text-gray-900 font-semibold tracking-wider outline-none rounded-lg h-full bg-transparent w-max px-2"
                            >
                                <option
                                    disabled
                                    class="text-gray-600 bg-transparent font-semibold tracking-wide"
                                >
                                    Search for
                                </option>
                                <option
                                    v-for="(type, index) in searchStore.category_list"
                                    :key="`${type.name}-${index}`"
                                    :value="type.value"
                                    class="text-gray-800 font-semibold tracking-wide bg-transparent relative"
                                >
                                    <div>
                                        {{ type.name }}
                                    </div>
                                </option>
                            </select>
                        </div>
                        <form @submit.prevent="handleSearchBtnClick">
                            <button
                                class="absolute bottom-3 max-sm:bottom-2.5 right-[0.5rem] sm:right-[1.5rem]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    class="w-6 h-6 dark:stroke-slate-300 stroke-slate-700 hover:stroke-slate-900 hover:dark:stroke-slate-200 active:scale-95"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </button>
                            <input
                                autofocus
                                type="search"
                                v-model="searchStore.searchText"
                                :placeholder="`Search for ${searchStore.category}`"
                                class="w-full h-12 max-sm:h-11 text-lg max-sm:text-base px-6 pr-14 max-sm:pr-10 py-2 appearance-none bg-transparent outline-none border placeholder:opacity-75 border-slate-600 dark:border-gray-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-500 dark:focus:ring-slate-300 shadow-sm rounded-2xl dark:placeholder:text-slate-300 placeholder:text-gray-700"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
input[type='search']::-webkit-search-cancel-button {
    display: none;
}

.scale-enter-active {
    animation: bounce-in 0.75s;
}
.scale-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0.65);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
}
</style>
