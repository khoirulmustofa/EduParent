<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-slate-50">

            <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-100/40 rounded-full blur-[80px] animate-pulse">
                </div>

                <div class="absolute top-[10%] right-[-10%] w-80 h-80 bg-blue-100/40 rounded-full blur-[80px]"></div>

                <div class="absolute bottom-[-10%] left-[10%] w-80 h-80 bg-emerald-100/40 rounded-full blur-[80px]">
                </div>

                <div
                    class="absolute bottom-[20%] right-[10%] w-64 h-64 bg-fuchsia-100/40 rounded-full blur-[80px] animate-pulse">
                </div>
            </div>

            <div class="relative z-10 flex flex-col min-h-full px-6 py-12 justify-center">

                <div class="flex flex-col items-center mb-10 animate-fade-in-down">
                    <div
                        class="w-24 h-24 bg-white/60 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transform hover:rotate-6 transition-transform duration-500 group">
                        <ion-icon :icon="lockClosed"
                            class="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 group-hover:scale-110 transition-transform"></ion-icon>
                    </div>
                    <h1 class="text-3xl font-black text-slate-800 tracking-tight mb-2">Welcome Back</h1>
                    <p class="text-slate-500 text-sm font-medium">Please sign in to your account</p>
                </div>

                <div
                    class="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] animate-fade-in-up">
                    <div class="space-y-6">

                        <div class="space-y-2">
                            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email
                                Address</label>
                            <div class="relative group">
                                <ion-icon :icon="mailOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-xl"></ion-icon>
                                <input v-model="email" type="email" placeholder="name@example.com"
                                    class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm hover:bg-white" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <div class="flex justify-between items-center ml-1">
                                <label
                                    class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                            </div>
                            <div class="relative group">
                                <ion-icon :icon="keyOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10 text-xl">
                                </ion-icon>

                                <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••"
                                    class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm hover:bg-white" />

                                <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors z-10 text-xl">
                                </ion-icon>
                            </div>
                            <div v-if="toastMessage" class="text-rose-500 text-xs ml-1 font-medium animate-pulse">
                                {{ toastMessage }}
                            </div>
                        </div>

                        <div class="flex justify-end">
                            <button
                                class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors tracking-wide hover:underline decoration-2 decoration-transparent hover:decoration-indigo-200 underline-offset-4">
                                Forgot Password?
                            </button>
                        </div>

                        <button @click="handleLogin" :disabled="isLoading"
                            class="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-bold !py-4 !rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-2">
                            <span v-if="!isLoading">Sign In</span>
                            <ion-spinner v-else name="crescent" color="light"></ion-spinner>
                            <ion-icon v-if="!isLoading" :icon="arrowForward" class="text-xl"></ion-icon>
                        </button>
                    </div>
                </div>

                <div class="mt-8 text-center animate-fade-in">
                    <p class="text-slate-500 text-sm font-medium">
                        Don't have an account?
                        <button @click="router.push('/register')"
                            class="text-fuchsia-600 font-bold hover:text-fuchsia-700 transition-colors ml-1 underline decoration-2 decoration-transparent hover:decoration-fuchsia-200 underline-offset-4">
                            Register Now
                        </button>
                    </p>
                </div>
            </div>

            <ion-toast :is-open="showToast" :message="toastMessage" :duration="3000" position="top" class="custom-toast"
                @didDismiss="showToast = false"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { IonContent, IonIcon, IonPage, IonSpinner, IonToast } from '@ionic/vue';
import { arrowForward, eyeOffOutline, eyeOutline, keyOutline, lockClosed, mailOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('admin@admin.com');
const password = ref('password');
const isLoading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
    if (!email.value || !password.value) {
        toastMessage.value = 'Please fill in all fields';
        showToast.value = true;
        return;
    }

    isLoading.value = true;
    try {
        const res: any = await authStore.login({ email: email.value, password: password.value });

        console.log(res);
        if (res.success) {
            router.replace('/home');
        } else {
            toastMessage.value = res.message;
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