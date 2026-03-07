<template>
    <ion-page>
       <ion-header class="ion-no-border">
            <ion-toolbar class="bg-white">
                <ion-title class="font-bold text-lg text-slate-900 ml-5" slot="start">Profile</ion-title>
                <ion-icon :icon="personOutline" class="text-slate-700 mr-5 text-2xl" slot="end"></ion-icon>
            </ion-toolbar>
        </ion-header>

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

            <div class="relative z-10  p-5 space-y-5">

                <div class="flex flex-col items-center">
                    <div class="relative mb-2">
                        <div class="w-28 h-28 rounded-2xl p-1 bg-white shadow-lg">
                            <img :src="photoPreview || authStore.user?.photo_url || 'https://placehold.co/112x112?text=Foto'"
                                alt="Foto Profil" class="w-full h-full rounded-2xl object-cover" />
                        </div>
                        <button @click="selectPhoto"
                            class="absolute bottom-0 right-1 w-9 h-9 bg-green-500 !rounded-2xl border-[2px] border-white flex items-center justify-center text-white shadow-md active:scale-90 transition-transform">
                            <ion-icon :icon="cameraOutline" class="text-sm"></ion-icon>
                        </button>
                        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelected" />
                    </div>
                    <div class="text-xl font-bold text-gray-900">{{ authStore.user?.name }}</div>
                    <div class="text-gray-500 text-sm font-medium mt-1">{{ authStore.user?.email }}</div>
                </div>

                <!-- Upload Progress -->
                <div v-if="isUploading" class="mb-6">
                    <div class="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                        <div class="flex items-center gap-3 mb-2">
                            <ion-spinner name="crescent" color="primary" class="w-5 h-5"></ion-spinner>
                            <span class="text-sm font-semibold text-slate-700">Mengunggah foto...</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-1.5">
                            <div class="bg-[#5F33E1] h-1.5 rounded-full transition-all duration-500 animate-pulse"
                                style="width: 70%"></div>
                        </div>
                    </div>
                </div>

               
                <div class="space-y-4">
                    <div class="!text-xl !font-bold !text-gray-900 !ml-1 !pt-2">Umum</div>

                    <button @click="router.push('/profile/edit')"
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-purple-50 text-[#5F33E1] flex items-center justify-center">
                                <ion-icon :icon="personOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Edit Profil</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-[#5F33E1] transition-colors"></ion-icon>
                    </button>

                    <button @click="router.push('/profile/notifications')"
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                <ion-icon :icon="notificationsOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Notifikasi</span>
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
                            <span class="font-semibold text-gray-700 text-[15px]">Keamanan</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-orange-500 transition-colors"></ion-icon>
                    </button>

                    <div class="!text-xl !font-bold !text-gray-900 !ml-1 !pt-2">Preferensi</div>

                    <button @click="router.push('/profile/help')"
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                                <ion-icon :icon="helpCircleOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Bantuan & Dukungan</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-pink-500 transition-colors"></ion-icon>
                    </button>

                    <button @click="handleLogoutConfirm"
                        class="w-full bg-red-50 !p-4 !rounded-2xl !border !border-red-100 flex items-center justify-center gap-2 group active:scale-[0.98] transition-all mt-6">
                        <ion-icon :icon="logOutOutline" class="text-red-500 text-xl"></ion-icon>
                        <span class="font-bold text-red-500 text-[15px]">Keluar</span>
                    </button>

                </div>
            </div>

            <ion-toast :is-open="showToast" :message="toastMessage" :duration="3000" position="top" :color="toastColor"
                @didDismiss="showToast = false"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import api from '@/services/api';
import {
    alertController, IonContent, IonIcon, IonPage, IonSpinner, IonToast, IonHeader,
    IonToolbar,
    IonTitle,
} from '@ionic/vue';
import {
    cameraOutline,
    chevronForward,
    helpCircleOutline,
    logOutOutline,
    notificationsOutline,
    personOutline,
    personCircleOutline,
    shieldCheckmarkOutline
} from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const fileInput = ref<HTMLInputElement | null>(null);
const photoPreview = ref<string | null>(null);
const isUploading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastColor = ref('success');

const selectPhoto = () => {
    fileInput.value?.click();
};

const onFileSelected = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    // Preview foto langsung
    const reader = new FileReader();
    reader.onload = (e) => {
        photoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    // Upload ke server
    isUploading.value = true;
    try {
        const formData = new FormData();
        formData.append('photo', file);

        const response = await api.post('/profile/update-photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
            await authStore.fetchUser();
            toastMessage.value = 'Foto profil berhasil diperbarui!';
            toastColor.value = 'success';
        } else {
            photoPreview.value = null;
            toastMessage.value = response.data.message || 'Gagal mengunggah foto';
            toastColor.value = 'danger';
        }
    } catch (error: any) {
        photoPreview.value = null;
        toastMessage.value = error.response?.data?.message || 'Koneksi gagal. Coba lagi.';
        toastColor.value = 'danger';
    } finally {
        isUploading.value = false;
        showToast.value = true;
        // Reset input agar bisa memilih file yang sama
        if (fileInput.value) fileInput.value.value = '';
    }
};

const handleLogoutConfirm = async () => {
    const alert = await alertController.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin ingin keluar?',
        buttons: [
            {
                text: 'Batal',
                role: 'cancel',
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
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>