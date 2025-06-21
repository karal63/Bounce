<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

type User = {
    email: string;
    password: string;
    passwordRepeat?: string;
    name?: string;
};

const props = defineProps<{
    mode: string;
}>();

const isLoginAuthMode = computed(() => {
    return props.mode === "login";
});

const user = ref<User>({
    email: "",
    password: "",
    passwordRepeat: "",
    name: "",
});

const handleSubmit = () => {
    if (props.mode === "login") {
        console.log("login");
    } else {
        console.log("sign-up");
    }
};
</script>

<template>
    <div class="h-full">
        <div class="h-[70px] flex items-center justify-between">
            <h1 class="font-semibold text-2xl text-purple-300">
                <RouterLink to="/">Bounce</RouterLink>
            </h1>
        </div>

        <div class="h-[calc(100%-70px)] flex-center">
            <form
                @submit.prevent="handleSubmit"
                class="text-white flex-col items-center py-10 w-[400px] bg-gray-900 border border-purple-950 px-10 rounded-2xl"
            >
                <h1 class="text-3xl font-bold mb-5">
                    {{ isLoginAuthMode ? "Log in" : "Sign up" }}
                </h1>
                <div class="flex gap-2">
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
                    >
                        <Icon icon="mdi:google"
                    /></a>
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
                    >
                        <Icon icon="ic:baseline-apple"
                    /></a>
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
                    >
                        <Icon icon="ic:baseline-facebook"
                    /></a>
                    <a
                        href="#"
                        class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
                    >
                        <Icon icon="mdi:github" />
                    </a>
                </div>
                <span class="mt-5 text-sm mb-2 text-gray-400"
                    >or use your email for
                    {{ isLoginAuthMode ? "logging in" : "regestration" }}</span
                >

                <div class="flex-col gap-2 w-full">
                    <input
                        type="text"
                        v-model="user.email"
                        placeholder="Email"
                        class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
                    />
                    <input
                        type="password"
                        v-model="user.password"
                        placeholder="Password"
                        class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
                    />

                    <div v-if="!isLoginAuthMode" class="flex-col gap-2">
                        <input
                            type="password"
                            v-model="user.passwordRepeat"
                            placeholder="Password (repeat)"
                            class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
                        />
                        <input
                            type="text"
                            v-model="user.name"
                            placeholder="Name"
                            class="bg-gray-800 w-full py-2 rounded-md px-2 outline-none"
                        />
                    </div>
                </div>

                <button
                    @click.prevent
                    v-if="isLoginAuthMode"
                    class="mt-3 text-purple-400 cursor-pointer"
                >
                    Forgot password?
                </button>

                <button
                    type="submit"
                    class="mt-4 bg-purple-600 px-10 py-2 rounded-md cursor-pointer"
                >
                    {{ isLoginAuthMode ? "Log in" : "Sign up" }}
                </button>

                <p class="mt-5 text-gray-400">
                    {{
                        isLoginAuthMode
                            ? "Don't have a account yet?"
                            : "Already have an account?"
                    }}
                    <RouterLink
                        :to="isLoginAuthMode ? '/sign-up' : 'login'"
                        class="text-purple-600"
                        >{{
                            isLoginAuthMode ? "Sign up" : "Log in"
                        }}</RouterLink
                    >
                </p>

                <p class="mt-9 text-gray-700">
                    Privacy Policy | How we process your data
                </p>
            </form>
        </div>
    </div>
</template>
