<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <div class="fixed inset-0 bg-gradient-to-br from-blue-200 via-white to-cyan-100 pointer-events-none z-0">
            </div>

            <div class="relative z-10 p-5 flex justify-between items-center">
                <button
                    class="!bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full shadow-sm text-gray-700 !border !border-gray-100 !active:scale-95 !transition-transform">
                    <ion-icon :icon="chevronBack" class="text-xl"></ion-icon>
                </button>
                <div class="text-xl font-bold text-gray-800">Profile</div>
                <button
                    class="!bg-white/80 !backdrop-blur-md !p-2.5 !rounded-full shadow-sm text-gray-700 !border !border-gray-100 !active:scale-95 !transition-transform">
                    <ion-icon :icon="settingsOutline" class="text-xl"></ion-icon>
                </button>
            </div>

            <div class="relative z-10 px-6 pb-24">

                <div class="flex flex-col items-center mb-8">
                    <div class="relative mb-4">
                        <div class="w-28 h-28 rounded-full p-1 bg-white shadow-lg">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                alt="Profile" class="w-full h-full rounded-full object-cover" />
                        </div>
                        <button
                            class="absolute bottom-0 right-1 w-9 h-9 bg-[#5F33E1] rounded-full border-[3px] border-white flex items-center justify-center text-white shadow-md active:scale-90 transition-transform">
                            <ion-icon :icon="cameraOutline" class="text-sm"></ion-icon>
                        </button>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">Livia Vaccaro</div>
                    <p class="text-gray-500 text-sm font-medium mt-1">livia.vaccaro@design.com</p>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div
                        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <div class="text-[#5F33E1] text-2xl font-bold mb-1">24</div>
                        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Tasks Done</span>
                    </div>
                    <div
                        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <div class="text-orange-500 text-2xl font-bold mb-1">12</div>
                        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">In Progress</span>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="!text-xl !font-bold !text-gray-900 !ml-1 !pt-2">General</div>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-purple-50 text-[#5F33E1] flex items-center justify-center">
                                <ion-icon :icon="personOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Edit Profile</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-[#5F33E1] transition-colors"></ion-icon>
                    </button>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                <ion-icon :icon="notificationsOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Notifications</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-blue-500 transition-colors"></ion-icon>
                    </button>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                                <ion-icon :icon="shieldCheckmarkOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Security</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-orange-500 transition-colors"></ion-icon>
                    </button>

                    <div class="!text-xl !font-bold !text-gray-900 !ml-1 !pt-2">Preferences</div>

                    <button
                        class="w-full bg-white !p-2 !rounded-2xl !shadow-[0_2px_8px_rgba(0,0,0,0.04)] !border !border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                                <ion-icon :icon="helpCircleOutline" class="text-xl"></ion-icon>
                            </div>
                            <span class="font-semibold text-gray-700 text-[15px]">Help & Support</span>
                        </div>
                        <ion-icon :icon="chevronForward"
                            class="text-gray-300 group-hover:text-pink-500 transition-colors"></ion-icon>
                    </button>

                    <button
                        class="w-full bg-red-50 !p-4 !rounded-2xl !border !border-red-100 flex items-center justify-center gap-2 group active:scale-[0.98] transition-all mt-6">
                        <ion-icon :icon="logOutOutline" class="text-red-500 text-xl"></ion-icon>
                        <span class="font-bold text-red-500 text-[15px]">Log Out</span>
                    </button>

                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
    chevronBack,
    settingsOutline,
    cameraOutline,
    chevronForward,
    personOutline,
    notificationsOutline,
    shieldCheckmarkOutline,
    helpCircleOutline,
    logOutOutline
} from 'ionicons/icons';
</script>