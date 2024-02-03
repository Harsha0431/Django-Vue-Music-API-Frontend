import { defineStore } from "pinia"
import { ref } from 'vue'

export const usePlaylistStore = defineStore('playlist-store' ,() => {
    const likedList = ref({
        list: [] ,
        data: []
    })

    const interestedList = ref({
        list: [],
        data: []
    })

    const recommendedList = ref({
        list: [],
        data: []
    })

    const customPlaylist = ref([])
   // TODO:Custom playlist have to implemented after completing all remaining modules
    
    const updateLikedListData = (data) => {
        likedList.value.data = data
        likedList.value.list = []
        data.forEach((track) => {
            likedList.value.list.push(track.track_id)
        })
    }

    const updateInterestedList = async (data) => {
        interestedList.value.data = data
        interestedList.value.list = []
        data.forEach((track) => {
            interestedList.value.list.push(track.track_id)
        })
    }

    const updateRecommendedList = async (data) => {
        recommendedList.value.data = data
        recommendedList.value.list = []
        data.forEach((track) => {
            recommendedList.value.list.push(track.track_id)
        })
    }

    return {
        likedList, interestedList, customPlaylist, recommendedList,
        updateLikedListData , updateInterestedList, updateRecommendedList
    }
})