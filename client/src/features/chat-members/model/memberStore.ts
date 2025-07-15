import type { MemberWithName } from "@/shared/types/Member";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemberStore = defineStore("memberStore", () => {
    const selectedMember = ref<MemberWithName | null>(null);

    return { selectedMember };
});
