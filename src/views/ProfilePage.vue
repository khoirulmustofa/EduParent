<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

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

            <div class="relative z-10 p-5 flex justify-between items-center">

                <div class="text-xl font-bold text-gray-800">Profile</div>
                <button
                    class="!bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full shadow-sm text-gray-700 !border !border-gray-100 !active:scale-95 !transition-transform">
                    <ion-icon :icon="settingsOutline" class="text-xl"></ion-icon>
                </button>
            </div>

            <div class="relative z-10 px-6 pb-25">

                <div class="flex flex-col items-center mb-8">
                    <div class="relative mb-4">
                        <div class="w-28 h-28 rounded-full p-1 bg-white shadow-lg">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                alt="Profile" class="w-full h-full rounded-full object-cover" />
                        </div>
                        <button
                            class="absolute bottom-0 right-1 w-9 h-9 bg-[#5F33E1] rounded-full border-[3px] border-white flex items-center justify-center text-white shadow-md active:scale-90 transition-transform">
                            <ion-icon :icon="cameraOutline" class="text-sm"></ion-icon>
                        </button>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">Livia Vaccaro</div>
                    <p class="text-gray-500 text-sm font-medium mt-1">livia.vaccaro@design.com</p>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div
                        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <div class="text-[#5F33E1] text-2xl font-bold mb-1">24</div>
                        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Tasks Done</span>
                    </div>
                    <div
                        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <div class="text-orange-500 text-2xl font-bold mb-1">12</div>
                        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">In Progress</span>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="!text-xl !font-bold !text-gray-900 !ml-1 !pt-2">General</div>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-purple-50 text-[#5F33E1] flex items-center justify-center">
                                <ion-icon :icon="personOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Edit Profile</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-[#5F33E1] transition-colors"></ion-icon>
                    </button>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                <ion-icon :icon="notificationsOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Notifications</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-blue-500 transition-colors"></ion-icon>
                    </button>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                                <ion-icon :icon="shieldCheckmarkOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Security</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-orange-500 transition-colors"></ion-icon>
                    </button>

                    <div class="!text-xl !font-bold !text-gray-900 !ml-1 !pt-2">Preferences</div>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                                <ion-icon :icon="helpCircleOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Help & Support</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-pink-500 transition-colors"></ion-icon>
                    </button>

                    <button @click="handleLogoutConfirm"
                        class="w-full bg-red-50 !p-4 !rounded-2xl !border !border-red-100 flex items-center justify-center gap-2 group active:scale-[0.98] transition-all mt-6">
                        <ion-icon :icon="logOutOutline" class="text-red-500 text-xl"></ion-icon>
                        <span class="font-bold text-red-500 text-[15px]">Log Out</span>
                    </button>

                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { alertController, IonContent, IonIcon, IonPage } from '@ionic/vue';
import {
    cameraOutline,
    chevronForward,
    helpCircleOutline,
    logOutOutline,
    notificationsOutline,
    personOutline,
    settingsOutline,
    shieldCheckmarkOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();




const handleLogoutConfirm = async () => {
    const alert = await alertController.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin ingin keluar?',
        buttons: [
            {
                text: 'Batal',
                role: 'cancel',
                handler: () => {
                    console.log('User klik batal');
                },
            },
            {
                text: 'Keluar',
                role: 'confirm',
                handler: () => {
                    authStore.logout();
                    router.push('/login');
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
</script>