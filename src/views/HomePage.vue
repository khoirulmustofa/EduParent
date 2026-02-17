<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50">

            <div class="bg-campus-green rounded-b-[3rem] border-b-[10px] border-b-green-900 py-5 text-white shadow-lg relative z-10">

                <div class="flex justify-between items-center px-6 mb-6">
                    <ion-avatar class="w-12 h-12 border-2 border-white/20">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
                    </ion-avatar>

                    <div class="text-lg font-semibold flex-grow text-center">Campus name</div>

                    <div class="relative">
                        <ion-icon :icon="notificationsOutline" class="text-3xl"></ion-icon>
                        <span
                            class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-campus-green"></span>
                    </div>
                </div>

                <div class="px-6 mb-6">
                    <div class="text-lg font-semibold mb-1 tracking-wide">
                        Firstname Surname
                    </div>
                    <div class="text-sm text-blue-200">
                        1234567890 | 190303106080@university.ac.in
                    </div>
                </div>

                <div class="flex justify-between px-6">
                    <div class="flex flex-col">
                        <span class="text-xs text-blue-200 mb-1">Today's Collection</span>
                        <span class="text-xl font-bold tracking-tight">1,278,500.00</span>
                    </div>
                    <div class="flex flex-col text-right">
                        <span class="text-xs text-blue-200 mb-1">Today's Expense</span>
                        <span class="text-xl font-bold tracking-tight">548,560.00</span>
                    </div>
                </div>
            </div>

            <div class="p-4 -mt-2">
                <div class="grid grid-cols-3 gap-3">

                    <div v-for="(item, index) in menuItems" :key="index"
                        class="bg-green-100 rounded-xl p-4 h-28 flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform duration-150">
                        <ion-icon :icon="item.icon" class="text-4xl text-[#002D5C] mb-2"></ion-icon>
                        <span class="text-[11px] font-medium text-[#002D5C] text-center leading-tight">
                            {{ item.label }}
                        </span>
                    </div>

                </div>
            </div>

            <div class="text-center py-8 text-gray-400 text-xs">
                App Version 5.63
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonAvatar, IonIcon } from '@ionic/vue';
import {
    notificationsOutline,
    peopleOutline,
    idCardOutline,
    cashOutline,
    walletOutline,
    calendarOutline,
    documentTextOutline,
    clipboardOutline,
    ribbonOutline,
    cardOutline,
    flagOutline
} from 'ionicons/icons';

const menuItems = [
    { label: 'Students', icon: peopleOutline },
    { label: 'Staff', icon: idCardOutline },
    { label: 'Fees', icon: cashOutline },
    { label: 'Expense', icon: walletOutline },
    { label: 'Time table', icon: calendarOutline },
    { label: 'Syllabus', icon: documentTextOutline },
    { label: 'Exams', icon: clipboardOutline },
    { label: 'Marks', icon: ribbonOutline },
    { label: 'Generate I-Card', icon: cardOutline },
    { label: 'Festival / Event', icon: flagOutline },
];
</script>

<style scoped></style>