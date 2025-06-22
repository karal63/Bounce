<script setup lang="ts">
import AuthForm from "../../shared/UI/AuthForm.vue";
import { login } from "../../features/auth/login";
import type { User } from "../../shared/types/user";

const handleSubmit = (user: User) => {
    const res = login(user);
    // console.log(user);
};
</script>

<template>
    <AuthForm mode="signup" @submit="handleSubmit($event)" />
</template>
