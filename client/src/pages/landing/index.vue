<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import gradientBg from "@/shared/assets/gradient-bg.jpg";
const router = useRouter();

onMounted(() => {
    if (localStorage.getItem("accessToken")) {
        router.push("/chat");
    }
});
</script>

<template>
    <div>
        <!-- navbar -->
        <section
            class="h-[100vh] bg-no-repeat bg-fill"
            :style="{
                backgroundImage: `url(${gradientBg})`,
                backgroundSize: '1920px 800px',
            }"
        >
            <nav class="flex justify-between items-center px-10 py-5">
                <div class="flex items-center gap-2">
                    <div class="flex-col gap-1 cursor-pointer">
                        <div
                            class="bg-purple-500 w-4 h-1 rounded-xl -ml-1"
                        ></div>
                        <div class="bg-purple-500 w-4 h-1 rounded-xl"></div>
                        <div
                            class="bg-purple-500 w-4 h-1 rounded-xl ml-1"
                        ></div>
                    </div>
                    <h1 class="font-semibold text-2xl">Bounce</h1>
                </div>

                <ul class="flex items-center gap-3">
                    <li>About</li>
                    <li></li>
                    <li>Sign up</li>
                </ul>

                <div>
                    <RouterLink
                        to="/login"
                        class="px-5 py-2 rounded-xl bg-white text-black font-semibold cursor-pointer"
                    >
                        Log in
                    </RouterLink>
                </div>
            </nav>

            <div class="h-[80vh] flex-col justify-center items-center">
                <h1 class="text-6xl">Chat. Chill.</h1>
                <h1 class="text-6xl">Bounce around.</h1>

                <p
                    class="mt-8 w-[500px] text-center space-y-10 text-white/70 text-[1.1rem]"
                >
                    We’re making group chats feel more like real hangouts. With
                    Bounce, staying close is simple, chill, and always in sync.
                </p>

                <RouterLink
                    to="/login"
                    class="mt-12 rounded-xl px-5 py-2 bg-white text-black font-semibold"
                >
                    Get Started
                </RouterLink>
            </div>
        </section>

        <div class="h-24 bg-purple-950"></div>

        <footer class="h-[300px] flex justify-center bg-mainDarkBg pt-20 px-10">
            <div class="w-[1000px]">
                <div class="h-[150px] flex">
                    <div class="w-1/4">
                        <div class="text-sm text-white/70 mb-2">Pages</div>
                        <div class="text-lg">About</div>
                        <div class="text-lg">About</div>
                        <div class="text-lg">About</div>
                    </div>

                    <div class="w-1/4">
                        <div class="text-sm text-white/70 mb-2">Contact</div>
                        <div class="text-lg">About</div>
                        <div class="text-lg">About</div>
                        <div class="text-lg">About</div>
                    </div>
                </div>
                <div class="flex justify-end text-white/70">
                    @Copyright Bounce 2025
                </div>
            </div>
        </footer>
    </div>
</template>
