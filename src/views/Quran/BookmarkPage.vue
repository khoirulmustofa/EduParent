<script setup lang="ts">
import BackgroundTheme from '@/components/BackgroundTheme.vue';
import { useBookmarkStore, type BookmarkItem } from '@/stores/bookmarkStore';
import {
    IonContent, IonPage, IonHeader, IonToolbar,
    IonTitle, IonIcon, alertController
} from '@ionic/vue';
import {
    bookmarkOutline, bookmark, trashOutline, bookOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();
const bookmarkStore = useBookmarkStore();

const goToAyat = (item: BookmarkItem) => {
    router.push({
        path: `/quran/surah/${item.surahNomor}`,
        query: { ayat: item.ayatNomor },
    });
};

const confirmDelete = async (item: BookmarkItem) => {
    const alert = await alertController.create({
        header: 'Hapus Penanda',
        message: `Apakah Anda yakin ingin menghapus penanda ${item.surahNamaLatin} Ayat ${item.ayatNomor}?`,
        cssClass: 'custom-alert',
        buttons: [
            {
                text: 'Batal',
                role: 'cancel',
                cssClass: 'alert-button-cancel',
            },
            {
                text: 'Hapus',
                role: 'destructive',
                cssClass: 'alert-button-delete',
                handler: () => {
                    bookmarkStore.removeBookmark(item.id);
                },
            },
        ],
    });
    await alert.present();
};

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
</script>


<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar class="bg-white">
                <ion-title class="font-bold text-lg text-slate-900 ml-5" slot="start">Penanda</ion-title>
                <ion-icon :icon="bookmark" class="text-amber-500 mr-5 text-2xl" slot="end"></ion-icon>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <BackgroundTheme />

            <div class="relative z-10 px-4 py-3 pb-24 space-y-4">

                <!-- Header Info -->
                <div
                    class="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-2xl p-5 text-white shadow-xl shadow-amber-500/20 relative overflow-hidden">
                    <div
                        class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2">
                    </div>
                    <div
                        class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-2">
                            <div
                                class="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <ion-icon :icon="bookmark" class="text-2xl text-white"></ion-icon>
                            </div>
                            <div>
                                <div class="text-lg font-bold">Ayat yang Ditandai</div>
                                <div class="text-white/70 text-xs">Koleksi ayat favorit Anda</div>
                            </div>
                        </div>
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-bold inline-block mt-1">
                            {{ bookmarkStore.totalBookmarks }} Penanda
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="bookmarkStore.bookmarks.length === 0"
                    class="flex flex-col items-center justify-center py-16 text-center">
                    <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <ion-icon :icon="bookmarkOutline" class="text-4xl text-slate-300"></ion-icon>
                    </div>
                    <div class="text-lg font-bold text-slate-700 mb-1">Belum Ada Penanda</div>
                    <div class="text-sm text-slate-400 max-w-[250px]">
                        Tandai ayat favorit Anda saat membaca Al-Qur'an agar mudah ditemukan kembali
                    </div>
                    <button @click="router.push('/quran/list')"
                        class="mt-6 bg-green-500 text-white font-bold !px-6 !py-2.5 !rounded-xl text-sm active:scale-95 transition-all flex items-center gap-2">
                        <ion-icon :icon="bookOutline" class="text-lg"></ion-icon>
                        Buka Al-Qur'an
                    </button>
                </div>

                <!-- Bookmark List -->
                <div v-else class="space-y-3">
                    <div v-for="item in bookmarkStore.bookmarks" :key="item.id"
                        class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden active:scale-[0.98] transition-all cursor-pointer group">

                        <!-- Card Content (clickable → navigate to surah) -->
                        <div @click="goToAyat(item)" class="p-4">
                            <div class="flex items-start gap-3">

                                <!-- Surah Number Badge -->
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/20">
                                        <span class="text-white font-black text-xs">{{ item.surahNomor }}</span>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="flex-grow min-w-0">
                                    <div class="flex items-center gap-2 mb-1">
                                        <div class="font-bold text-slate-800 text-sm">{{ item.surahNamaLatin }}</div>
                                        <span
                                            class="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                            Ayat {{ item.ayatNomor }}
                                        </span>
                                    </div>

                                    <!-- Arabic text preview -->
                                    <div class="text-right mb-2" dir="rtl">
                                        <p class="text-base font-arabic text-slate-700 leading-relaxed line-clamp-1">
                                            {{ item.ayatAr }}
                                        </p>
                                    </div>

                                    <!-- Indonesian translation preview -->
                                    <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">
                                        {{ item.ayatIdn }}
                                    </p>

                                    <!-- Timestamp -->
                                    <div class="text-[10px] text-slate-300 mt-2 font-medium">
                                        {{ formatDate(item.createdAt) }}
                                    </div>
                                </div>

                                <!-- Arabic Surah Name -->
                                <div class="flex-shrink-0">
                                    <div class="text-lg font-arabic text-green-600" dir="rtl">{{ item.surahNama }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Delete Button -->
                        <div class="border-t border-slate-50 px-4 py-2.5 flex justify-end">
                            <button @click.stop="confirmDelete(item)"
                                class="flex items-center gap-1.5 text-red-400 hover:text-red-500 active:scale-95 transition-all !px-3 !py-1.5 !rounded-lg hover:bg-red-50">
                                <ion-icon :icon="trashOutline" class="text-sm"></ion-icon>
                                <span class="text-xs font-bold">Hapus</span>
                            </button>
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

.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
