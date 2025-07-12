import { onMounted, onUnmounted, type Ref } from "vue";

export const useHover = (
    targetRef: Ref<HTMLElement | null>,
    callbackStart: () => void,
    callbackEnd: () => void
) => {
    const handleHover = () => {
        callbackStart();
    };

    const handleUnhover = () => {
        callbackEnd();
    };

    onMounted(() => {
        targetRef.value?.addEventListener("mouseover", handleHover);
        targetRef.value?.addEventListener("mouseleave", handleUnhover);
    });

    onUnmounted(() => {
        removeEventListener("mouseover", handleHover);
        removeEventListener("mouseleave", handleUnhover);
    });
};
