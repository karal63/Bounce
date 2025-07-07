<script setup lang="ts">
import { AuthForm } from "@/features/auth/AuthForm";
import { useLogin } from "@/features/auth/login";
import type { AuthUser } from "@/features/auth/model";

const { login } = useLogin();

const handleSubmit = async (user: AuthUser) => {
    await login(user);
};
</script>

<template>
    <AuthForm mode="login" @submit="handleSubmit($event)" />
</template>
