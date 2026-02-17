import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../components/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/splash',
  },
  {
    path: '/splash',
    name: 'Splash',
    component: () => import('../views/SplashScreenPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/attendance/kbm',
    name: 'KBM',
    component: () => import('../views/Attendance/KBMAttendancePage.vue'),
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('../views/AttendancePage.vue'),
      },
      {
        path: 'library',
        name: 'Library',
        component: () => import('../views/LibraryPage.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/ProfilePage.vue'),
      },
    ],
  },
  // Fallback: Jika rute tidak ditemukan, lari ke Splash atau Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/splash',
  },
];

const router = createRouter({
  // Menggunakan Vite environment variable untuk base URL yang lebih aman
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;