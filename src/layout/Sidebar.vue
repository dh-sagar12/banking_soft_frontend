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
    <!-- 
    <v-list density="compact" nav>
      <router-link :to="`/frontdesk/profile`" active-class="active_link">
        <v-list-item prepend-icon="mdi-account-card-outline" title="New Profile" value="new_memeber"></v-list-item>
      </router-link>
      <router-link :to="`/frontdesk/profile`" active-class="active_link">
        <v-list-item prepend-icon="mdi-account-card-outline" title="New Profile" value="new_memeber"></v-list-item>
      </router-link>
    </v-list> -->

    <v-expansion-panels >

      <v-expansion-panel title="Core"  class="menu-panels">

        <v-expansion-panel-text class="v-expansion-panel-text">

          <v-list density="compact" nav>
            <router-link :to="`/core/ledgers`" active-class="active_link">
              <v-list-item prepend-icon="mdi-account-card-outline" title="General Ledger" value="general_ledger"></v-list-item>
            </router-link>
          </v-list>
        </v-expansion-panel-text>

      </v-expansion-panel>

      <v-expansion-panel title="Front Desk" class="menu-panels">
        <v-expansion-panel-text class="v-expansion-panel-text">
          <v-list density="compact" nav>
            <router-link :to="`/frontdesk/profile`" active-class="active_link">
              <v-list-item prepend-icon="mdi-account-card-outline" title="New Profile" value="new_memeber"></v-list-item>
            </router-link>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-navigation-drawer>
</template>

<style>
.active_link {
  color: rgb(0, 17, 255);

}

.v-expansion-panel-text div {
  padding: 3px 5px !important;
}

.menu-panels {
  margin-top: 0px !important;
}
</style>