<script setup lang="ts">
import BackgroundTheme from '@/components/BackgroundTheme.vue';
import { useIndonesianDate } from '@/composables/useIndonesianFormat';
import router from '@/router';
import { IonContent, IonDatetime, IonIcon, IonModal, IonPage } from '@ionic/vue';
import { 
  bookOutline, 
  calendarClearOutline, 
  chevronBack, 
  timeOutline, 
  cafeOutline, 
  schoolOutline 
} from 'ionicons/icons';
import { ref } from 'vue';

// --- 1. Data Event Khusus (Libur & Ujian) ---
const specialEvents = [
    { date: '2026-02-11', type: 'holiday', title: 'Hari Raya Nyepi', desc: 'Libur Nasional', time: 'Seharian' },
    { date: '2026-02-12', type: 'holiday', title: 'Cuti Bersama Nyepi', desc: 'Libur Cuti Bersama', time: 'Seharian' },
    { date: '2026-02-28', type: 'holiday', title: 'Isra Mi\'raj', desc: 'Libur Nasional', time: 'Seharian' },
];

// --- 2. Data Jadwal Harian Spesifik (DAILY ROSTER) ---
// Key menggunakan format 'YYYY-MM-DD'
// Ini memungkinkan jadwal berbeda setiap harinya
const dailyRoster: Record<string, any[]> = {
  // Contoh: Senin Biasa
  '2026-02-16': [ 
    { subject: 'Upacara Bendera', time: '07:00 - 08:00', type: 'activity' },
    { subject: 'Matematika', time: '08:00 - 09:00', type: 'class' },
    { subject: 'Bahasa Indonesia', time: '09:30 - 11:00', type: 'class' },
    { subject: 'PKN', time: '11:00 - 12:00', type: 'class' },
    { subject: 'Sejarah', time: '13:00 - 14:30', type: 'class' },
  ],
  // Contoh: Selasa (Ada perubahan jadwal mendadak / Guru Rapat)
  '2026-02-17': [ 
    { subject: 'Olahraga (PJOK)', time: '07:00 - 09:00', type: 'class' },
    { subject: 'Tugas Mandiri (Guru Rapat)', time: '09:30 - 11:00', type: 'activity' }, // Beda dari minggu biasa
    { subject: 'IPA (Biologi)', time: '11:00 - 12:00', type: 'class' },
    { subject: 'Seni Budaya', time: '13:00 - 14:30', type: 'class' },
  ],
  // Contoh: Rabu
  '2026-02-18': [
    { subject: 'Bahasa Inggris', time: '07:00 - 09:00', type: 'class' },
    { subject: 'Matematika', time: '09:30 - 11:00', type: 'class' },
    { subject: 'Prakarya', time: '11:00 - 12:00', type: 'class' },
    { subject: 'IPS', time: '13:00 - 14:30', type: 'class' },
  ],
  // Contoh: Kamis
  '2026-02-19': [
    { subject: 'Agama Islam', time: '07:00 - 09:00', type: 'class' },
    { subject: 'Bahasa Indonesia', time: '09:30 - 11:00', type: 'class' },
    { subject: 'Informatika', time: '11:00 - 12:00', type: 'class' },
    { subject: 'Bimbingan Konseling', time: '13:00 - 14:00', type: 'class' },
  ],
  // Contoh: Jumat
  '2026-02-20': [
    { subject: 'Senam Pagi', time: '06:30 - 07:30', type: 'activity' },
    { subject: 'Bahasa Sunda', time: '07:30 - 09:00', type: 'class' },
    { subject: 'IPA', time: '09:30 - 11:00', type: 'class' },
    { subject: 'Sholat Jumat', time: '11:30 - 12:30', type: 'activity' },
  ]
};

// --- State Management ---
const isModalOpen = ref(false);
const selectedDateIso = ref('');
const dailySchedule = ref<any[]>([]);

