<script setup lang="ts">
import type { AuthUser } from "@/features/auth/model/index";

const modelValue = defineModel<AuthUser>();
</script>

<template>
    <div class="flex-col gap-2">
        <input
            type="text"
            v-model="modelValue!.email"
            placeholder="Email"
            class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
        />
        <input
            type="password"
            v-model="modelValue!.password"
            placeholder="Password"
            class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
        />
    </div>
</template>
