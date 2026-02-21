<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Background Elements -->
            <div class="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 z-0"></div>
            <div class="absolute top-20 left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 right-[-10%] w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

            <div class="relative z-10 flex flex-col min-h-full px-6 py-12">
                <!-- Header Section -->
                <div class="flex flex-col items-center mb-12 animate-fade-in-down">
                    <div
                        class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/30 transform hover:rotate-12 transition-transform duration-500">
                        <ion-icon :icon="lockClosed" class="text-4xl text-white"></ion-icon>
                    </div>
                    <h1 class="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
                    <p class="text-white/70 text-sm">Please sign in to continue</p>
                </div>

                <!-- Form Card -->
                <div
                    class="bg-white/10 backdrop-blur-xl rounded-[32px] p-8 border border-white/20 shadow-2xl animate-fade-in-up">
                    <div class="space-y-6">
                        <!-- Email Input -->
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-white/80 uppercase tracking-widest ml-1">Email
                                Address</label>
                            <div class="relative group">
                                <ion-icon :icon="mailOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors"></ion-icon>
                                <input v-model="email" type="email" placeholder="name@example.com"
                                    class="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all" />
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div class="space-y-2">
                            <div class="flex justify-between items-center ml-1">
                                <label
                                    class="text-xs font-bold text-white/80 uppercase tracking-widest">Password</label>
                                <button
                                    class="text-[10px] font-bold text-blue-300 hover:text-blue-200 transition-colors uppercase tracking-wider">Forgot?</button>
                            </div>
                            <div class="relative group">
                                <ion-icon :icon="keyOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors"></ion-icon>
                                <input v-model="password" type="password" placeholder="••••••••"
                                    class="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all" />
                            </div>
                        </div>

                        <!-- Login Button -->
                        <button @click="handleLogin" :disabled="isLoading"
                            class="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70">
                            <span v-if="!isLoading">Sign In</span>
                            <ion-spinner v-else name="crescent" color="light"></ion-spinner>
                            <ion-icon v-if="!isLoading" :icon="arrowForward" class="text-xl"></ion-icon>
                        </button>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-auto pt-10 text-center animate-fade-in">
                    <p class="text-white/60 text-sm">
                        Don't have an account?
                        <button @click="router.push('/register')"
                            class="text-blue-300 font-bold hover:text-blue-200 transition-colors ml-1">Create
                            Account</button>
                    </p>
                </div>
            </div>

            <ion-toast :is-open="showToast" :message="toastMessage" :duration="3000" position="bottom"
                class="custom-toast" @didDismiss="showToast = false"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { IonContent, IonIcon, IonPage, IonSpinner, IonToast } from '@ionic/vue';
import { arrowForward, keyOutline, lockClosed, mailOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('admin@admin.com');
const password = ref('password');
const isLoading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const handleLogin = async () => {
    if (!email.value || !password.value) {
        toastMessage.value = 'Please fill in all fields';
        showToast.value = true;
        return;
    }

    isLoading.value = true;
    try {
        const success = await authStore.login({ email: email.value, password: password.value });
        if (success) {
            router.replace('/home');
        } else {
            toastMessage.value = 'Invalid credentials';
            showToast.value = true;
        }
    } catch (error: any) {
        toastMessage.value = error.response?.data?.message || 'Connection Error';
        showToast.value = true;
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}

.animate-fade-in-down {
    animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in {
    animation: fadeIn 1.2s ease-out;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Custom transitions for inputs */
input:focus {
    background-color: rgba(255, 255, 255, 0.15);
}

.custom-toast {
    --background: rgba(255, 255, 255, 0.9);
    --color: #1e293b;
    --button-color: #3b82f6;
    font-weight: 600;
}
</style>