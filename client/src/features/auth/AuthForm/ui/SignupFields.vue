<script setup lang="ts">
import type { AuthUser } from "@/features/auth/AuthForm/model/types/authUser";

const modelValue = defineModel<AuthUser>();
</script>

<template>
    <div class="flex-col gap-2">
        <input
            type="password"
            v-model="modelValue!.passwordRepeat"
            placeholder="Password (repeat)"
            class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
        />
        <input
            type="text"
            v-model="modelValue!.name"
            placeholder="Name"
            class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
        />
    </div>
</template>