// --- 3. Logic: Generate Jadwal (Cari berdasarkan Tanggal Spesifik) ---
const getDailySchedule = (dateStr: string) => {
  const dateObj = new Date(dateStr);
  const dayOfWeek = dateObj.getDay(); // 0 = Minggu, 5 = Jumat

  // A. Cek Event Khusus (Libur) - Prioritas Tertinggi
  const specialEvent = specialEvents.find(e => e.date === dateStr);
  if (specialEvent) {
    return [specialEvent];
  }

  // B. Ambil Jadwal dari DAILY ROSTER berdasarkan Key Tanggal (YYYY-MM-DD)
  // Jika tidak ada data di tanggal tersebut, kembalikan array kosong
  const todaysClasses = dailyRoster[dateStr] || [];

  // Jika kosong (misal hari Sabtu/Minggu atau tanggal belum diinput admin)
  if (todaysClasses.length === 0) {
      return [];
  }
  
  // C. Sisipkan Istirahat Secara Otomatis
  let fullSchedule = [];
  fullSchedule.push(...todaysClasses); // Masukkan data mapel

  // Logic Istirahat: Jumat cuma 1x, Senin-Kamis 2x
  if (dayOfWeek === 5) {
     // Khusus Jumat
     fullSchedule.push({ subject: 'Istirahat Pagi', time: '09:00 - 09:30', type: 'break', icon: cafeOutline });
  } else if (dayOfWeek >= 1 && dayOfWeek <= 4) {
     // Senin - Kamis
     fullSchedule.push({ subject: 'Istirahat Pagi', time: '09:00 - 09:30', type: 'break', icon: cafeOutline });
     fullSchedule.push({ subject: 'Istirahat Siang', time: '12:00 - 13:00', type: 'break', icon: cafeOutline });
  }

  // D. Urutkan berdasarkan jam mulai
  fullSchedule.sort((a, b) => a.time.localeCompare(b.time));

  return fullSchedule;
};

// --- 4. Logic: Highlight Calendar ---
const highlightedDates = (isoString: string) => {
    const dateStr = isoString.split('T')[0];
    
    // 1. Cek Libur Khusus
    const event = specialEvents.find(e => e.date === dateStr);
    if (event) {
        if (event.type === 'holiday') {
            return {
                textColor: '#e11d48', backgroundColor: '#ffe4e6', border: '1px solid #fecdd3',
            };
        }
    }

    // 2. Cek Apakah Ada Jadwal di Daily Roster?
    // Jika ada key tanggalnya di dailyRoster, beri tanda titik/warna
    if (dailyRoster[dateStr]) {
        return {
             textColor: '#0f172a', // Slate-900
             backgroundColor: '#f1f5f9', // Slate-100
        };
    }

    return undefined;
};

// --- 5. Handle Klik Tanggal ---
const onDateSelected = (e: CustomEvent) => {
    const fullIso = e.detail.value;
    if (!fullIso) return;

    const dateStr = (Array.isArray(fullIso) ? fullIso[0] : fullIso).split('T')[0];
    selectedDateIso.value = fullIso;

    // Generate Data
    dailySchedule.value = getDailySchedule(dateStr);

    isModalOpen.value = true;
};

