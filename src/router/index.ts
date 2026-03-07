import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../components/TabsPage.vue';
import { useAuthStore } from '@/stores/authStore';
import TabsQuran from '@/components/TabsQuran.vue';

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
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/attendance/kbm',
    name: 'KBM',
    component: () => import('../views/Attendance/KBMAttendancePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/menu/callendar',
    name: 'Callendar',
    component: () => import('../views/Menu/CallendarPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/menu/lesson-schedule',
    name: 'LessonSchedule',
    component: () => import('../views/Menu/LessonSchedulePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    name: 'EditProfile',
    component: () => import('../views/Profile/EditProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/notifications',
    name: 'Notifications',
    component: () => import('../views/Profile/NotificationPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/help',
    name: 'HelpSupport',
    component: () => import('../views/Profile/HelpSupportPage.vue'),
    meta: { requiresAuth: true }
  },

  // =========== AL QURAN ===============

  {
    path: '/quran/surah/:nomor',
    name: 'DetailSurahPage',
    component: () => import('../views/Quran/DetailSurahPage.vue'),
    meta: { requiresAuth: true }
  },

   {
    path: '/',
    component: TabsQuran,
    children: [
      {
        path: '',
        redirect: '/quran/list',
      },
      {
        path: '/quran/list',
        name: 'ListSurahPage',
        component: () => import('../views/Quran/ListSurahPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/quran/bookmark',
        name: 'BookmarkPage',
        component: () => import('../views/Quran/BookmarkPage.vue'),
        meta: { requiresAuth: true }
      },
     
    ],
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
        meta: { requiresAuth: true }
      },
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('../views/AttendancePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/MenuPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/ProfilePage.vue'),
        meta: { requiresAuth: true }
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Cek user data jika punya token tapi state user kosong (misal abis refresh)
  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;