import { defineStore } from "pinia";
import {ref} from 'vue'

export const useSpotifyStore = defineStore('Spotify Store' ,()=>{
    const is_active = ref(true);
    const current_track = ref(0);
    const track_list = ref(['spotify:track:7F1CiKqrY44kh5cDqwHOnx','spotify:track:3oL3XRtkP1WVbMxf7dtTdu','spotify:track:7ErkrGvaAbLWgWS7wJ4D7f','spotify:track:2Bs4jQEGMycglOfWPBqrVG','spotify:track:4qu63nuBpdn0qHUHuObEj1'])

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

    return { is_active, current_track, track_list ,setActive, setTrack , addToTrackList };
})