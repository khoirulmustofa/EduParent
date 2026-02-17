<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <div class="fixed inset-0 bg-gradient-to-br from-blue-200 via-white to-cyan-100 pointer-events-none z-0">
            </div>

            <div class="relative z-10 flex flex-col h-full px-8 py-10 justify-between">

                <div class="flex-grow flex items-center justify-center w-full relative">
                    <div
                        class="absolute top-10 left-10 w-8 h-8 bg-pink-200 rounded-full blur-sm opacity-50 animate-pulse">
                    </div>
                    <div class="absolute bottom-20 right-10 w-4 h-4 bg-yellow-200 rounded-full blur-sm opacity-50">
                    </div>

                    <img src="https://plus.unsplash.com/premium_vector-1682303174219-9018338d4b5d?w=352&dpr=1&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                        alt="Task Management 3D Illustration"
                        class="w-full max-h-[400px] object-contain drop-shadow-sm" />
                </div>

                <div class="flex flex-col items-center w-full mb-6 gap-4">
                    <div class="text-[20px] font-black text-slate-900 text-center leading-tight tracking-tight">
                        Task Management & <br /> To-Do List
                    </div>

                    <p class="mt-5 text-gray-500 text-center text-[15px] leading-relaxed max-w-xs">
                        This productive tool is designed to help you better manage your task project-wise conveniently!
                    </p>

                    <button @click="presentAlert"
                        class="group w-full !py-3 !bg-linear-to-r from-green-500 to-green-700 text-white !rounded-full shadow-xl shadow-green-200 flex items-center justify-center gap-3 transition-all duration-200 active:scale-95">
                        <span class="text-lg font-bold tracking-wide">Let’s Start</span>
                        <div class="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                            <ion-icon :icon="arrowForward" class="text-white !text-2xl block"></ion-icon>
                        </div>
                    </button>

                    <button @click="showConfirm"
                        class="group w-full !py-3 !bg-linear-to-r from-green-500 to-green-700 text-white !rounded-full shadow-xl shadow-green-200 flex items-center justify-center gap-3 transition-all duration-200 active:scale-95">
                        <span class="text-lg font-bold tracking-wide">Show Confirm</span>
                        <div class="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                            <ion-icon :icon="arrowForward" class="text-white !text-2xl block"></ion-icon>
                        </div>
                    </button>

                    <button @click="goToLogin"
                        class="group w-full !py-3 !bg-linear-to-r from-green-500 to-green-700 text-white !rounded-full shadow-xl shadow-green-200 flex items-center justify-center gap-3 transition-all duration-200 active:scale-95">
                        <span class="text-lg font-bold tracking-wide">Home</span>
                        <div class="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                            <ion-icon :icon="arrowForward" class="text-white !text-2xl block"></ion-icon>
                        </div>
                    </button>

                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { Dialog } from '@capacitor/dialog';
import { alertController, IonContent, IonIcon, IonPage } from '@ionic/vue';
import { arrowForward } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const presentAlert = async () => {
    const alert = await alertController.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin ingin mulai?',
        buttons: [
            {
                text: 'Batal',
                role: 'cancel',
                handler: () => {
                    console.log('User klik batal');
                },
            },
            {
                text: 'Mulai',
                role: 'confirm',
                handler: () => {
                    return { status: 'mulai', values: 'mulai' }; // Mengirim data saat dismiss
                },
            },
        ],
    });

    await alert.present();

    // Menunggu alert ditutup
    const { data, role } = await alert.onWillDismiss();

    // Logika setelah alert hilang dari layar
    if (role === 'confirm') {
        console.log('Data diterima:', data);
        // Jalankan fungsi hapus di sini
    } else {
        console.log('Alert ditutup tanpa konfirmasi');
    }
};


const showConfirm = async () => {
    const { value, cancelled } = await Dialog.prompt({
        title: 'Hello',
        message: `What's your name?`,
    });

    console.log('Name:', value);
    console.log('Cancelled:', cancelled);
};

const router = useRouter();

const goToLogin = () => {
    router.replace('/login');
};


</script>

<style scoped>
/* Optional: Jika ingin font custom agar lebih mirip */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

ion-content {
    --background: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>