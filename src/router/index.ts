import { createRouter, createWebHistory } from 'vue-router';

import DashBoard from '@/views/DashBoard.vue';
import Login from '@/views/Login.vue';
import NewProfile from '@/views/frontdesk/NewProfile.vue';
import AllProfile from '@/views/frontdesk/AllProfile.vue';
import FrontDesk from '@/views/frontdesk/FrontDesk.vue';
import NewGroupLedger from '@/views/core/ledgers/NewGroupLedger.vue';
import AllLedgerVue from '@/views/core/ledgers/AllLedger.vue';
import NewLedgerVue from '@/views/core/ledgers/NewLedger.vue';
import NewTransactionLedger from "@/views/core/ledgers/NewTransactionLedger.vue";


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
    {
      path : '/core/ledgers', 
      component: AllLedgerVue, 
      props: true
    }, 
    {
      path : '/core/ledger/new', 
      component: NewLedgerVue, 
      props: true
    }, 
    {
      path : '/core/ledger/new/group', 
      component: NewGroupLedger, 
      props: true
    }, 
    {
      path : '/core/ledger/new/transaction', 
      component: NewTransactionLedger,
      props: true
    }, 

  ]
})

export default router
