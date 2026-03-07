<script setup lang="ts">
import BackgroundTheme from '@/components/BackgroundTheme.vue';
import api from '@/services/api';
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonButtons,
    IonBackButton, IonTitle, IonIcon, IonSearchbar, IonSpinner
} from '@ionic/vue';
import { arrowBack, bookOutline, locationOutline, musicalNotesOutline } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Surah {
    nomor: number;
    nama: string;
    nama_latin: string;
    jumlah_ayat: number;
    tempat_turun: string;
    arti: string;
    deskripsi: string;
    audio: string;
}

const surahList = ref<Surah[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');
const hasError = ref(false);

const filteredSurah = computed(() => {
    if (!searchQuery.value) return surahList.value;
    const q = searchQuery.value.toLowerCase();
    return surahList.value.filter(s =>
        s.nama_latin.toLowerCase().includes(q) ||
        s.arti.toLowerCase().includes(q) ||
        s.nomor.toString().includes(q) ||
        s.nama.includes(searchQuery.value)
    );
});

const fetchSurah = async () => {
    isLoading.value = true;
    hasError.value = false;
    try {
        const response = await api.get('/master/quran/surah');
        if (response.data.success) {
            surahList.value = response.data.data;
        }
    } catch (error) {
        console.error('Gagal memuat daftar surah:', error);
        hasError.value = true;
    } finally {
        isLoading.value = false;
    }
};

const goToDetail = (nomor: number) => {
    router.push(`/quran/surah/${nomor}`);
};

// Warna badge berdasarkan tempat turun
const getBadgeColor = (tempat: string) => {
    return tempat === 'Mekah' || tempat === 'mekah' || tempat === 'Makkiyah'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-emerald-100 text-emerald-700';
};

onMounted(() => {
    fetchSurah();
});
</script>


<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar class="bg-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/menu" text="" :icon="arrowBack"
                        class="text-slate-700"></ion-back-button>
                </ion-buttons>
                <ion-title class="font-bold text-lg text-slate-900">Al Qur'an</ion-title>
                <ion-icon :icon="bookOutline" slot="end" class="me-5 text-2xl text-green-600"></ion-icon>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <BackgroundTheme />

            <div class="relative z-10 px-4 py-3 pb-24 space-y-4">

                <!-- Hero Banner -->
                <div
                    class="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
                    <div
                        class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2">
                    </div>
                    <div
                        class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2">
                    </div>
                    <div class="relative z-10">
                        <div class="text-3xl font-arabic mb-1 text-right leading-relaxed" dir="rtl">بِسْمِ ٱللَّهِ
                            ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
                        <div class="text-white/80 text-xs mt-2">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
                        </div>
                        <div class="flex items-end gap-3 mt-3">
                            <div class="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-bold">
                                {{ surahList.length }} Surah
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search Bar -->
                <div class="relative">
                    <ion-searchbar v-model="searchQuery" placeholder="Cari surah..." mode="ios"
                        class="custom-searchbar !rounded-2xl" :debounce="300"></ion-searchbar>
                </div>

                <!-- Loading State -->
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
                    <ion-spinner name="crescent" color="primary" class="w-10 h-10"></ion-spinner>
                    <div class="text-sm text-slate-400 mt-3 font-medium">Memuat daftar surah...</div>
                </div>

                <!-- Error State -->
                <div v-else-if="hasError" class="flex flex-col items-center justify-center py-16 text-center">
                    <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <ion-icon :icon="bookOutline" class="text-3xl text-red-300"></ion-icon>
                    </div>
                    <div class="text-lg font-bold text-slate-700 mb-1">Gagal Memuat Data</div>
                    <div class="text-sm text-slate-400 mb-4">Periksa koneksi internet Anda</div>
                    <button @click="fetchSurah"
                        class="bg-green-500 text-white font-bold !px-6 !py-2.5 !rounded-xl text-sm active:scale-95 transition-all">
                        Coba Lagi
                    </button>
                </div>

                <!-- Empty Search Result -->
                <div v-else-if="filteredSurah.length === 0 && searchQuery"
                    class="flex flex-col items-center justify-center py-16 text-center">
                    <div class="text-lg font-bold text-slate-700 mb-1">Surah Tidak Ditemukan</div>
                    <div class="text-sm text-slate-400">Coba kata kunci lain</div>
                </div>

                <!-- Surah List -->
                <div v-else class="space-y-3">
                    <div v-for="surah in filteredSurah" :key="surah.nomor" @click="goToDetail(surah.nomor)"
                        class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 active:scale-[0.98] transition-all cursor-pointer group hover:shadow-md">
                        <div class="flex items-center gap-4">

                            <!-- Nomor Surah -->
                            <div class="relative flex-shrink-0">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
                                    <span class="text-white font-black text-sm">{{ surah.nomor }}</span>
                                </div>
                            </div>

                            <!-- Info Surah -->
                            <div class="flex-grow min-w-0">
                                <div class="flex items-center gap-2 mb-0.5">
                                    <div class="font-bold text-slate-800 text-[15px] leading-tight">{{ surah.nama_latin
                                        }}</div>
                                    <span
                                        :class="[getBadgeColor(surah.tempat_turun), 'text-[9px] font-bold px-2 py-0.5 rounded-full']">
                                        {{ surah.tempat_turun }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                    <span>{{ surah.arti }}</span>
                                    <span class="text-slate-300">•</span>
                                    <span>{{ surah.jumlah_ayat }} Ayat</span>
                                </div>
                            </div>

                            <!-- Nama Arab -->
                            <div class="flex-shrink-0 text-right">
                                <div class="text-xl font-arabic text-green-600 leading-tight" dir="rtl">{{ surah.nama }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </ion-content>
    </ion-page>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}

ion-toolbar {
    --background: transparent;
    --border-width: 0;
}

.font-arabic {
    font-family: 'Amiri', serif;
}

.custom-searchbar {
    --background: white;
    --border-radius: 16px;
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    --placeholder-color: #94a3b8;
    --icon-color: #94a3b8;
    padding: 0;
}
</style>
