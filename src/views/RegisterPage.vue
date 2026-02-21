<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Background Elements -->
            <div class="fixed inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 z-0"></div>
            <div class="absolute top-[-5%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-[10%] left-[-10%] w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>

            <div class="relative z-10 flex flex-col min-h-full px-6 py-10">
                <!-- Header Section -->
                <div class="flex flex-col items-center mb-8 animate-fade-in-down">
                    <div
                        class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/30 transform hover:-rotate-12 transition-transform duration-500">
                        <ion-icon :icon="personAdd" class="text-3xl text-white"></ion-icon>
                    </div>
                    <h1 class="text-2xl font-black text-white tracking-tight mb-1">Create Account</h1>
                    <p class="text-white/70 text-xs">Join us to start managing your tasks</p>
                </div>

                <!-- Form Card -->
                <div
                    class="bg-white/10 backdrop-blur-xl rounded-[32px] p-6 border border-white/20 shadow-2xl animate-fade-in-up">
                    <div class="space-y-4">
                        <!-- Full Name Input -->
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-white/80 uppercase tracking-widest ml-1">Full
                                Name</label>
                            <div class="relative group">
                                <ion-icon :icon="personOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors"></ion-icon>
                                <input v-model="form.name" type="text" placeholder="John Doe"
                                    class="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-sm" />
                            </div>
                        </div>

                        <!-- Email Input -->
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-white/80 uppercase tracking-widest ml-1">Email
                                Address</label>
                            <div class="relative group">
                                <ion-icon :icon="mailOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors"></ion-icon>
                                <input v-model="form.email" type="email" placeholder="name@example.com"
                                    class="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-sm" />
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div class="space-y-1.5">
                            <label
                                class="text-[10px] font-bold text-white/80 uppercase tracking-widest ml-1">Password</label>
                            <div class="relative group">
                                <ion-icon :icon="keyOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors"></ion-icon>
                                <input v-model="form.password" type="password" placeholder="••••••••"
                                    class="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-sm" />
                            </div>
                        </div>

                        <!-- Confirm Password Input -->
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-white/80 uppercase tracking-widest ml-1">Confirm
                                Password</label>
                            <div class="relative group">
                                <ion-icon :icon="shieldCheckmarkOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors"></ion-icon>
                                <input v-model="form.password_confirmation" type="password" placeholder="••••••••"
                                    class="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-sm" />
                            </div>
                        </div>

                        <!-- Register Button -->
                        <button @click="handleRegister" :disabled="isLoading"
                            class="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4">
                            <span v-if="!isLoading">Create Account</span>
                            <ion-spinner v-else name="crescent" color="light"></ion-spinner>
                            <ion-icon v-if="!isLoading" :icon="arrowForward" class="text-xl"></ion-icon>
                        </button>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-8 text-center animate-fade-in">
                    <p class="text-white/60 text-sm">
                        Already have an account?
                        <button @click="router.push('/login')"
                            class="text-emerald-300 font-bold hover:text-emerald-200 transition-colors ml-1">Sign
                            In</button>
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
import {
    arrowForward,
    keyOutline,
    mailOutline,
    personAdd,
    personOutline,
    shieldCheckmarkOutline
} from 'ionicons/icons';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
        toastMessage.value = 'Please fill in all required fields';
        showToast.value = true;
        return;
    }

    if (form.password !== form.password_confirmation) {
        toastMessage.value = 'Passwords do not match';
        showToast.value = true;
        return;
    }

    isLoading.value = true;
    try {
        const success = await authStore.register(form);
        if (success) {
            router.replace('/home');
        } else {
            toastMessage.value = 'Registration failed. Please try again.';
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
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
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

input:focus {
    background-color: rgba(255, 255, 255, 0.15);
}

.custom-toast {
    --background: rgba(255, 255, 255, 0.9);
    --color: #064e3b;
    --button-color: #10b981;
    font-weight: 600;
}
</style>