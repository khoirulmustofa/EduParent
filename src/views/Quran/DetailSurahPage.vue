<script setup lang="ts">
import BackgroundTheme from '@/components/BackgroundTheme.vue';
import api from '@/services/api';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonButtons,
    IonBackButton, IonTitle, IonIcon, IonSpinner, IonToast
} from '@ionic/vue';
import {
    arrowBack, bookOutline, chevronBack, chevronForward,
    playOutline, pauseOutline, bookmarkOutline, bookmark
} from 'ionicons/icons';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookmarkStore = useBookmarkStore();
const toastMessage = ref('');
const showToast = ref(false);

interface Ayat {
    id: number;
    surah: number;
    nomor: number;
    ar: string;
    tr: string;
    idn: string;
}

interface Surah {
    nomor: number;
    nama: string;
    nama_latin: string;
    jumlah_ayat: number;
    tempat_turun: string;
    arti: string;
    deskripsi: string;
    audio: string;
    ayats: Ayat[];
}

interface NavSurah {
    nomor: number;
    nama_latin: string;
    nama: string;
}

const surah = ref<Surah | null>(null);
const prevSurah = ref<NavSurah | false>(false);
const nextSurah = ref<NavSurah | false>(false);
const isLoading = ref(true);
const hasError = ref(false);
const isPlaying = ref(false);
const audioPlayer = ref<HTMLAudioElement | null>(null);
const contentRef = ref<InstanceType<typeof IonContent> | null>(null);
const highlightedAyat = ref<number | null>(null);

const fetchSurahDetail = async () => {
    const nomor = route.params.nomor;
    isLoading.value = true;
    hasError.value = false;
    try {
        const response = await api.get(`/master/quran/surah/${nomor}`);
        if (response.data.success) {
            surah.value = response.data.data;
            prevSurah.value = response.data.surat_sebelumnya || false;
            nextSurah.value = response.data.surat_selanjutnya || false;
        }
    } catch (error) {
        console.error('Gagal memuat detail surah:', error);
        hasError.value = true;
    } finally {
        isLoading.value = false;
        // Scroll ke ayat tertentu jika ada query param
        const targetAyat = route.query.ayat;
        if (targetAyat) {
            await nextTick();
            scrollToAyat(Number(targetAyat));
        }
    }
};