// Composable Format Tanggal
const { formattedDate } = useIndonesianDate(selectedDateIso);
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">
            <BackgroundTheme />

            <div class="relative z-10 px-6 pt-8 pb-2">
                <div class="flex justify-between mb-6">
                    <button @click="router.back()"
                        class="bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full !shadow-sm text-gray-700 !border !border-gray-100 active:scale-95 transition-transform">
                        <ion-icon :icon="chevronBack" class="text-xl"></ion-icon>
                    </button>
                    <div class="text-center">
                        <div class="font-black text-slate-800 tracking-tight">Jadwal Harian</div>
                        <div class="text-slate-500 text-xs font-bold uppercase tracking-wider">Kelas 7A</div>
                    </div>
                    <button
                        class="bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full !shadow-sm text-gray-700 !border !border-gray-100 active:scale-95 transition-transform">
                        <ion-icon :icon="bookOutline" class="text-xl"></ion-icon>
                    </button>
                </div>

                <div class="relative z-10">
                    <div
                        class="bg-white/60 backdrop-blur-xl rounded-[32px] p-4 border border-white shadow-xl shadow-slate-200/50 animate-fade-in-up">
                        <ion-datetime presentation="date" locale="id-ID" size="cover"
                            :highlighted-dates="highlightedDates" @ionChange="onDateSelected"
                            class="custom-calendar"></ion-datetime>
                    </div>

                    <div class="mt-6 flex justify-center gap-6 animate-fade-in">
                        <div class="flex items-center gap-2">
                            <div class="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-400"></div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase">Sekolah</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2.5 h-2.5 rounded-full bg-rose-200 border border-rose-400"></div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase">Libur</span>
                        </div>
                    </div>
                </div>

                <ion-modal :is-open="isModalOpen" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.85]"
                    @didDismiss="isModalOpen = false" class="custom-modal">
                    
                    <div class="p-6 h-full bg-slate-50 relative overflow-y-auto">
                        <div class="absolute top-[-10%] right-[-10%] w-40 h-40 bg-blue-200/40 rounded-full blur-2xl pointer-events-none"></div>

                        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>

                        <div class="mb-6 border-b border-slate-200 pb-4">
                            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Jadwal Tanggal</div>
                            <div class="text-xl font-black text-slate-800">{{ formattedDate }}</div>
                        </div>

                        <div v-if="dailySchedule.length > 0" class="space-y-3 pb-10 relative">
                            <div class="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-200 rounded-full z-0"></div>

                            <div v-for="(item, index) in dailySchedule" :key="index" class="relative z-10">
                                
                                <div v-if="item.type === 'break'" 
                                     class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-full bg-amber-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                                        <ion-icon :icon="item.icon" class="text-amber-500 text-lg"></ion-icon>
                                    </div>
                                    <div class="bg-amber-50/80 border border-amber-100 rounded-xl p-3 flex-1 flex justify-between items-center">
                                        <span class="text-sm font-bold text-amber-700">{{ item.subject }}</span>
                                        <span class="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">{{ item.time }}</span>
                                    </div>
                                </div>

                                <div v-else-if="item.type === 'holiday'" 
                                     class="flex items-start gap-4">
                                    <div class="w-10 h-10 rounded-full bg-rose-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                                        <ion-icon :icon="calendarClearOutline" class="text-rose-500 text-lg"></ion-icon>
                                    </div>
                                    <div class="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex-1">
                                        <div class="font-bold text-rose-700 text-lg">{{ item.title }}</div>
                                        <div class="text-rose-500 text-sm mt-1">{{ item.desc }}</div>
                                    </div>
                                </div>

                                <div v-else 
                                     class="flex items-start gap-4 group">
                                     <div class="w-10 h-10 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-blue-300 transition-colors z-10">
                                        <ion-icon :icon="item.type === 'activity' ? timeOutline : schoolOutline" class="text-slate-400 group-hover:text-blue-500"></ion-icon>
                                    </div>
                                    
                                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex-1 hover:border-blue-200 transition-colors relative overflow-hidden">
                                        <div class="absolute left-0 top-0 bottom-0 w-1" :class="item.type === 'activity' ? 'bg-indigo-400' : 'bg-blue-400'"></div>
                                        
                                        <div class="pl-2">
                                            <div class="flex justify-between items-start mb-1">
                                                <div class="font-bold text-slate-800 text-sm">{{ item.subject }}</div>
                                                <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{{ item.time }}</span>
                                            </div>
                                            <div class="text-[11px] text-slate-400">Guru: S.Pd (Wali Kelas)</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div v-else class="flex flex-col items-center justify-center py-12 text-center opacity-70">
                            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <ion-icon :icon="calendarClearOutline" class="text-3xl text-slate-300"></ion-icon>
                            </div>
                            <div class="font-bold text-slate-600">Tidak Ada Jadwal</div>
                            <div class="text-slate-400 text-sm mt-1">Belum ada kegiatan/pelajaran terdaftar<br>untuk tanggal ini.</div>
                        </div>

                    </div>
                </ion-modal>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
ion-datetime.custom-calendar {
    --background: transparent;
    --background-rgb: 0, 0, 0, 0;
    --wheel-highlight-background: transparent;
    --wheel-fade-background-rgb: transparent;
    margin: 0 auto;
    width: 100%;
}

ion-modal.custom-modal {
    --border-radius: 24px;
}
</style>