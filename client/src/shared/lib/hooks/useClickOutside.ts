import { onMounted, onUnmounted, type Ref } from "vue";

export const useClickOutside = (
    targetRef: Ref<HTMLElement | null>,
    callback: (event: MouseEvent) => void
) => {
    const handleClick = (e: MouseEvent) => {
        if (
            targetRef.value &&
            !targetRef.value.contains(e.target as HTMLElement)
        ) {
            callback(e);
        }
    };

    onMounted(() => {
        addEventListener("mousedown", handleClick);
    });

    onUnmounted(() => {
        removeEventListener("mousedown", handleClick);
    });
};
