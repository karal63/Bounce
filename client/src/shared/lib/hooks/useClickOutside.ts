import { onMounted, onUnmounted, type Ref } from "vue";

export const useClickOutside = (
    targetRef: Ref<HTMLElement | null>,
    callback: (event: MouseEvent) => void,
    secondTargetRef?: Ref<HTMLElement | null>
) => {
    const handleClick = (e: MouseEvent) => {
        const targetEl = targetRef.value;
        const secondEl = secondTargetRef?.value;
        const clickTarget = e.target as Node;

        const clickedOutsideTarget = !targetEl?.contains(clickTarget);
        const clickedOutsideSecond = !secondEl?.contains(clickTarget);

        if (clickedOutsideTarget && clickedOutsideSecond) {
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
