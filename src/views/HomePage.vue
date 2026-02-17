<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-gray-50 font-sans">

            <div class="fixed inset-0 bg-gradient-to-br from-blue-200 via-white to-cyan-100 pointer-events-none z-0">
            </div>

            <div class="relative z-10 p-5">

                <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center gap-4">
                        <div class="relative">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
                                alt="Profile"
                                class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Hello!</p>
                            <div class="text-xl font-bold text-gray-800">Livia Vaccaro</div>
                        </div>
                    </div>
                    <div class="relative bg-white p-2 rounded-full shadow-sm">
                        <ion-icon :icon="notifications" class="text-xl text-gray-700"></ion-icon>
                        <span
                            class="absolute top-2 right-2.5 w-2 h-2 bg-purple-600 rounded-full border border-white"></span>
                    </div>
                </div>

                <div
                    class="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-200 mb-4 relative overflow-hidden">
                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    <div class="flex justify-between items-start mb-4">
                        <div class="max-w-[60%]">
                            <div class="text-xl font-semibold leading-tight mb-6">Your today's task almost done!</div>
                            <button
                                class="!bg-white/40 hover:bg-white/30 !backdrop-blur-sm text-white text-sm font-semibold !py-2.5 !px-6 !rounded-xl transition-colors">
                                View Task
                            </button>
                        </div>

                        <div class="relative w-20 h-20 flex items-center justify-center">
                            <svg class="w-full h-full transform -rotate-90">
                                <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="8" fill="transparent"
                                    class="text-white/20" />
                                <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="8" fill="transparent"
                                    class="text-white" stroke-dasharray="200" stroke-dashoffset="30"
                                    stroke-linecap="round" />
                            </svg>
                            <span class="absolute text-sm font-bold">85%</span>

                            <div class="absolute -top-2 -right-2">
                                <ion-icon :icon="ellipsisHorizontal" class="text-white/60 text-xl"></ion-icon>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="!mb-2">
                    <div class="flex justify-between items-center mb-2">
                        <div class="text-xl font-bold text-gray-800">In Progress <span
                                class="text-purple-500 text-sm ml-1">6</span></div>
                    </div>

                    <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                        <div class="min-w-[260px] bg-blue-50/50 p-5 rounded-[20px] border border-blue-100">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-xs text-gray-500 font-medium">Office Project</span>
                                <div
                                    class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-400">
                                    <ion-icon :icon="briefcase" class="text-sm"></ion-icon>
                                </div>
                            </div>
                            <div class="font-bold text-gray-800 mb-4 text-base">Grocery shopping app design</div>
                            <div class="w-full bg-blue-200 rounded-full h-1.5 mb-1">
                                <div class="bg-blue-500 h-1.5 rounded-full" style="width: 20%"></div>
                            </div>
                        </div>

                        <div class="min-w-[260px] bg-orange-50/50 p-5 rounded-[20px] border border-orange-100">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-xs text-gray-500 font-medium">Personal Project</span>
                                <div
                                    class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-400">
                                    <ion-icon :icon="person" class="text-sm"></ion-icon>
                                </div>
                            </div>
                            <div class="font-bold text-gray-800 mb-4 text-base">Uber Eats redesign challenge</div>
                            <div class="w-full bg-orange-200 rounded-full h-1.5 mb-1">
                                <div class="bg-orange-500 h-1.5 rounded-full" style="width: 50%"></div>
                            </div>
                        </div>

                        <div class="min-w-[260px] bg-blue-50/50 p-5 rounded-[20px] border border-blue-100">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-xs text-gray-500 font-medium">Office Project</span>
                                <div
                                    class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-400">
                                    <ion-icon :icon="briefcase" class="text-sm"></ion-icon>
                                </div>
                            </div>
                            <div class="font-bold text-gray-800 mb-4 text-base">Grocery shopping app design</div>
                            <div class="w-full bg-blue-200 rounded-full h-1.5 mb-1">
                                <div class="bg-blue-500 h-1.5 rounded-full" style="width: 70%"></div>
                            </div>
                        </div>

                        <div class="min-w-[260px] bg-orange-50/50 p-5 rounded-[20px] border border-orange-100">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-xs text-gray-500 font-medium">Personal Project</span>
                                <div
                                    class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-400">
                                    <ion-icon :icon="person" class="text-sm"></ion-icon>
                                </div>
                            </div>
                            <div class="font-bold text-gray-800 mb-4 text-base">Uber Eats redesign challenge</div>
                            <div class="w-full bg-orange-200 rounded-full h-1.5 mb-1">
                                <div class="bg-orange-500 h-1.5 rounded-full" style="width: 50%"></div>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div class="text-lg font-bold text-gray-800">Task Groups <span
                                class="text-purple-500 text-sm ml-1">4</span>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100">
                            <div
                                class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 mr-4">
                                <ion-icon :icon="briefcase" class="text-xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <div class="font-bold text-gray-800 text-sm">Office Project</div>
                                <p class="text-xs text-gray-400">23 Tasks</p>
                            </div>
                            <div class="relative w-10 h-10 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" stroke="#fce7f3" stroke-width="4"
                                        fill="transparent" />
                                    <circle cx="20" cy="20" r="16" stroke="#ec4899" stroke-width="4" fill="transparent"
                                        stroke-dasharray="100" stroke-dashoffset="30" stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[10px] font-bold text-gray-700">70%</span>
                            </div>
                        </div>

                        <div class="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100">
                            <div
                                class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mr-4">
                                <ion-icon :icon="person" class="text-xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <div class="font-bold text-gray-800 text-sm">Personal Project</div>
                                <p class="text-xs text-gray-400">30 Tasks</p>
                            </div>
                            <div class="relative w-10 h-10 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" stroke="#f3e8ff" stroke-width="4"
                                        fill="transparent" />
                                    <circle cx="20" cy="20" r="16" stroke="#a855f7" stroke-width="4" fill="transparent"
                                        stroke-dasharray="100" stroke-dashoffset="48" stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[10px] font-bold text-gray-700">52%</span>
                            </div>
                        </div>

                        <div class="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100">
                            <div
                                class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mr-4">
                                <ion-icon :icon="book" class="text-xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <div class="font-bold text-gray-800 text-sm">Daily Study</div>
                                <p class="text-xs text-gray-400">30 Tasks</p>
                            </div>
                            <div class="relative w-10 h-10 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" stroke="#ffedd5" stroke-width="4"
                                        fill="transparent" />
                                    <circle cx="20" cy="20" r="16" stroke="#f97316" stroke-width="4" fill="transparent"
                                        stroke-dasharray="100" stroke-dashoffset="13" stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[10px] font-bold text-gray-700">87%</span>
                            </div>
                        </div>

                        <div class="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100">
                            <div
                                class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 mr-4">
                                <ion-icon :icon="briefcase" class="text-xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <div class="font-bold text-gray-800 text-sm">Office Project</div>
                                <p class="text-xs text-gray-400">23 Tasks</p>
                            </div>
                            <div class="relative w-10 h-10 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" stroke="#fce7f3" stroke-width="4"
                                        fill="transparent" />
                                    <circle cx="20" cy="20" r="16" stroke="#ec4899" stroke-width="4" fill="transparent"
                                        stroke-dasharray="100" stroke-dashoffset="30" stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[10px] font-bold text-gray-700">70%</span>
                            </div>
                        </div>

                        <div class="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100">
                            <div
                                class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mr-4">
                                <ion-icon :icon="person" class="text-xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <div class="font-bold text-gray-800 text-sm">Personal Project</div>
                                <p class="text-xs text-gray-400">30 Tasks</p>
                            </div>
                            <div class="relative w-10 h-10 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" stroke="#f3e8ff" stroke-width="4"
                                        fill="transparent" />
                                    <circle cx="20" cy="20" r="16" stroke="#a855f7" stroke-width="4" fill="transparent"
                                        stroke-dasharray="100" stroke-dashoffset="48" stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[10px] font-bold text-gray-700">52%</span>
                            </div>
                        </div>

                        <div class="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100">
                            <div
                                class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mr-4">
                                <ion-icon :icon="book" class="text-xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <div class="font-bold text-gray-800 text-sm">Daily Study</div>
                                <p class="text-xs text-gray-400">30 Tasks</p>
                            </div>
                            <div class="relative w-10 h-10 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" stroke="#ffedd5" stroke-width="4"
                                        fill="transparent" />
                                    <circle cx="20" cy="20" r="16" stroke="#f97316" stroke-width="4" fill="transparent"
                                        stroke-dasharray="100" stroke-dashoffset="13" stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[10px] font-bold text-gray-700">87%</span>
                            </div>
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
    book,
    briefcase,
    ellipsisHorizontal,
    notifications,
    person
} from 'ionicons/icons';
</script>

<style scoped>
/* Hiding horizontal scrollbar but keeping functionality */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>