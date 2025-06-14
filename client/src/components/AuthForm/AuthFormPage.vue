<script setup lang="ts"></script>

<template>
    <div class="h-full">
        <div class="h-[70px] flex items-center justify-between">
            <h1 class="font-semibold text-2xl text-purple-300">
                <RouterLink to="/">Bounce</RouterLink>
            </h1>
        </div>

        <div class="h-[calc(100%-70px)] flex-center">
            <form
                class="text-white flex-col items-center py-10 w-[400px] bg-gray-900 border border-purple-950 px-10 rounded-2xl"
            >
                <h1 class="text-3xl font-bold mb-5">Log in</h1>
                <div class="flex gap-2">
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center"
                        >G</a
                    >
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center"
                        >G</a
                    >
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center"
                        >G</a
                    >
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center"
                        >G</a
                    >
                </div>
                <span class="mt-5 text-sm mb-2 text-gray-400 00"
                    >or use your email for regestration</span
                >

                <div class="flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Email"
                        class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
                    />
                </div>

                <button class="mt-3 text-purple-400 cursor-pointer">
                    Forgot password?
                </button>

                <button
                    class="mt-4 bg-purple-600 px-10 py-2 rounded-md cursor-pointer"
                >
                    Log in
                </button>
            </form>
        </div>
    </div>
</template>
