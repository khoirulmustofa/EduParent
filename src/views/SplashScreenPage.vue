<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-300/40 rounded-full blur-[80px] animate-pulse">
                </div>

                <div class="absolute top-[10%] right-[-10%] w-80 h-80 bg-blue-300/40 rounded-full blur-[80px]"></div>

                <div class="absolute bottom-[-10%] left-[10%] w-80 h-80 bg-emerald-300/40 rounded-full blur-[80px]">
                </div>

                <div
                    class="absolute bottom-[20%] right-[10%] w-64 h-64 bg-fuchsia-300/40 rounded-full blur-[80px] animate-pulse">
                </div>
            </div>

            <!-- Animated Shapes -->
            <div
                class="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse">
            </div>
            <div class="absolute bottom-[5%] left-[-5%] w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

            <div class="relative z-10 flex flex-col h-full px-8 py-12 justify-center items-center">
                <!-- Illustration Section -->
                <div class="flex items-center justify-center w-full relative mb-12">
                    <img src="https://placehold.co/400x400?text=EduParent" alt="Splash Illustration"
                        class="w-full max-w-[320px] object-contain drop-shadow-2xl animate-float" />
                </div>

                <!-- Branding Section -->
                <div class="space-y-4 text-center">
                    <h1 class="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                        Edu<span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Parent</span>
                    </h1>
                    <div class="flex justify-center">
                        <ion-spinner name="crescent" color="primary"></ion-spinner>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { IonContent, IonPage, IonSpinner } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
    setTimeout(() => {
        if (authStore.isAuthenticated) {
            router.replace('/home');
        } else {
            router.replace('/login');
        }
    }, 2000);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

.animate-float {
    animation: float 5s ease-in-out infinite;
}
</style>