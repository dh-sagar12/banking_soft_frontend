<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
const rail = ref(false);
</script>

<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="CBS" nav>
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link :to="`/frontdesk/profile`" active-class="active_link">
        <v-list-item prepend-icon="mdi-account-card-outline" title="New Profile" value="new_memeber"></v-list-item>
      </router-link>
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.active_link {
  color: rgb(0, 17, 255);

}
</style>