<template>
    <v-table fixed-header :height="height">
        <thead>
            <tr>
                <th v-for="column in props.data_columns" class="text-left">
                    {{ CaseConvert(column) }}
                </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item, index in data_set" :key="item.name">
                <td v-for="col in props.data_columns">{{ item[col] }}</td>
                <slot :id="item.id ? item.id : index"></slot>
            </tr>
        </tbody>
    </v-table>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import CaseConvert from '@/utils/CaseConvert'

const props = defineProps(['data_columns', 'data_set', 'height'])

</script>
