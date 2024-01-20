import { defineStore } from "pinia";
import { ref } from 'vue';
import { addInterestedListToDbService, fetchRecommendedTracksService } from "@/service/recommendations/interestedListService";

export const useSpotifyStore = defineStore('Spotify Store' ,()=>{
    const is_active = ref(false);
    const current_track = ref(0);
    const isPlaying = ref(false);
    const isInterrupted = ref(false);
    const track_list = ref(['spotify:track:7JJmb5XwzOO8jgpou264Ml','spotify:track:7F1CiKqrY44kh5cDqwHOnx','spotify:track:3oL3XRtkP1WVbMxf7dtTdu','spotify:track:7ErkrGvaAbLWgWS7wJ4D7f','spotify:track:2Bs4jQEGMycglOfWPBqrVG','spotify:track:4qu63nuBpdn0qHUHuObEj1'])
    const previous_list = ref([])
    const completely_listened_list = ref([])
    const liked_list = ref([])
    const interested_list = ref([]) //This list contains the list of tracks that user listened completely in current session
    const interested_list_from_model = ref([]) // This list consists of tracks that user already interested

    const playing_list = ['liked', 'interested', 'recommended']

    const current_playing = ref('interested')

    const recommendation_list = ref([])

    const pauseClicked = ref(false)

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

    const addTrackToInterestedList = async(newValue)=>{
        if (completely_listened_list.value.includes(newValue) && !liked_list.value.includes(newValue) && !interested_list_from_model.value.includes(newValue)) {
            interested_list.value.unshift(newValue);
            if (interested_list.value.length > 0) {
                await addInterestedListToDbService({ "track_list": interested_list.value })
                    .then((res) => {
                        if (res.code == 1) {
                            interested_list_from_model.value = [... interested_list.value]
                            interested_list.value = []
                        }
                    })
            }
        }
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
        interested_list_from_model.value.push(newValue);
    }

    const nextTrack = async() => {
        if (track_list.value.length > 0) {
            const recent = track_list.value[current_track.value]
            track_list.value.splice(current_track.value, 1)
            previous_list.value.unshift(recent)
            current_track.value = Math.floor(Math.random()*track_list.value.length) % track_list.value.length
            isInterrupted.value = true
            await fetchRecommendedTracks()
        }
    }

    async function fetchRecommendedTracks_from_db(req_type) {
        await fetchRecommendedTracksService().then((res) => {
            if (res.code == 1) {
                if (req_type == 'custom')
                {
                    recommendation_list.value = res.data
                    track_list.value = recommendation_list.value
                    return
                }
                const track_set = new Set(track_list.value)
                res.data.forEach((track) => {
                    if (!previous_list.value.includes(track))
                        track_set.add(track)
                })
                recommendation_list.value = res.data
                track_list.value = [...track_set]
            } else console.error('Failed to fetch recommended tracks')
        })
    }

    async function fetchRecommendedTracks() {
        if (track_list.value.length < 6) {
            if (interested_list.value.length > 0) {
                await addInterestedListToDbService({ "track_list": interested_list.value })
                    .then((res) => {
                        if (res.code == 1) {
                            interested_list_from_model.value = [... interested_list.value]
                            interested_list.value = []
                        }
                    })
            }
            await fetchRecommendedTracks_from_db('auto')
        }
    }

    const setCurrentPlayingList = async (type) => {
        if (type == 'liked')
            track_list.value = liked_list.value
        else if (type == 'interested')
            track_list.value = interested_list_from_model.value
        else {
            if (recommendation_list.value.length > 0) {
                const filteredRecommendations = recommendation_list.value.filter((track) => {
                    return !previous_list.value.includes(track)
                })
                recommendation_list.value = filteredRecommendations
                if (recommendation_list.value.length > 0) {
                    track_list.value = recommendation_list.value
                }
                else
                    await fetchRecommendedTracks_from_db('custom')

            }
            else
                await fetchRecommendedTracks_from_db('custom')
        }
        current_playing.value = type
        isInterrupted.value = true
    }

    return {
        is_active, current_track, track_list, isPlaying, isInterrupted, previous_list, interested_list,
        completely_listened_list, liked_list, interested_list_from_model, current_playing, playing_list, recommendation_list,
        pauseClicked,
        setActive, setTrack, addToTrackList, addTrackToInterestedList, addToCompletelyListenedList, addToLikedList,
        nextTrack, fetchRecommendedTracks, setCurrentPlayingList
    };
})