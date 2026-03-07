<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar class="bg-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/profile" text="" :icon="arrowBack"
                        class="text-slate-700"></ion-back-button>
                </ion-buttons>
                <ion-title class="font-bold text-lg text-slate-900">Edit Profil</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="bg-gray-50">
            <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100/30 rounded-full blur-[80px] animate-pulse">
                </div>
                <div class="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-100/30 rounded-full blur-[80px]">
                </div>
            </div>

            <div class="relative z-10 px-6 py-4 pb-20">
                <!-- Photo Section -->
                <div class="flex flex-col items-center mb-8">
                    <div class="relative mb-4">
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
                    <button @click="selectPhoto" class="text-sm font-bold text-[#5F33E1] active:opacity-60">
                        Ganti Foto Profil
                    </button>
                </div>

                <!-- Form -->
                <div class="space-y-5">
                    <div>
                        <label class="text-sm font-bold text-slate-500 ml-1 block mb-2">
                            Nama Lengkap
                        </label>
                        <div class="relative">
                            <ion-icon :icon="personOutline"
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10"></ion-icon>
                            <input v-model="form.name" type="text" placeholder="Masukkan nama lengkap"
                                class="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm" />
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-bold text-slate-500 ml-1 block mb-2">
                            Email
                        </label>
                        <div class="relative">
                            <ion-icon :icon="mailOutline"
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10"></ion-icon>
                            <input v-model="form.email" type="email" placeholder="Masukkan email"
                                class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-400 placeholder:text-slate-400 text-sm font-medium shadow-sm cursor-not-allowed"
                                disabled />
                        </div>
                        <p class="text-[10px] text-slate-400 mt-1 ml-1">Email tidak dapat diubah</p>
                    </div>

                    <div>
                        <label class="text-sm font-bold text-slate-500 ml-1 block mb-2">
                            No. Telepon
                        </label>
                        <div class="relative">
                            <ion-icon :icon="callOutline"
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10"></ion-icon>
                            <input v-model="form.phone" type="tel" placeholder="Masukkan no. telepon"
                                class="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm" />
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-bold text-slate-500 ml-1 block mb-2">
                            Alamat
                        </label>
                        <div class="relative">
                            <ion-icon :icon="locationOutline"
                                class="absolute left-4 top-4 text-slate-400 text-xl z-10"></ion-icon>
                            <textarea v-model="form.address" rows="3" placeholder="Masukkan alamat"
                                class="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/50 transition-all text-sm font-medium shadow-sm resize-none"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <button @click="handleSave" :disabled="isSaving"
                    class="w-full bg-gradient-to-r from-green-500 via-green-500 to-green-500 hover:from-green-600 hover:to-green-600 text-white font-bold !py-4 !rounded-2xl shadow-xl shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-8">
                    <ion-spinner v-if="isSaving" name="crescent" color="light"></ion-spinner>
                    <span v-else>Simpan Perubahan</span>
                </button>
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
    IonBackButton, IonButtons, IonContent, IonHeader, IonIcon,
    IonPage, IonSpinner, IonTitle, IonToast, IonToolbar
} from '@ionic/vue';
import {
    arrowBack, callOutline, cameraOutline, locationOutline,
    mailOutline, personOutline
} from 'ionicons/icons';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();

const fileInput = ref<HTMLInputElement | null>(null);
const photoPreview = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const isSaving = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastColor = ref('success');

const form = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
});

onMounted(() => {
    if (authStore.user) {
        form.value.name = authStore.user.name || '';
        form.value.email = authStore.user.email || '';
        form.value.phone = authStore.user.phone || '';
        form.value.address = authStore.user.address || '';
    }
});

const selectPhoto = () => {
    fileInput.value?.click();
};

const onFileSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

const handleSave = async () => {
    isSaving.value = true;
    try {
        const formData = new FormData();
        formData.append('name', form.value.name);
        formData.append('phone', form.value.phone || '');
        formData.append('address', form.value.address || '');

        if (selectedFile.value) {
            formData.append('photo', selectedFile.value);
        }

        const response = await api.post('/profile/update', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
            // Update user data di store
            await authStore.fetchUser();
            toastMessage.value = 'Profil berhasil diperbarui!';
            toastColor.value = 'success';
        } else {
            toastMessage.value = response.data.message || 'Gagal memperbarui profil';
            toastColor.value = 'danger';
        }
    } catch (error: any) {
        toastMessage.value = error.response?.data?.message || 'Koneksi gagal. Coba lagi.';
        toastColor.value = 'danger';
    } finally {
        isSaving.value = false;
        showToast.value = true;
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}

ion-toolbar {
    --background: transparent;
    --border-width: 0;
}
</style>
