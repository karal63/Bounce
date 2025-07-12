<script setup lang="ts">
import type { MemberWithName } from "@/shared/types/Member";
import UserAvatar from "@/shared/ui/UserAvatar.vue";

defineProps<{
    member: MemberWithName;
}>();
</script>

<template>
    <li class="py-2 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
            <UserAvatar size="40" />
            <div>
                <h3 class="text-lg">{{ member.name }}</h3>
                <div class="text-xs"><span class="">🟢</span>Active</div>
            </div>
        </div>

        <div class="text-sm bg-mainGray text-purple-700 px-2 rounded-md">
            {{ member.role }}
        </div>
    </li>
</template>
