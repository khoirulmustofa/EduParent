<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <div class="fixed inset-0 bg-gradient-to-br from-blue-200 via-white to-cyan-100 pointer-events-none z-0">
            </div>

            <div class="relative z-10 px-6 pt-8 pb-2">
                <div class="flex justify-between items-center mb-6">
                    <button @click="router.back()"
                        class="bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full !shadow-sm text-gray-700 !border !border-gray-100 active:scale-95 transition-transform">
                        <ion-icon :icon="chevronBack" class="text-xl"></ion-icon>
                    </button>
                    <div class="text-lg font-bold text-gray-800">Class Schedule</div>
                    <button
                        class="bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full !shadow-sm text-gray-700 !border !border-gray-100 active:scale-95 transition-transform">
                        <ion-icon :icon="calendarOutline" class="text-xl"></ion-icon>
                    </button>
                </div>

                <div ref="scrollContainer"
                    class="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-x-auto no-scrollbar scroll-smooth relative">
                    <div v-for="(day, index) in weekDays" :key="index" :id="'date-' + day.id"
                        @click="selectDate(day.date)"
                        class="flex flex-col items-center min-w-[60px] cursor-pointer transition-all duration-300 mx-1 px-2 py-3"
                        :class="{
                            'bg-green-500 text-white rounded-2xl shadow-lg shadow-green-200 transform scale-105 z-10': isSelected(day.date),
                            'text-gray-600 hover:bg-gray-50 rounded-xl': !isSelected(day.date)
                        }">
                        <span class="text-[10px] font-bold uppercase tracking-wider mb-1"
                            :class="isSelected(day.date) ? 'text-white' : 'text-gray-400'">
                            {{ day.name }}
                        </span>
                        <span class="text-lg font-black">
                            {{ day.number }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center justify-between mb-4">
                    <div class="text-xl font-bold text-gray-900">Today's Sessions</div>
                    <span class="text-xs font-bold text-[#5F33E1] bg-purple-50 px-3 py-1 !rounded-full">5
                        Sessions</span>
                </div>
            </div>

            <div class="relative z-10 px-6 pb-5 space-y-4">

                <div
                    class="bg-white !p-4 !rounded-3xl !border !border-gray-100 !shadow-lg !shadow-green-200 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-green-50 !rounded-bl-[4rem] -mr-8 -mt-8 z-0"></div>
                    <div class="relative z-10 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span
                                    class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1 block">Session
                                    1</span>
                                <div class="font-bold text-gray-800 text-lg">Mathematics</div>
                                <div class="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                                    <ion-icon :icon="timeOutline" class="text-[#5F33E1]"></ion-icon>
                                    <span>07:00 - 08:30</span>
                                </div>
                            </div>
                            <div class="bg-green-100 text-green-600 text-[10px] font-bold px-2.5 py-1 !rounded-lg">
                                PRESENT
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1 border-t border-gray-50 mt-1">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            <span>Room 101 • Mr. Anderson</span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white !p-4 !rounded-3xl !border !border-gray-100 !shadow-lg !shadow-green-200 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-green-50 !rounded-bl-[4rem] -mr-8 -mt-8 z-0"></div>
                    <div class="relative z-10 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span
                                    class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1 block">Session
                                    2</span>
                                <div class="font-bold text-gray-800 text-lg">Physics Lab</div>
                                <div class="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                                    <ion-icon :icon="timeOutline" class="text-[#5F33E1]"></ion-icon>
                                    <span>08:45 - 10:15</span>
                                </div>
                            </div>
                            <div class="bg-green-100 text-green-600 text-[10px] font-bold px-2.5 py-1 !rounded-lg">
                                PRESENT
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1 border-t border-gray-50 mt-1">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            <span>Lab A • Mrs. Sarah</span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white !p-4 !rounded-3xl !border !border-gray-100 !shadow-lg !shadow-green-200 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-orange-50 !rounded-bl-[4rem] -mr-8 -mt-8 z-0"></div>
                    <div class="relative z-10 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span
                                    class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1 block">Session
                                    3</span>
                                <div class="font-bold text-gray-800 text-lg">History</div>
                                <div class="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                                    <ion-icon :icon="timeOutline" class="text-[#5F33E1]"></ion-icon>
                                    <span>10:45 - 12:15</span>
                                </div>
                            </div>
                            <div class="bg-orange-100 text-orange-600 text-[10px] font-bold px-2.5 py-1 !rounded-lg">
                                LATE (15m)
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1 border-t border-gray-50 mt-1">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            <span>Room 204 • Mr. David</span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white !p-4 !rounded-3xl !border !border-gray-100 !shadow-lg !shadow-green-200 relative overflow-hidden opacity-80">
                    <div class="relative z-10 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span
                                    class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1 block">Session
                                    5</span>
                                <div class="font-bold text-gray-800 text-lg">English Lit</div>
                                <div class="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                                    <ion-icon :icon="timeOutline" class="text-[#5F33E1]"></ion-icon>
                                    <span>14:45 - 16:15</span>
                                </div>
                            </div>
                            <div class="bg-gray-100 text-gray-400 text-[10px] font-bold px-2.5 py-1 !rounded-lg">
                                UPCOMING
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1 border-t border-gray-50 mt-1">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            <span>Room 305 • Ms. Watson</span>
                        </div>
                    </div>
                </div>

            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import {
    chevronBack,
    calendarOutline,
    timeOutline,
    locationOutline
} from 'ionicons/icons';
import { nextTick, onMounted, ref } from 'vue';

const router = useRouter();

const selectedDate = ref(new Date());
const weekDays = ref<any[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);

const generateWeek = () => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 7 hari ke belakang, hari ini, 7 hari ke depan
  for (let i = -7; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    date.setHours(0, 0, 0, 0);

    days.push({
      id: date.getTime(),
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      number: date.getDate(),
      date: date
    });
  }
  weekDays.value = days;
};

const isSelected = (date: Date) => {
  return date.toDateString() === selectedDate.value.toDateString();
};

const centerActiveDate = (date: Date) => {
  const dateId = date.setHours(0, 0, 0, 0);
  const element = document.getElementById('date-' + dateId);
  
  if (element && scrollContainer.value) {
    const container = scrollContainer.value;
    const offset = element.offsetLeft - (container.clientWidth / 2) + (element.clientWidth / 2);
    
    container.scrollTo({
      left: offset,
      behavior: 'smooth'
    });
  }
};

const selectDate = (date: Date) => {
  selectedDate.value = date;
  centerActiveDate(date);
};

onMounted(async () => {
  generateWeek();
  
  // Tunggu DOM selesai render
  await nextTick();
  
  // Gunakan sedikit delay agar offsetLeft terbaca dengan benar setelah layouting selesai
  setTimeout(() => {
    centerActiveDate(selectedDate.value);
  }, 100);
});
</script>

<style scoped>
/* Utility untuk menyembunyikan scrollbar tapi tetap bisa discroll */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>