const scrollToAyat = (ayatNomor: number) => {
    setTimeout(() => {
        const el = document.getElementById(`ayat-${ayatNomor}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight animation
            highlightedAyat.value = ayatNomor;
            setTimeout(() => {
                highlightedAyat.value = null;
            }, 2500);
        }
    }, 300); // Delay agar DOM sudah ter-render
};

const toggleAudio = () => {
    if (!surah.value?.audio) return;

    if (!audioPlayer.value) {
        audioPlayer.value = new Audio(surah.value.audio);
        audioPlayer.value.addEventListener('ended', () => {
            isPlaying.value = false;
        });
    }

    if (isPlaying.value) {
        audioPlayer.value.pause();
    } else {
        audioPlayer.value.play();
    }
    isPlaying.value = !isPlaying.value;
};

const goToSurah = (nomor: number) => {
    // Stop audio dulu
    if (audioPlayer.value) {
        audioPlayer.value.pause();
        audioPlayer.value = null;
        isPlaying.value = false;
    }
    router.replace(`/quran/surah/${nomor}`);
    // Re-fetch data
    setTimeout(() => fetchSurahDetail(), 100);
};

const getBadgeColor = (tempat: string) => {
    return tempat === 'Mekah' || tempat === 'mekah' || tempat === 'Makkiyah'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-emerald-100 text-emerald-700';
};

const handleBookmark = (ayat: Ayat) => {
    if (!surah.value) return;
    const wasBookmarked = bookmarkStore.isBookmarked(surah.value.nomor, ayat.nomor);
    bookmarkStore.toggleBookmark({
        surahNomor: surah.value.nomor,
        surahNama: surah.value.nama,
        surahNamaLatin: surah.value.nama_latin,
        ayatNomor: ayat.nomor,
        ayatAr: ayat.ar,
        ayatIdn: ayat.idn,
    });
    toastMessage.value = wasBookmarked
        ? `Penanda ayat ${ayat.nomor} dihapus`
        : `Ayat ${ayat.nomor} ditandai`;
    showToast.value = true;
};

onMounted(() => {
    fetchSurahDetail();
});
</script>


<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar class="bg-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/quran/list" text="" :icon="arrowBack"
                        class="text-slate-700"></ion-back-button>
                </ion-buttons>
                <ion-title class="font-bold text-lg text-slate-900">
                    {{ surah?.nama_latin || "Memuat..." }}
                </ion-title>
                <ion-icon :icon="bookOutline" slot="end" class="me-5 text-2xl text-green-600"></ion-icon>
            </ion-toolbar>
        </ion-header>

        <ion-content ref="contentRef" :fullscreen="true" class="bg-gray-50 font-sans">

            <BackgroundTheme />

            <!-- Loading -->
            <div v-if="isLoading" class="relative z-10 flex flex-col items-center justify-center py-20">
                <ion-spinner name="crescent" color="primary" class="w-10 h-10"></ion-spinner>
                <div class="text-sm text-slate-400 mt-3 font-medium">Memuat surah...</div>
            </div>

            <!-- Error -->
            <div v-else-if="hasError"
                class="relative z-10 flex flex-col items-center justify-center py-20 px-6 text-center">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <ion-icon :icon="bookOutline" class="text-3xl text-red-300"></ion-icon>
                </div>
                <div class="text-lg font-bold text-slate-700 mb-1">Gagal Memuat Surah</div>
                <div class="text-sm text-slate-400 mb-4">Periksa koneksi internet Anda</div>
                <button @click="fetchSurahDetail"
                    class="bg-green-500 text-white font-bold !px-6 !py-2.5 !rounded-xl text-sm active:scale-95 transition-all">
                    Coba Lagi
                </button>
            </div>

            <!-- Content -->
            <div v-else-if="surah" class="relative z-10 px-4 py-3 pb-24 space-y-4">

                <!-- Surah Header Card -->
                <div
                    class="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
                    <div
                        class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2">
                    </div>
                    <div
                        class="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2">
                    </div>

                    <div class="relative z-10 text-center">
                        <!-- Nama Arab -->
                        <div class="text-4xl font-arabic mb-2 leading-relaxed" dir="rtl">{{ surah.nama }}</div>
                        <div class="text-lg font-bold">{{ surah.nama_latin }}</div>
                        <div class="text-white/70 text-sm mt-0.5">{{ surah.arti }}</div>

                        <div class="flex items-center justify-center gap-3 mt-3">
                            <span :class="[getBadgeColor(surah.tempat_turun),
                                'text-[10px] font-bold px-3 py-1 rounded-full']">
                                {{ surah.tempat_turun }}
                            </span>
                            <span class="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full">
                                {{ surah.jumlah_ayat }} Ayat
                            </span>
                        </div>

                        <!-- Audio Play Button -->
                        <button v-if="surah.audio" @click="toggleAudio"
                            class="mt-4 bg-white/20 backdrop-blur-sm !rounded-full !p-3 active:scale-90 transition-all mx-auto flex items-center justify-center">
                            <ion-icon :icon="isPlaying ? pauseOutline : playOutline"
                                class="text-xl text-white"></ion-icon>
                        </button>
                    </div>
                </div>

                <!-- Bismillah (except surah 1 and 9) -->
                <div v-if="surah.nomor !== 1 && surah.nomor !== 9"
                    class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
                    <div class="text-2xl font-arabic text-green-700 leading-loose" dir="rtl">
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                    </div>
                </div>

                <!-- Ayat List -->
                <div class="space-y-3">
                    <div v-for="ayat in surah.ayats" :key="ayat.id" :id="`ayat-${ayat.nomor}`"
                        class="bg-white rounded-2xl border shadow-sm p-4 transition-all duration-500" :class="highlightedAyat === ayat.nomor
                            ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-300/50'
                            : 'border-slate-100'">

                        <!-- Nomor Ayat Header -->
                        <div class="flex items-center justify-between">
                            <div class="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                                <span class="text-green-600 font-black text-xs">{{ ayat.nomor }}</span>
                            </div>
                            <button @click.stop="handleBookmark(ayat)"
                                class="w-9 h-9 rounded-xl flex items-center justify-center active:scale-90 transition-all"
                                :class="bookmarkStore.isBookmarked(surah!.nomor, ayat.nomor)
                                    ? 'bg-amber-50 text-amber-500'
                                    : 'bg-slate-50 text-slate-300 hover:text-slate-400'">
                                <ion-icon
                                    :icon="bookmarkStore.isBookmarked(surah!.nomor, ayat.nomor) ? bookmark : bookmarkOutline"
                                    class="text-lg"></ion-icon>
                            </button>
                        </div>

                        <div>
                            <!-- Teks Arab -->
                            <div class="text-right " dir="rtl">
                                <p class="text-2xl font-arabic text-slate-800 leading-[2.8] tracking-wide">
                                    {{ ayat.ar }}
                                </p>
                            </div>

                            <!-- Transliterasi -->
                            <div class="">
                                <div class="text-sm text-green-700 italic leading-relaxed font-medium" v-html="ayat.tr">
                                </div>
                            </div>

                            <!-- Terjemahan -->
                            <div class="border-t border-slate-50 pt-3">
                                <p class="text-sm text-slate-500 leading-relaxed">
                                    {{ ayat.idn }}
                                </p>
                            </div>
                        </div>


                    </div>
                </div>

                <!-- Navigation Between Surah -->
                <div class="flex gap-3 pt-2">
                    <button v-if="prevSurah" @click="goToSurah((prevSurah as NavSurah).nomor)"
                        class="flex-1 bg-white border border-slate-200 !rounded-2xl !p-4 flex items-center gap-2 active:scale-[0.98] transition-all">
                        <ion-icon :icon="chevronBack" class="text-slate-400"></ion-icon>
                        <div class="text-left">
                            <div class="text-[10px] text-slate-400 font-bold">Sebelumnya</div>
                            <div class="text-sm font-bold text-slate-700">{{ (prevSurah as NavSurah).nama_latin }}</div>
                        </div>
                    </button>

                    <button v-if="nextSurah" @click="goToSurah((nextSurah as NavSurah).nomor)"
                        class="flex-1 bg-white border border-slate-200 !rounded-2xl !p-4 flex items-center gap-2 justify-end active:scale-[0.98] transition-all">
                        <div class="text-right">
                            <div class="text-[10px] text-slate-400 font-bold">Selanjutnya</div>
                            <div class="text-sm font-bold text-slate-700">{{ (nextSurah as NavSurah).nama_latin }}</div>
                        </div>
                        <ion-icon :icon="chevronForward" class="text-slate-400"></ion-icon>
                    </button>
                </div>

            </div>

            <ion-toast :is-open="showToast" :message="toastMessage" :duration="1500" position="bottom"
                @didDismiss="showToast = false" color="success"></ion-toast>
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
</style>
