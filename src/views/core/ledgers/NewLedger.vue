<template>
    <div>

        <h1 class="text-2xl py-4 text-blue-900">General Ledgers</h1>

        <p class="my-3 ">Choose What to Add?</p>
        <div class="flex  space-x-10">

            <router-link to="/core/ledger/new/group">
                <v-btn prepend-icon="mdi-format-list-group" variant="elevated" color="indigo-darken-3">
                    Group Ledger
                </v-btn>
            </router-link>

            <router-link  to="/core/ledger/new/transaction">
                <v-btn prepend-icon="mdi-swap-horizontal" variant="elevated" color="indigo-darken-3">
                    Transaction Ledger
                </v-btn>
            </router-link>

        </div>
    </div>
</template>
<script setup lang="ts"></script>

