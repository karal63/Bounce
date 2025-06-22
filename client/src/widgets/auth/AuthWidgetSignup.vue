<script setup lang="ts">
import AuthForm from "../../shared/UI/AuthForm/index.vue";
import type { User } from "../../shared/types/user";
import { signup } from "../../features/auth/signup";

const handleSubmit = async (user: User) => {
    await signup(user);
};
</script>

<template>
    <AuthForm mode="signup" @submit="handleSubmit($event)" />
</template>
