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

            <div class="relative z-10 px-5 py-5 flex justify-between items-center">

                <div class="text-xl font-bold text-gray-800">Menu</div>
                <button
                    class="!bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full shadow-sm text-gray-700 !border !border-gray-100 !active:scale-95 !transition-transform">
                    <ion-icon :icon="gridOutline" class="text-xl"></ion-icon>
                </button>
            </div>

            <div class="relative z-10 px-5 pb-24">

                <div class="mb-4">
                    <div class="text-gray-500 text-md">Pilih menu yang ingin diakses</div>
                </div>

                <div class="grid grid-cols-3 gap-3">

                    <div @click="router.push('/menu/callendar')"
                        class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
                        <div
                            class="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <ion-icon :icon="calendarOutline" class="text-xl"></ion-icon>
                        </div>
                        <div class="text-center">
                            <div class="font-bold text-gray-700 !text-sm leading-tight">Kalender<br>Akademik</div>
                        </div>
                    </div>

                    <div @click="router.push('/menu/lesson-schedule')"
                        class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
                        <div
                            class="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <ion-icon :icon="bookOutline" class="text-xl"></ion-icon>
                        </div>
                        <div class="text-center">
                            <div class="font-bold text-gray-700 !text-sm leading-tight">Jadwal<br>Pelajaran</div>
                        </div>
                    </div>

                    <div
                        class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
                        <div
                            class="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <ion-icon :icon="libraryOutline" class="text-xl"></ion-icon>
                        </div>
                        <div class="text-center">
                            <div class="font-bold text-gray-700 !text-sm leading-tight">Kunjungan<br>Perpustakaan</div>
                        </div>
                    </div>

                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonPage } from '@ionic/vue';
import {
    basketballOutline,
    bookOutline,
    calendarNumberOutline,
    calendarOutline,
    gridOutline,
    libraryOutline,
    schoolOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>