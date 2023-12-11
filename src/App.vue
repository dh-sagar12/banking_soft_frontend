<script setup lang="ts">
import Sidebar from "./layout/Sidebar.vue";
import Navigation from "./layout/NavHeader.vue";
import { onMounted } from "vue";
import APIHandlers from '@/utils/APIHandlers';
import { ref } from "vue";
import { useRouter } from "vue-router";
import { inject } from "vue";

const router = useRouter();
const isAuthenticated = ref(false)
const bus: any = inject('$bus')


bus.$on("user-authorized", (value: boolean) => {
  isAuthenticated.value = value
});

onMounted(() => {

  // check whether the session is active or not  and route to the authenticate page if session not found else redirect to dashboard
  APIHandlers.get('/users/current_user/').then(response => {
    if (response.status == 200) {
      isAuthenticated.value = true
      if (router.currentRoute.value.path == '/auth/login') {
        isAuthenticated.value = false
      }

    }
  }).catch(error => {
    isAuthenticated.value = false
    router.currentRoute.value.path == '/auth/login'
      ? router.push('/auth/login')
      : router.push({ path: '/auth/login', query: { 'return': router.currentRoute.value.path } })

  })

})

</script>

<template>
  <v-card v-if="isAuthenticated">
    <v-layout>

      <!-- Side Navigation Bar  -->
      <Sidebar />

      <v-main class="bg-slate-100" style="height: 100vh">

        <Navigation></Navigation>
        <!-- Top Navigation bar  -->

        <div class="border shadow-md bg-white border-gray-100 m-4 p-4" style="height: 90vh">
          <router-view></router-view>

        </div>

      </v-main>
    </v-layout>
  </v-card>

  <div v-else class="bg-blue-100 flex justify-center items-center" style="height: 100vh;">
    <router-view></router-view>
  </div>
</template>