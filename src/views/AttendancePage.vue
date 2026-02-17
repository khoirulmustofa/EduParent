<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

       <div class="fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-cyan-100 pointer-events-none z-0">
            </div>

      <div class="relative z-10 px-5 flex justify-between items-center">
        
        <h1 class="text-lg font-bold text-gray-800">Attendance</h1>
        <div class="w-10"></div>
      </div>

      <div class="relative z-10 px-5 pb-24">

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Select Category</h2>
          <p class="text-gray-500 text-sm">Choose the type of attendance to record</p>
        </div>

        <div class="grid grid-cols-3 gap-3">

          <div @click="router.push('/attendance/kbm')"
            class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
            <div
              class="w-12 h-12 rounded-2xl bg-purple-50 text-[#5F33E1] flex items-center justify-center shadow-sm group-hover:bg-[#5F33E1] group-hover:text-white transition-colors">
              <ion-icon :icon="schoolOutline" class="text-xl"></ion-icon>
            </div>
            <div class="text-center">
              <h3 class="font-bold text-gray-700 !text-sm leading-tight">Class<br>Sessions</h3>
            </div>
          </div>

          <div
            class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
            <div
              class="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <ion-icon :icon="basketballOutline" class="text-xl"></ion-icon>
            </div>
            <div class="text-center">
              <h3 class="font-bold text-gray-700 !text-sm leading-tight">Extra<br>Curricular</h3>
            </div>
          </div>

          <div
            class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
            <div
              class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <ion-icon :icon="libraryOutline" class="text-xl"></ion-icon>
            </div>
            <div class="text-center">
              <h3 class="font-bold text-gray-700 !text-sm leading-tight">Library<br>Visit</h3>
            </div>
          </div>

          <div
            class="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group h-full">
            <div
              class="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-colors">
              <ion-icon :icon="calendarNumberOutline" class="text-xl"></ion-icon>
            </div>
            <div class="text-center">
              <h3 class="font-bold text-gray-700 !text-sm leading-tight">Special<br>Events</h3>
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
  chevronForward,
  schoolOutline,
  basketballOutline,
  libraryOutline,
  calendarNumberOutline
} from 'ionicons/icons';

const router = useRouter();
</script>