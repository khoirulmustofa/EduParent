# Assalamu Alaikum


### Run dev server:
With Web Native

```
https://www.figma.com/design/MO9YdNRQpZkNu2NOb4CFKy/Task-management---to-do-list-app--Community-?node-id=101-125&t=y7xbpy47MRvna1Ci-0
```

```
<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <div class="fixed inset-0 bg-gradient-to-br from-blue-200 via-white to-cyan-100 pointer-events-none z-0">
            </div>

            <div
                class="absolute top-[-50px] left-[-50px] w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse">
            </div>
            <div class="absolute bottom-20 right-[-20px] w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

            <div class="relative z-10 flex flex-col h-full px-4 justify-center">

                <div class="mb-10 text-center">
                    <div
                        class="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto mb-6 flex items-center justify-center transform rotate-3">
                        <ion-icon :icon="rocket" class="text-4xl text-green-600"></ion-icon>
                    </div>
                    <div class="text-3xl font-black text-gray-800 mb-2 tracking-tight">Welcome Back!</div>
                    <div class="text-gray-500 text-sm">Please sign in to your account</div>
                </div>

                <form class="space-y-2 bg-white/90 backdrop-blur-lg rounded-2xl p-4" @submit.prevent>

                    <div class="group">
                        <div class="relative flex items-center">
                            <div
                                class="absolute left-4 text-gray-400 group-focus-within:text-green-600 transition-colors">
                                <ion-icon :icon="mailOutline" class="text-xl"></ion-icon>
                            </div>
                            <input type="email" placeholder="Email Address"
                                class="w-full bg-white text-gray-700 pl-12 pr-4 py-4 rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all font-medium placeholder:text-gray-400" />
                        </div>
                    </div>

                    <div class="group">
                        <div class="relative flex items-center">
                            <div
                                class="absolute left-4 text-gray-400 group-focus-within:text-green-600 transition-colors">
                                <ion-icon :icon="lockClosedOutline" class="text-xl"></ion-icon>
                            </div>
                            <input :type="showPassword ? 'text' : 'password'" placeholder="Password"
                                class="w-full bg-white text-gray-700 pl-12 pr-12 py-4 rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all font-medium placeholder:text-gray-400" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                                <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" class="text-xl"></ion-icon>
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button class="font-bold text-green-900 hover:text-green-800 transition-colors">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        class="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold !py-4 !rounded-2xl  active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mt-4">
                        <span>Sign In</span>
                        <ion-icon :icon="arrowForward" class="text-lg"></ion-icon>
                    </button>
                </form>

                <div class="flex items-center gap-4 my-8">
                    <div class="h-px bg-gray-200 flex-1"></div>
                    <span class="text-gray-400 text-xs font-medium uppercase tracking-wider">Or continue with</span>
                    <div class="h-px bg-gray-200 flex-1"></div>
                </div>

                <div class="flex gap-4 justify-center">
                    <button @click="goToHome"
                        class="flex-1 bg-gradient-to-b from-red-50 to-red-100 !py-3.5 !rounded-xl !shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors active:scale-95">
                        <ion-icon :icon="logoGoogle" class="text-xl text-red-500"></ion-icon>
                        <span class="text-sm font-bold text-gray-600">Google</span>
                    </button>
                </div>

                <div class="mt-10 text-center">
                    <p class="text-gray-500 text-sm">
                        Don't have an account?
                        <button class="font-bold text-green-600 hover:underline ml-1">Sign Up</button>
                    </p>
                </div>

            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
    mailOutline,
    lockClosedOutline,
    eyeOutline,
    eyeOffOutline,
    arrowForward,
    logoGoogle,
    rocket
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const showPassword = ref(false);

const router = useRouter();

const goToHome = () => {
  router.replace('/home');
};
</script>

<style scoped>
/* Optional: Smooth fade in animation for form elements */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

form {
    animation: fadeIn 0.6s ease-out;
}
</style>
```