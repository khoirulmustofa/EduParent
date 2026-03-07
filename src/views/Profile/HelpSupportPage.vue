<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar class="bg-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/profile" text="" :icon="arrowBack"
                        class="text-slate-700"></ion-back-button>
                </ion-buttons>
                <ion-title class="font-bold text-lg text-slate-900">Bantuan & Dukungan</ion-title>
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

            <div class="relative z-10 px-4 py-4 pb-20">
                <!-- Header Illustration -->
                <div
                    class="bg-gradient-to-br from-green-500 via-green-500 to-green-500 rounded-2xl p-4 mb-6 text-center shadow-xl shadow-indigo-500/20">
                    <div
                        class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ion-icon :icon="helpCircleOutline" class="text-3xl text-white"></ion-icon>
                    </div>
                    <h2 class="text-xl font-bold text-white mb-1">Ada yang bisa kami bantu?</h2>
                    <p class="text-white/100 text-sm">Tim kami siap membantu Anda kapan saja</p>
                </div>

                <!-- FAQ Section -->
                <div class="mb-6">
                    <div class="text-lg font-bold text-slate-900 mb-4 ml-1">Pertanyaan Umum (FAQ)</div>
                    <div class="space-y-3">
                        <div v-for="(faq, idx) in faqs" :key="idx"
                            class="bg-white !rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <button @click="faq.open = !faq.open"
                                class="w-full !p-4 flex items-center justify-between text-left active:bg-slate-50 transition-colors">
                                <span class="font-semibold text-slate-700 text-sm pr-4">{{ faq.question }}</span>
                                <ion-icon :icon="faq.open ? chevronUp : chevronDown"
                                    class="text-slate-400 flex-shrink-0 transition-transform"></ion-icon>
                            </button>
                            <div v-if="faq.open"
                                class="!px-4 !pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
                                {{ faq.answer }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Options -->
                <div>
                    <div class="text-lg font-bold text-slate-900 mb-4 ml-1">Hubungi Kami</div>
                    <div class="space-y-3">
                        <button v-for="(contact, idx) in contacts" :key="idx"
                            class="w-full bg-white !p-4 !rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
                            <div :class="`w-12 h-12 ${contact.bgColor} rounded-2xl flex items-center justify-center`">
                                <ion-icon :icon="contact.icon" :class="`text-xl ${contact.iconColor}`"></ion-icon>
                            </div>
                            <div class="text-left">
                                <div class="font-bold text-slate-800 text-sm">{{ contact.title }}</div>
                                <div class="text-xs text-slate-400">{{ contact.subtitle }}</div>
                            </div>
                            <ion-icon :icon="chevronForward" class="text-slate-300 ml-auto"></ion-icon>
                        </button>
                    </div>
                </div>

                <!-- App Info -->
                <div class="mt-8 text-center">
                    <div class="text-xs text-slate-400">EduParent versi 1.0.0</div>
                    <div class="text-[10px] text-slate-300 mt-1">© 2026 SMPIT NF Bogor. Hak cipta dilindungi.</div>
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
    callOutline,
    chatbubbleEllipsesOutline,
    chevronDown,
    chevronForward,
    chevronUp,
    helpCircleOutline,
    logoWhatsapp,
    mailOutline,
} from 'ionicons/icons';
import { reactive } from 'vue';

const faqs = reactive([
    {
        question: 'Bagaimana cara melihat nilai anak saya?',
        answer: 'Anda bisa melihat nilai anak melalui menu "Rapor" di halaman utama. Pilih tahun ajaran dan semester yang diinginkan.',
        open: false,
    },
    {
        question: 'Bagaimana cara membayar SPP online?',
        answer: 'Buka menu "Keuangan" di halaman utama, lalu pilih tagihan yang ingin dibayar. Anda bisa membayar via transfer bank atau e-wallet.',
        open: false,
    },
    {
        question: 'Bagaimana cara menghubungi wali kelas?',
        answer: 'Gunakan fitur "Chat" di halaman utama untuk mengirim pesan langsung ke wali kelas anak Anda.',
        open: false,
    },
    {
        question: 'Apa yang harus dilakukan jika lupa password?',
        answer: 'Di halaman login, klik "Lupa Password?" lalu masukkan email terdaftar. Link reset password akan dikirim ke email Anda.',
        open: false,
    },
    {
        question: 'Bagaimana cara mengubah data profil?',
        answer: 'Buka halaman Profil > Edit Profil. Anda bisa mengubah nama, foto profil, dan nomor telepon.',
        open: false,
    },
]);

const contacts = [
    {
        title: 'WhatsApp',
        subtitle: '+62 812-XXXX-XXXX',
        icon: logoWhatsapp,
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        title: 'Email',
        subtitle: 'admin@smpit-nfbogor.sch.id',
        icon: mailOutline,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Telepon Sekolah',
        subtitle: '(0251) XXX-XXXX',
        icon: callOutline,
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-600',
    },
    {
        title: 'Live Chat',
        subtitle: 'Senin - Jumat, 08:00 - 15:00',
        icon: chatbubbleEllipsesOutline,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
];
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
</style>
