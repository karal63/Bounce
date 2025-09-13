import type { Ref } from "vue";

export const useSound = () => {
    const pauseSound = (state: Ref<HTMLAudioElement>) => {
        state.value.pause();
    };

    const playSound = (state: Ref<HTMLAudioElement>, loop: boolean) => {
        state.value.currentTime = 0;
        state.value.loop = loop;
        state.value.volume = 0.5;
        state.value.play();
    };

    return { pauseSound, playSound };
};
