<script setup>
import { useSpotifyStore } from '@/store/SpotifyStore';
const spotifyStore = useSpotifyStore()

</script>

<template>
    <div class="h-full flex place-items-center">
        <div class="bars">
            <div class="bars__item" :class="[spotifyStore.isPlaying ? 'bars-playing':'', 'bars__item']"></div>
            <div class="bars__item" :class="[spotifyStore.isPlaying ? 'bars-playing':'', 'bars__item']"></div>
            <div class="bars__item" :class="[spotifyStore.isPlaying ? 'bars-playing':'', 'bars__item']"></div>
            <div class="bars__item" :class="[spotifyStore.isPlaying ? 'bars-playing':'', 'bars__item']"></div>
        </div>
    </div>

</template>
    
<style scoped>
.bars {
    align-items: flex-end;
    justify-content: center;
    display: flex;
    gap: 0.25rem;
    height: 1.8rem;
}

.bars-playing{
    animation: play 1s ease-out infinite;
    height: 100%;
}
.bars__item {
    background-image: linear-gradient(to top, #ff677d, #ff3956);
    width: 0.5rem;
}

.bars__item:nth-child(1){
    height: 30%;
}

.bars__item:nth-child(2){
    height: 95%;
}

.bars__item:nth-child(3){
    height: 70%;
}

.bars__item:nth-child(4){
    height: 50%;
}

.bars__item:nth-child(1) {
    animation-delay: 0s;
}
.bars__item:nth-child(2) {
    animation-delay: 0.5s;
}
.bars__item:nth-child(3) {
    animation-delay: 0.2s;
}
.bars__item:nth-child(4) {
    animation-delay: 0.75s;
}

@keyframes play {
    0% {
        height: 10%;
    }

    25% {
        height: 75%;
    }

    50% {
        height: 50%;
    }

    75% {
        height: 100%;
    }

    100% {
        height: 10%;
    }
}
</style>