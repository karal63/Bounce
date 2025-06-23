<script setup lang="ts">
import AuthForm from "@/features/auth/AuthForm/ui/index.vue";
import type { User } from "@/shared/types/user";
import { signup } from "@/features/auth/signup/signup";

const handleSubmit = async (user: User) => {
    await signup(user);
};
</script>

<template>
    <AuthForm mode="signup" @submit="handleSubmit($event)" />
</template>
