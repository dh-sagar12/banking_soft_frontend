import { createRouter, createWebHistory } from 'vue-router';

import DashBoard from '@/views/DashBoard.vue';
import Login from '@/views/Login.vue';
import NewProfile from '@/views/frontdesk/NewProfile.vue';
import AllProfile from '@/views/frontdesk/AllProfile.vue';
import FrontDesk from '@/views/frontdesk/FrontDesk.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: DashBoard,
      props: true,
      meta: {
        protected: true
      }
    },
    {
      path: '/auth/login',
      component: Login,
      props: true,
      meta: {
        protected: false
      }
    },
    {
      path: '/frontdesk',
      component: FrontDesk,
      props: true,
      meta: {
        protected: false
      },
      children: [
        {
          path: '/frontdesk/profile/new',
          component: NewProfile,
          props: true,
        },
        {
          path: '/frontdesk/profile',
          component: AllProfile,
          props: true,
        }
      ]
    },

  ]
})

export default router
