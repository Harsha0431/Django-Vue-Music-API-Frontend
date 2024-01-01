import { defineStore } from "pinia";
import {ref} from 'vue'

export const useSpotifyStore = defineStore('Spotify Store' ,()=>{
    const is_active = ref(true);
    const current_track = ref(0);
    const isPlaying = ref(false);
    const isInterrupted = ref(false);
    const track_list = ref(['spotify:track:7JJmb5XwzOO8jgpou264Ml','spotify:track:7F1CiKqrY44kh5cDqwHOnx','spotify:track:3oL3XRtkP1WVbMxf7dtTdu','spotify:track:7ErkrGvaAbLWgWS7wJ4D7f','spotify:track:2Bs4jQEGMycglOfWPBqrVG','spotify:track:4qu63nuBpdn0qHUHuObEj1'])
    const previous_list = ref([])
    const completely_listened_list = ref([])
    const liked_list = ref([])
    const interested_list = ref([]) //This list contains the list of tracks that user listened completely in current session

    // ACTIONS
    const setActive = (newValue) => {
        is_active.value = newValue;
    };
    const setTrack = (newValue) => {
        current_track.value = newValue;
    };

    const addToTrackList = (newValue) =>{
        track_list.value.unshift(newValue);
    }

    const addTrackToInterestedList = (newValue)=>{
        if(completely_listened_list.value.includes(newValue) &&(!liked_list.value.includes(newValue) && !track_list.value.includes(newValue)))
            interested_list.value.unshift(newValue);
    }

    const addToCompletelyListenedList = (newValue) => {
        if(completely_listened_list.value.includes(newValue))
            return
        completely_listened_list.value.unshift(newValue);
        addTrackToInterestedList(newValue);
    }

    const addToLikedList = (newValue) => {
        if (liked_list.value.includes(newValue))
            return
        liked_list.value.unshift(newValue);
        addTrackToInterestedList(newValue);
    }

    const nextTrack = () => {
        if (track_list.value.length > 0) {
            const recent = track_list.value.shift()
            previous_list.value.unshift(recent)
            isInterrupted.value = true
        }
    }

    return { is_active, current_track, track_list , isPlaying, isInterrupted, previous_list, interested_list,
        completely_listened_list, liked_list,
        setActive, setTrack, addToTrackList, addTrackToInterestedList, addToCompletelyListenedList, addToLikedList,
        nextTrack
    };
})