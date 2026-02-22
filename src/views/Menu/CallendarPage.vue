<script setup lang="ts">
import BackgroundTheme from '@/components/BackgroundTheme.vue';
import { useIndonesianDate } from '@/composables/useIndonesianFormat';
import router from '@/router';
import { IonContent, IonDatetime, IonIcon, IonModal, IonPage } from '@ionic/vue';
import { arrowBack, calendarClearOutline, calendarOutline, timeOutline } from 'ionicons/icons';
import { ref } from 'vue';

// --- 1. Data Event (Simulasi Database) ---
// Format date: YYYY-MM-DD
const eventsDatabase = [
    {
        date: '2026-02-11',
        type: 'holiday', title: 'Hari Raya Nyepi', desc: 'Libur Nasional Tahun Baru Saka 1946', time: 'Seharian'
    },
    {
        date: '2026-02-12',
        type: 'holiday', title: 'Cuti Bersama Nyepi', desc: 'Libur Cuti Bersama Pemerintah', time: 'Seharian'
    },
    {
        date: '2026-02-13',
        type: 'exam', title: 'Ujian Tengah Semester', desc: 'Mata Kuliah Algoritma & Struktur Data', time: '08:00 - 10:00'
    },
    {
        date: '2026-02-14',
        type: 'exam', title: 'Ujian Tengah Semester', desc: 'Mata Kuliah Algoritma & Struktur Data', time: '08:00 - 10:00'
    },
    {
        date: '2026-02-14',
        type: 'activity', title: 'Ujian Tengah Semester 2', desc: 'Mata Kuliah Algoritma & Struktur Data', time: ''
    },
    {
        date: '2026-02-18',
        type: 'exam', title: 'Ujian Tengah Semester', desc: 'Mata Kuliah Algoritma & Struktur Data', time: '08:00 - 10:00'
    },
    {
        date: '2026-02-20',
        type: 'exam', title: 'Ujian Tengah Semester', desc: 'Mata Kuliah Basis Data Lanjut', time: '13:00 - 15:00'
    },
    {
        date: '2026-02-25',
        type: 'activity', title: 'Seminar Teknologi', desc: 'Webinar tentang AI di Aula Utama', time: '09:00 - 12:00'
    },
    {
        date: '2026-02-29',
        type: 'holiday', title: 'Wafat Isa Al Masih', desc: 'Libur Nasional', time: 'Seharian'
    },
];

// --- 2. State Management ---
const isModalOpen = ref(false);
const selectedDateIso = ref('');
const selectedEvents = ref<any[]>([]);

// --- 3. Logic: Highlight Calendar ---
const highlightedDates = (isoString: string) => {
    const dateStr = isoString.split('T')[0]; // Ambil YYYY-MM-DD
    const event = eventsDatabase.find(e => e.date === dateStr);

    if (event) {
        // Tentukan warna berdasarkan tipe event
        if (event.type === 'holiday') {
            return {
                textColor: '#e11d48', // Rose-600
                backgroundColor: '#ffe4e6', // Rose-100
                border: '1px solid #fecdd3',
            };
        }
        if (event.type === 'exam') {
            return {
                textColor: '#4f46e5', // Indigo-600
                backgroundColor: '#e0e7ff', // Indigo-100
                border: '1px solid #c7d2fe',
            };
        }
        if (event.type === 'activity') {
            return {
                textColor: '#059669', // Emerald-600
                backgroundColor: '#d1fae5', // Emerald-100
                border: '1px solid #a7f3d0',
            };
        }
    }
    return undefined;
};

// --- 4. Logic: Handle Klik Tanggal ---
const onDateSelected = (e: CustomEvent) => {
    const fullIso = e.detail.value;
    if (!fullIso) return;

    // Format string YYYY-MM-DD (kadang Ionic return array jika multiple selection, kita ambil string pertama)
    const dateStr = (Array.isArray(fullIso) ? fullIso[0] : fullIso).split('T')[0];

    selectedDateIso.value = fullIso;

    // Filter event yang cocok dengan tanggal ini
    selectedEvents.value = eventsDatabase.filter(ev => ev.date === dateStr);

    // Buka Modal
    isModalOpen.value = true;
};

// --- 5. Helper: Format Tanggal Cantik (Indonesia) ---
const { formattedDate } = useIndonesianDate(selectedDateIso);

