<script setup lang="ts">
import { IonApp, IonRouterOutlet, toastController } from '@ionic/vue';

import { onMounted } from 'vue';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { useAuthStore } from './stores/authStore';
import router from './router';

const setupPushNotifications = async () => {
    // 1. Cek & Minta Izin
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
        const toast = await toastController.create({
            message: 'Izin notifikasi ditolak!',
            duration: 3000,
            position: 'top',
            color: 'danger'
        });
        await toast.present();
        return;
    }

    // 2. Jika diizinkan, daftar ke FCM
    await PushNotifications.register();

    const authStore = useAuthStore();

    // 3. Listener: Saat sukses dapat Token
    PushNotifications.addListener('registration', async (fcmToken) => {
        console.log('Push Token Saya:', fcmToken.value);
        // Simpan ke store dan update ke Laravel jika sudah login
        await authStore.updateFcmToken(fcmToken.value);
    });

    // 4. Listener: Saat error
    await PushNotifications.addListener('registrationError', async (error) => {
        const toast = await toastController.create({
            message: 'Error registration: ' + JSON.stringify(error),
            duration: 3000,
            position: 'top',
            color: 'danger'
        });
        await toast.present();
    });

    // 5. Listener: Saat notifikasi masuk (ketika aplikasi sedang dibuka/Foreground)
    await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
        console.log('Pesan masuk:', notification);

        const toast = await toastController.create({
            header: notification.title || 'Informasi Baru',
            message: notification.body,
            duration: 6000,
            position: 'top',
            mode: 'ios',
            color: 'light',
            cssClass: 'push-notification-toast',
            buttons: [
                {
                    text: 'Lihat',
                    handler: () => {
                        console.log('User clicked Lihat');
                    }
                },
                {
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        });
        await toast.present();
    });

    // 6. Listener: Saat notifikasi diklik (Tap)
    await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        // 1. Ambil data dengan struktur yang benar
        // Capacitor menyimpan payload di dalam action.notification.data
        const data = action.notification.data;

        console.log('Notif diklik, Payload data:', data);

        // 2. Logika Redirect berdasarkan data dari Laravel
        if (data && data.url) {
            // Pastikan router sudah di-import dan siap
            router.push(data.url);
        } else if (data && data.id) {
            // Contoh: Ke halaman detail berdasarkan ID
            router.push(`/detail/${data.id}`);
        } else {
            // Default jika tidak ada instruksi khusus
            router.push('/home');
        }
    });

}

onMounted(() => {
    if (Capacitor.getPlatform() !== 'web') {
        setupPushNotifications();
        // this.getDeliveredNotifications();
    }

});
</script>

<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<style>
.push-notification-toast {
    --background: #ffffff;
    --color: #222;
    --box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    --border-radius: 12px;
    --start: 10px;
    --end: 10px;
    --width: calc(100% - 20px);
    margin-top: 10px;
}

.push-notification-toast::part(header) {
    font-weight: 700;
    color: #3880ff;
}

.push-notification-toast::part(message) {
    font-size: 14px;
}

.push-notification-toast::part(button) {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
}
</style>
