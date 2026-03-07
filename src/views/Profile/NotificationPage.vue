<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bg-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/profile" text="" :icon="arrowBack"
                        class="text-slate-700"></ion-back-button>
                </ion-buttons>
                <ion-title class="font-bold text-lg text-slate-900">Notifikasi</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="bg-gray-50">
            <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100/30 rounded-full blur-[80px] animate-pulse">
                </div>
                <div class="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-100/30 rounded-full blur-[80px]">
                </div>
            </div>

            <div class="relative z-10 px-6 py-4 pb-20">
                <!-- Notification Filters -->
                <div class="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
                    <button v-for="(filter, idx) in filters" :key="idx" @click="activeFilter = filter.key" :class="[
                        '!px-4 !py-2 !rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95',
                        activeFilter === filter.key
                            ? 'bg-green-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-white text-slate-500 border border-slate-200'
                    ]">
                        {{ filter.label }}
                    </button>
                </div>

                <!-- Empty State -->
                <div v-if="filteredNotifications.length === 0"
                    class="flex flex-col items-center justify-center py-20 text-center">
                    <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <ion-icon :icon="notificationsOffOutline" class="text-4xl text-slate-300"></ion-icon>
                    </div>
                    <h3 class="text-lg font-bold text-slate-700 mb-1">Belum Ada Notifikasi</h3>
                    <p class="text-sm text-slate-400">Notifikasi baru akan muncul di sini</p>
                </div>

                <!-- Notification List -->
                <div v-else class="space-y-3">
                    <div v-for="(notif, idx) in filteredNotifications" :key="idx" :class="['bg-white p-4 rounded-2xl border shadow-sm transition-all active:scale-[0.98]',
                        notif.read ? 'border-slate-100' : 'border-indigo-100 bg-indigo-50/30']">
                        <div class="flex items-start gap-3">
                            <div
                                :class="`w-10 h-10 ${notif.iconBg} rounded-full flex items-center justify-center flex-shrink-0`">
                                <ion-icon :icon="notif.icon" :class="`text-lg ${notif.iconColor}`"></ion-icon>
                            </div>
                            <div class="flex-grow min-w-0">
                                <div class="flex justify-between items-start mb-1">
                                    <h4 class="font-bold text-slate-800 text-sm leading-tight">{{ notif.title }}</h4>
                                    <span v-if="!notif.read"
                                        class="w-2 h-2 bg-[#5F33E1] rounded-full flex-shrink-0 mt-1.5"></span>
                                </div>
                                <p class="text-xs text-slate-500 leading-relaxed">{{ notif.message }}</p>
                                <div class="text-[10px] text-slate-400 font-medium mt-2">{{ notif.time }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonBackButton, IonButtons, IonContent, IonHeader, IonIcon,
    IonPage, IonTitle, IonToolbar
} from '@ionic/vue';
import {
    arrowBack,
    calendarOutline,
    cashOutline,
    chatbubbleOutline,
    megaphoneOutline,
    notificationsOffOutline,
    schoolOutline,
} from 'ionicons/icons';
import { computed, ref } from 'vue';

const activeFilter = ref('semua');

const filters = [
    { key: 'semua', label: 'Semua' },
    { key: 'akademik', label: 'Akademik' },
    { key: 'keuangan', label: 'Keuangan' },
    { key: 'pengumuman', label: 'Pengumuman' },
];

interface Notification {
    title: string;
    message: string;
    time: string;
    type: string;
    read: boolean;
    icon: string;
    iconBg: string;
    iconColor: string;
}

const notifications = ref<Notification[]>([
    {
        title: 'Nilai Ujian Matematika',
        message: 'Nilai ujian tengah semester Matematika telah diinput oleh guru. Silakan periksa.',
        time: 'Hari ini, 09:30',
        type: 'akademik',
        read: false,
        icon: schoolOutline,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Tagihan SPP Bulan Maret',
        message: 'Tagihan SPP bulan Maret 2026 sebesar Rp1.500.000 sudah tersedia. Batas pembayaran: 15 Maret.',
        time: 'Hari ini, 08:00',
        type: 'keuangan',
        read: false,
        icon: cashOutline,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
    },
    {
        title: 'Jadwal Libur Ramadhan',
        message: 'Libur Ramadhan dimulai tanggal 28 Februari - 7 April 2026. Siswa masuk kembali tanggal 8 April.',
        time: 'Kemarin, 14:00',
        type: 'pengumuman',
        read: true,
        icon: megaphoneOutline,
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600',
    },
    {
        title: 'Rapat Wali Murid',
        message: 'Rapat wali murid akan diselenggarakan pada hari Sabtu, 15 Maret 2026 pukul 09:00 WIB.',
        time: '2 hari lalu',
        type: 'pengumuman',
        read: true,
        icon: calendarOutline,
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
    },
    {
        title: 'Pesan dari Wali Kelas',
        message: 'Ust. Ahmad mengirim pesan tentang perkembangan belajar anak Anda.',
        time: '3 hari lalu',
        type: 'akademik',
        read: true,
        icon: chatbubbleOutline,
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
]);

const filteredNotifications = computed(() => {
    if (activeFilter.value === 'semua') return notifications.value;
    return notifications.value.filter(n => n.type === activeFilter.value);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

ion-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
}

ion-toolbar {
    --background: transparent;
    --border-width: 0;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
