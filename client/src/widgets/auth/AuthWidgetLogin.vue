<script setup lang="ts">
import AuthForm from "@/features/auth/AuthForm/ui/index.vue";
import { login } from "@/features/auth/login/useLogin";
import type { User } from "@/shared/types/user";

const handleSubmit = async (user: User) => {
    await login(user);
};
</script>

<template>
    <AuthForm mode="login" @submit="handleSubmit($event)" />
</template>
