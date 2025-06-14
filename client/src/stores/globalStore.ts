import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("globalStore", () => {
    const counter = ref(0);

    return {
        counter,
    };
});
