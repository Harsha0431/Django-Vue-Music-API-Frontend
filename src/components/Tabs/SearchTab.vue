<script setup>
import { useSearchStore } from '@/store/SearchStore'

const searchStore = useSearchStore()
</script>

<template>
    <div
        v-show="searchStore.showSearchTab"
        class="absolute min-h-[100vh] w-[100vw] z-[140] backdrop-blur overflow-hidden"
    >
        <Transition name="scale">
            <div
                v-show="searchStore.showSearchTab"
                class="flex justify-center place-items-center dark:text-white text-black w-full h-full relative top-[10vh]"
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
                                    {{ type.name }}
                                </option>
                            </select>
                        </div>
                        <input
                            type="search"
                            v-model="searchStore.searchText"
                            :placeholder="`Search for ${searchStore.category}`"
                            class="w-full pl-[1rem] sm:pl-[2.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border border-slate-600 dark:border-transparent focus:border-slate-800 shadow-sm rounded-lg dark:placeholder:text-gray-500 placeholder:text-gray-700"
                        />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
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
