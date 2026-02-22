<template>
    <ion-page>
        <ion-content :fullscreen="true" class="font-sans">
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
            <div class="relative z-10 p-5 pb-24">
                <!-- Top Header Section -->
                <div class="flex justify-between items-center mb-8 animate-fade-in">
                    <div class="flex items-center gap-4">
                        <div class="relative group">
                            <div
                                class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200">
                            </div>
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
                                alt="Profile"
                                class="relative w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm transition-transform active:scale-90" />
                        </div>
                        <div>
                            <p class="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Welcome back,</p>
                            <h2 class="text-xl font-black text-slate-900 tracking-tight">
                                {{ authStore.user?.name || 'Loading...' }}
                            </h2>
                        </div>
                    </div>
                    <button
                        class="relative bg-white p-3 rounded-2xl shadow-sm border border-slate-100 active:scale-90 transition-all">
                        <ion-icon :icon="notifications" class="text-xl text-slate-700"></ion-icon>
                        <span
                            class="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white animate-pulse"></span>
                    </button>
                </div>

                <!-- Main Progress Card -->
                <div
                    class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-7 text-white shadow-2xl shadow-indigo-200/50 mb-8 relative overflow-hidden group">
                    <div
                        class="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700">
                    </div>
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl">
                    </div>

                    <div class="flex justify-between items-start relative z-10">
                        <div class="space-y-6">
                            <div class="space-y-1">
                                <h3 class="text-2xl font-bold leading-tight">Your daily goal <br />is almost done!</h3>
                                <p class="text-slate-400 text-sm">4 of 6 tasks completed</p>
                            </div>
                            <button
                                class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold py-3 px-6 rounded-xl border border-white/10 transition-all active:scale-95">
                                View Today's Tasks
                            </button>
                        </div>

                        <div class="relative w-24 h-24 flex items-center justify-center">
                            <svg class="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="10"
                                    fill="transparent" class="text-white/10" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="10"
                                    fill="transparent" class="text-blue-400" stroke-dasharray="251"
                                    stroke-dashoffset="38" stroke-linecap="round" />
                            </svg>
                            <div class="absolute flex flex-col items-center">
                                <span class="text-lg font-black">85</span>
                                <span class="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- In Progress Section -->
                <div class="mb-8">
                    <div class="flex justify-between items-baseline mb-5 px-1">
                        <h3 class="text-lg font-black text-slate-900 tracking-tight">In Progress</h3>
                        <button class="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                    </div>

                    <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 snap-x">
                        <div v-for="i in 3" :key="i"
                            class="min-w-[280px] bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm snap-center hover:shadow-md transition-shadow">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <span
                                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Project
                                        #{{ i }}</span>
                                    <h4 class="font-bold text-slate-900 text-lg leading-tight">Mobile App Design Refresh
                                    </h4>
                                </div>
                                <div
                                    class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <ion-icon :icon="briefcase" class="text-lg"></ion-icon>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-between text-[11px] font-bold">
                                    <span class="text-slate-500">Progress</span>
                                    <span class="text-blue-600">{{ i * 25 }}%</span>
                                </div>
                                <div class="w-full bg-slate-100 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                                        :style="{ width: (i * 25) + '%' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Task Groups Section -->
                <div class="mb-4">
                    <div class="flex justify-between items-baseline mb-5 px-1">
                        <h3 class="text-lg font-black text-slate-900 tracking-tight">Task Categories</h3>
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                        <div v-for="(group, idx) in groups" :key="idx"
                            class="group bg-white p-4 rounded-3xl flex items-center shadow-sm border border-slate-100 active:scale-[0.98] transition-all hover:bg-slate-50">
                            <div
                                :class="`w-14 h-14 ${group.bgColor} rounded-2xl flex items-center justify-center ${group.iconColor} mr-4 transition-transform group-hover:scale-110`">
                                <ion-icon :icon="group.icon" class="text-2xl"></ion-icon>
                            </div>
                            <div class="flex-grow">
                                <h5 class="font-black text-slate-900 text-sm tracking-tight">{{ group.name }}</h5>
                                <p class="text-xs text-slate-400 font-medium">{{ group.count }} Tasks</p>
                            </div>
                            <div class="relative w-12 h-12 flex items-center justify-center">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3.5"
                                        fill="transparent" class="text-slate-100" />
                                    <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3.5"
                                        fill="transparent" :class="group.iconColor" stroke-dasharray="113"
                                        :stroke-dashoffset="113 - (113 * group.progress / 100)"
                                        stroke-linecap="round" />
                                </svg>
                                <span class="absolute text-[9px] font-black text-slate-700">{{ group.progress }}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { IonContent, IonIcon, IonPage } from '@ionic/vue';
import {
    book,
    briefcase,
    fitness,
    notifications,
    person
} from 'ionicons/icons';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.fetchUser();
});

const groups = [
    { name: 'Office Work', count: 12, icon: briefcase, bgColor: 'bg-indigo-50', iconColor: 'text-indigo-600', progress: 75 },
    { name: 'Personal Growth', count: 8, icon: person, bgColor: 'bg-rose-50', iconColor: 'text-rose-600', progress: 45 },
    { name: 'Education', count: 15, icon: book, bgColor: 'bg-amber-50', iconColor: 'text-amber-600', progress: 90 },
    { name: 'Health & Fitness', count: 4, icon: fitness, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600', progress: 30 }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>