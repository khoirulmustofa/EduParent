import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../components/TabsPage.vue';
import { useAuthStore } from '@/stores/authStore';

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