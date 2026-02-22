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
            
            <div class="relative z-10 flex flex-col min-h-full px-6 py-10 justify-center">
                <div class="flex flex-col items-center mb-8 animate-fade-in-down">
                    <div
                        class="w-20 h-20 bg-white/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transform hover:-rotate-12 transition-transform duration-500">
                        <ion-icon :icon="personAdd"
                            class="text-4xl text-transparent bg-clip-text bg-gradient-to-tr from-rose-400 to-blue-500"></ion-icon>
                    </div>
                    <h1 class="text-3xl font-black text-slate-800 tracking-tight mb-2">Get Started</h1>
                    <p class="text-slate-500 text-sm font-medium">Create your free account today</p>
                </div>

                <div
                    class="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] animate-fade-in-up">
                    <div class="space-y-5">

                        <div class="space-y-2">
                            <label class="text-[12px] font-bold text-slate-500 tracking-widest ml-1">Nama
                                Lengkap</label>
                            <div class="relative group">
                                <ion-icon :icon="personOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-xl"></ion-icon>
                                <input v-model="form.name" type="text" placeholder="John Doe"
                                    class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm hover:bg-white" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[12px] font-bold text-slate-500 tracking-widest ml-1">Email</label>
                            <div class="relative group">
                                <ion-icon :icon="mailOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-xl"></ion-icon>
                                <input v-model="form.email" type="email" placeholder="name@example.com"
                                    class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm hover:bg-white" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[12px] font-bold text-slate-500 tracking-widest ml-1">Password</label>
                            <div class="relative group">
                                <ion-icon :icon="keyOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-xl"></ion-icon>
                                <input v-model="form.password" type="password" placeholder="••••••••"
                                    class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm hover:bg-white" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[12px] font-bold text-slate-500 tracking-widest ml-1">Confirm
                                Password</label>
                            <div class="relative group">
                                <ion-icon :icon="shieldCheckmarkOutline"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-xl"></ion-icon>
                                <input v-model="form.password_confirmation" type="password" placeholder="••••••••"
                                    class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm hover:bg-white" />
                            </div>
                        </div>

                        <button @click="handleRegister" :disabled="isLoading"
                            class="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold !py-4 !rounded-2xl shadow-xl shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-6">
                            <span v-if="!isLoading">Create Account</span>
                            <ion-spinner v-else name="crescent" color="light"></ion-spinner>
                            <ion-icon v-if="!isLoading" :icon="arrowForward" class="text-xl"></ion-icon>
                        </button>
                    </div>
                </div>

                <div class="mt-8 text-center animate-fade-in">
                    <p class="text-slate-500 text-sm">
                        Already have an account?
                        <button @click="router.push('/login')"
                            class="text-indigo-600 font-bold hover:text-indigo-700 transition-colors ml-1 underline decoration-2 decoration-transparent hover:decoration-indigo-600/30 underline-offset-4">Sign
                            In</button>
                    </p>
                </div>
            </div>
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
        toastMessage.value = 'Harap lengkapi semua kolom yang diperlukan';
        showToast.value = true;
        return;
    }

    if (form.password !== form.password_confirmation) {
        toastMessage.value = 'Password tidak cocok';
        showToast.value = true;
        return;
    }

    isLoading.value = true;
    try {
        const res: any = await authStore.register(form);
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