</script>


<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <BackgroundTheme />

            <div class="relative z-10 px-6 pt-8 pb-2">
                <div class="flex justify-between items-center mb-6">
                    <button @click="router.back()"
                        class="bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full !shadow-sm text-gray-700 !border !border-gray-100 active:scale-95 transition-transform">
                        <ion-icon :icon="arrowBack" class="text-xl"></ion-icon>
                    </button>
                    <div>
                        <div class="font-black text-slate-800 tracking-tight">Kalender Akademik</div>
                        <div class="text-slate-500 text-sm font-medium">2024/2025</div>
                    </div>
                    <button
                        class="bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full !shadow-sm text-gray-700 !border !border-gray-100 active:scale-95 transition-transform">
                        <ion-icon :icon="calendarOutline" class="text-xl"></ion-icon>
                    </button>
                </div>
                <div class="relative z-10">
                    <div
                        class="bg-white/60 backdrop-blur-xl rounded-[32px] p-4 border border-white shadow-xl shadow-slate-200/50 animate-fade-in-up">
                        <ion-datetime presentation="date" locale="id-ID" size="cover"
                            :highlighted-dates="highlightedDates" @ionChange="onDateSelected"
                            class="custom-calendar"></ion-datetime>
                    </div>

                    <div class="mt-8 grid grid-cols-2 gap-4 animate-fade-in">
                        <div class="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-white/50">
                            <div class="w-3 h-3 rounded-full bg-rose-400 shadow-sm ring-2 ring-rose-200"></div>
                            <span class="text-xs font-bold text-slate-600">Hari Libur</span>
                        </div>
                        <div class="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-white/50">
                            <div class="w-3 h-3 rounded-full bg-indigo-500 shadow-sm ring-2 ring-indigo-200"></div>
                            <span class="text-xs font-bold text-slate-600">Ujian/Akademik</span>
                        </div>
                        <div class="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-white/50">
                            <div class="w-3 h-3 rounded-full bg-emerald-400 shadow-sm ring-2 ring-emerald-200"></div>
                            <span class="text-xs font-bold text-slate-600">Kegiatan Siswa</span>
                        </div>
                    </div>
                </div>

                <ion-modal :is-open="isModalOpen" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]"
                    @didDismiss="isModalOpen = false" class="custom-modal">
                    <div class="p-6 h-full bg-slate-50 relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -z-10">
                        </div>

                        <div class="mb-2">
                            <div class="text-xl font-bold text-slate-800">{{ formattedDate }}</div>
                        </div>

                        <div v-if="selectedEvents.length > 0" class="space-y-4">
                            <div v-for="(event, index) in selectedEvents" :key="index"
                                class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                                <div class="w-1.5 self-stretch rounded-full" :class="{
                                    'bg-rose-400': event.type === 'holiday',
                                    'bg-indigo-500': event.type === 'exam',
                                    'bg-emerald-400': event.type === 'activity'
                                }"></div>

                                <div>
                                    <div class="font-bold text-slate-800">{{ event.title }}</div>
                                    <div class="text-slate-500 text-xs mt-1 leading-relaxed">{{ event.desc }}</div>
                                    <div class="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100">
                                        <ion-icon :icon="timeOutline" class="text-xs text-slate-400"></ion-icon>
                                        <span class="text-[10px] font-bold text-slate-500">{{ event.time }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="flex flex-col items-center justify-center py-10 text-center opacity-60">
                            <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                                <ion-icon :icon="calendarClearOutline" class="text-3xl text-slate-400"></ion-icon>
                            </div>
                            <div class="text-slate-500 font-medium">Tidak ada kegiatan akademik <br>pada tanggal ini.
                            </div>
                        </div>
                    </div>
                </ion-modal>

            </div>

        </ion-content>
    </ion-page>
</template>

<style scoped>
/* CSS Hack untuk membuat Ionic Datetime Transparan/Glassy */
ion-datetime.custom-calendar {
    --background: transparent;
    --background-rgb: 0, 0, 0, 0;

    /* Menyesuaikan warna teks default */
    --wheel-highlight-background: transparent;
    --wheel-fade-background-rgb: transparent;

    margin: 0 auto;
    width: 100%;
}

/* Mengatur corner modal agar rounded besar seperti iOS */
ion-modal.custom-modal {
    --border-radius: 24px;
}
</style>