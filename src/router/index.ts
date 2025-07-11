import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Route definitions
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: (to) => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated ? '/dashboard' : '/auth/login';
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestView.vue')
  },
  {
    path: '/components-demo',
    name: 'components-demo',
    component: () => import('@/views/ComponentDemo.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue')
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('@/views/dashboard/ArticlesView.vue')
      },
      {
        path: 'articles/create',
        name: 'articles-create',
        component: () => import('@/views/dashboard/ArticleFormView.vue')
      },
      {
        path: 'articles/:id/edit',
        name: 'articles-edit',
        component: () => import('@/views/dashboard/ArticleFormView.vue'),
        props: true
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/dashboard/CategoriesView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page if trying to access protected route while not authenticated
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else if (authStore.isAuthenticated && to.path.startsWith('/auth/')) {
    // Redirect to dashboard if trying to access auth pages while authenticated
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router; 