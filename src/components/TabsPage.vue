<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom" class="!border-t-4 !border-green-600 bg-white/95 backdrop-blur-lg pt-1 pb-safe">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="attendance" href="/attendance">
          <ion-icon :icon="checkboxOutline" />
          <ion-label>Attendance</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="menu" href="/menu">
          <ion-icon :icon="gridOutline" />
          <ion-label>Menu</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { checkboxOutline, gridOutline, homeOutline, personCircleOutline } from 'ionicons/icons';
</script>

<style scoped>
/* Reset & Base Styling */
ion-tab-bar {
  --background: #ffffff;
  height: 70px;
  /* Membuat sudut melengkung di atas */
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  /* Shadow untuk mempertegas lengkungan */
  box-shadow: 0 -8px 25px rgba(0, 0, 0, 0.08);

  /* MENGHILANGKAN BACKGROUND BELAKANG */
  border: none;
  position: absolute;
  /* Membuatnya benar-benar melayang di atas konten */
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
}

/* Menghilangkan garis abu-abu bawaan Ionic */
ion-tab-bar::before {
  display: none !important;
}

ion-tab-button {
  --color: #94a3b8;
  --color-selected: #16a34a;
  --ripple-color: #16a34a;
  background: white;
  /* Pastikan button mengikuti warna bar */
}

/* Memberi sedikit ruang agar konten tidak tertutup tab bar di paling bawah */
ion-router-outlet {
  padding-bottom: 70px;
}

ion-icon {
  font-size: 24px;
  margin-bottom: 3px;
}

ion-label {
  font-size: 11px !important;
  font-weight: 600;
}

ion-tab-button.tab-selected ion-icon {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>