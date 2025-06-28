<script setup lang="ts">
import DefaultLayout from "@/app/layout/DefaultLayout.vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useRouter } from "vue-router";
const sessionStore = useSessionStore();
const router = useRouter();

router.push(`${sessionStore.isAuthenticated ? "/chat/2ap" : "/login"}`);
</script>

<template>
    <DefaultLayout>
        <router-view />
    </DefaultLayout>
</template>
