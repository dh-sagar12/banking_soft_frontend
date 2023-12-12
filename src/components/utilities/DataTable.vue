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
    <div v-if="show_pagination && total_page > 1" class="md:flex md:justify-end md:mt-7">
        <v-pagination :length="total_page" @update:model-value="paginate"></v-pagination>
    </div>
</template>
<script setup lang="ts">
import CaseConvert from '@/utils/CaseConvert'

const props = defineProps(['data_columns', 'data_set', 'height', 'show_pagination', 'total_page', 'current_page', 'paginate'])

</script>
