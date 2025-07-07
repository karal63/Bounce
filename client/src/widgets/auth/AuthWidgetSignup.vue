<script setup lang="ts">
import { AuthForm } from "@/features/auth/AuthForm";
import { useSignup } from "@/features/auth/signup";
import type { AuthUser } from "@/features/auth/model";

const { signup } = useSignup();

const handleSubmit = async (user: AuthUser) => {
    await signup(user);
};
</script>

<template>
    <AuthForm mode="signup" @submit="handleSubmit($event)" />
</template>
