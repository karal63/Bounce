<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
    if (localStorage.getItem("accessToken")) {
        router.push("/chat");
    }
});
</script>

<template>
    <div>
        <div class="h-[70px] flex items-center justify-between">
            <h1 class="font-semibold text-2xl text-purple-300">
                <RouterLink to="/">Bounce</RouterLink>
            </h1>

            <RouterLink
                to="/login"
                class="bg-purple-500 text-white px-5 py-2 rounded-xl hover:bg-purple-400 transition-all"
                >Log in</RouterLink
            >
        </div>
    </div>
</template>
