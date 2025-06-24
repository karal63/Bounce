<script setup lang="ts">
import DefaultLayout from "@/app/layout/DefaultLayout.vue";
import { useAuthStore } from "@/features/auth/model/authStore";
import { watchEffect } from "vue";

const authStore = useAuthStore();

watchEffect(() => {
    if (localStorage.getItem("accessToken")) {
        console.log("refreshing");
        authStore.checkAuth();
    }
});
</script>

<template>
    <DefaultLayout>
        <router-view />
        <div>
            <p
                v-if="authStore.isLoggedUser"
                class="text-purple-500 font-bold text-4xl"
            >
                User authorizated, hello {{ authStore.user?.name }}
            </p>
            <p v-else>User unauthorizated</p>
        </div>
    </DefaultLayout>
</template>
