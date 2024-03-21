<template>
    <div>
        <h1 class="text-2xl py-4 text-blue-900">{{ props.page_title  }}</h1>

        <div class="flex justify-between">

            <router-link :to="props.router_link">
                <v-btn prepend-icon="mdi-plus" variant="elevated" color="indigo-darken-3">
                    Add New
                </v-btn>
            </router-link>

            <div class="w-1/3">
                <v-text-field clearable hide-details label="Search"  v-model="search"  @input="handleChangeInSearch" variant="outlined" prepend-inner-icon="mdi-magnify"
                    single-line></v-text-field>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const props =  defineProps(['page_title', 'router_link'])

const search  =  ref('')

const handleChangeInSearch = ()=> {
  console.log (search.value)

}

</script>
