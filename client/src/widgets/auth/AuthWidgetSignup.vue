<script setup lang="ts">
import AuthForm from "@/features/auth/AuthForm/ui/index.vue";
import type { User } from "@/shared/types/user";
import { useSignup } from "@/features/auth/signup/useSignup";

const { signup } = useSignup();

const handleSubmit = async (user: User) => {
    await signup(user);
};
</script>

<template>
    <AuthForm mode="signup" @submit="handleSubmit($event)" />
</template>
