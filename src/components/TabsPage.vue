<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar 
        slot="bottom" 
        class="rounded-t-3xl border-t-4 border-green-600 shadow-[0_8px_30px_rgb(0,0,0,0.12)] !bg-transparent backdrop-blur-md py-2"
      >
        
        <ion-tab-button tab="home" href="/home" class="bg-transparent group">
          <ion-icon :icon="homeOutline" class="text-2xl mb-1 transition-all duration-300 group-[.tab-selected]:-translate-y-1" />
          <ion-label class="text-[12px] font-medium transition-all duration-300 group-[.tab-selected]:font-bold">Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="attendance" href="/attendance" class="bg-transparent group">
          <ion-icon :icon="checkboxOutline" class="!text-3xl mb-1 transition-all duration-300 group-[.tab-selected]:-translate-y-1" />
          <ion-label class="text-[12px] font-medium transition-all duration-300 group-[.tab-selected]:font-bold">Attendance</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/library" class="bg-transparent group">
          <ion-icon :icon="library" class="text-2xl mb-1 transition-all duration-300 group-[.tab-selected]:-translate-y-1" />
          <ion-label class="text-[12px] font-medium transition-all duration-300 group-[.tab-selected]:font-bold">Library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile" class="bg-transparent group">
          <ion-icon :icon="personCircleOutline" class="!text-3xl mb-1 transition-all duration-300 group-[.tab-selected]:-translate-y-1" />
          <ion-label class="text-[12px] font-medium transition-all duration-300 group-[.tab-selected]:font-bold">Profile</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { radio, library, homeOutline, personCircleOutline, chatboxOutline, checkboxOutline } from 'ionicons/icons';
</script>

<style scoped>
/* Override CSS Variables Ionic untuk Warna 
   Ini penting agar warna icon berubah saat diklik
*/
ion-tab-bar {
  --background: transparent; /* Biarkan Tailwind yang mengatur background */
}

ion-tab-button {
  --color: #94a3b8; /* text-slate-400 (Inactive color) */
  --color-selected: #7c3aed; /* text-violet-600 (Active color) */
  --ripple-color: #7c3aed;
}
</style>