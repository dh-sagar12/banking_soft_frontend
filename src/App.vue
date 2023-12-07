<script setup lang="ts">
import Sidebar from "./layout/Sidebar.vue";
import Navigation from "./layout/NavHeader.vue";
import LoginForm from '@/components/auth/LoginForm.vue';
import { computed } from "vue";
import { onMounted } from "vue";
import APIHandlers from '@/utils/APIHandlers';
import { ref } from "vue";



const isAuthenticated = ref(false)

onMounted(() => {
  console.log('looking for the api');

  // check whether the session is active or not  and route to the authenticate page if session not found else redirect to dashboard

  APIHandlers.get('/users/current_user/').then(response => {
    if (response.status == 200) {
      isAuthenticated.value = true

    }

  }).catch(error => {


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
    <LoginForm />
  </div>
</template>