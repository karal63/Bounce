<script setup lang="ts">
import { computed, ref } from "vue";
import type { User } from "@/shared/types/user";
import SocialLinks from "@/features/auth/AuthForm/ui/SocialLinks.vue";
import LoginFields from "@/features/auth/AuthForm/ui/LoginFields.vue";
import SignupFields from "@/features/auth/AuthForm/ui/SignupFields.vue";
import { useAuthStore } from "@/features/auth/model/authStore";
import { Icon } from "@iconify/vue";

const authStore = useAuthStore();

const props = defineProps<{
    mode: string;
}>();
const emits = defineEmits<{
    (event: "submit", payload: User): void;
}>();

const user = ref<User>({
    email: "",
    password: "",
    passwordRepeat: "",
    name: "",
});

const isLoginAuthMode = computed(() => {
    return props.mode === "login";
});

// try to move emit to sub-component, separate auth form from main index.vue
const handleSubmit = () => {
    authStore.isLoading = true;
    emits("submit", user.value);
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

                <SocialLinks />

                <span class="mt-5 text-sm mb-2 text-gray-400"
                    >or use your email for
                    {{ isLoginAuthMode ? "logging in" : "regestration" }}</span
                >

                <div class="flex-col gap-2 w-full">
                    <LoginFields v-model="user" />
                    <SignupFields v-if="!isLoginAuthMode" v-model="user" />
                </div>

                <button
                    @click.prevent
                    v-if="isLoginAuthMode"
                    class="mt-3 text-purple-400 cursor-pointer"
                >
                    Forgot password?
                </button>

                <div
                    v-if="authStore.isLoading"
                    class="mt-4 bg-purple-600 px-10 py-2 rounded-md cursor-pointer"
                >
                    <Icon icon="line-md:loading-loop" class="text-xl" />
                </div>

                <button
                    v-else
                    type="submit"
                    class="mt-4 bg-purple-600 px-10 py-2 rounded-md cursor-pointer"
                >
                    {{ isLoginAuthMode ? "Log in" : "Sign up" }}
                </button>

                <p class="text-red-400 text-sm mt-1">{{ authStore.error }}</p>

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
