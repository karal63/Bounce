<script setup lang="ts">
import AuthForm from "../../shared/UI/AuthForm/index.vue";
import { login } from "../../features/auth/login";
import type { User } from "../../shared/types/user";

const handleSubmit = async (user: User) => {
    await login(user);
};
</script>

<template>
    <AuthForm mode="login" @submit="handleSubmit($event)" />
</template>
