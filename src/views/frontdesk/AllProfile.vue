<template>
    <h1 class="text-2xl py-4 text-blue-900">Profile Registration</h1>


    <div class="flex justify-between">

        <router-link to="/frontdesk/profile/new">
            <v-btn prepend-icon="mdi-plus" variant="elevated" color="indigo-darken-3">
                Add New
            </v-btn>
        </router-link>

        <div class="w-1/3">
            <v-text-field clearable hide-details label="Search News" prepend-inner-icon="mdi-magnify"
                single-line></v-text-field>
        </div>
    </div>


    <div>

        <DataTable :data_columns="data_columns" :data_set="customer_data" :show_pagination="true" :total_page="total_page"
            :current_page="paginated_page" :paginate="showNextPage" v-slot="slotProps">

            <td>
                <router-link :to="`/frontdesk/profile/${slotProps.id}`">
                    <v-btn icon="mdi-pencil" color="indigo-darken-3" size="30px"></v-btn>
                </router-link>
            </td>

        </DataTable>
    </div>
</template>


<script setup lang="ts">

import DataTable from '@/components/utilities/DataTable.vue'
import APIHandlers from '@/utils/APIHandlers';
import getBranches from '@/utils/FetchBranches';
import { watchEffect } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const data_columns = ref([
    'profile_id',
    'branch',
    'registration_date',
    'customer_name',
    'gender',
    'contact_number',
    'date_of_birth'

])
const paginated_page = ref<number>(1)
const per_page_items = ref<number>(10)
const customer_data = ref<any>([])
const total_page = ref<number>(0)
const all_branches = ref<any>([])

onMounted(async () => {
    let branches = await getBranches()
    console.log(branches.data);

    all_branches.value = branches.data
    APIHandlers.get(`/kyc/filter_customers?page=${paginated_page.value}&per_page=${per_page_items.value}`).then(response => {
        console.log(response);
        console.log(response.total_pages);

        total_page.value = response.total_pages
        paginated_page.value = response.current_page
        let table_data = response.data.map((item: any) => {
            let branch = branches.data.filter((branch: any) => branch.id == item.customer.branch_id)[0]
            let contact = item.kyc_contacts.filter((item: any) => item.contact_relation == 'self')
            return {
                id: item.id,
                profile_id: item.customer.profile_id,
                branch: `${branch.nickname}(${branch.branch_code})`,
                registration_date: item.customer.introduced_date,
                customer_name: `${item.kyc_personal.first_name} ${item.kyc_personal.middle_name} ${item.kyc_personal.last_name}`,
                gender: item.kyc_personal.gender,
                contact_number: contact.length > 0 ? contact.reduce((prev: any, next: any) => `${prev.contact_number}, ${next.contact_number}`).contact_number : '',
                date_of_birth: item.kyc_personal.date_of_birth
            }
        })
        customer_data.value = table_data
        console.log(table_data);


    }).catch(err => {
        console.log(err);

    })
})


const showNextPage = (page: any) => {
    paginated_page.value = page
}

watchEffect(() => {
    APIHandlers.get(`/kyc/filter_customers?page=${paginated_page.value}&per_page=${per_page_items.value}`).then(response => {
        console.log(response);
        console.log(response.total_pages);

        total_page.value = response.total_pages
        paginated_page.value = response.current_page
        let table_data = response.data.map((item: any) => {
            let branch = all_branches.value.filter((branch: any) => branch.id == item.customer.branch_id)[0]
            let contact = item.kyc_contacts.filter((item: any) => item.contact_relation == 'self')
            return {
                id: item.id,
                profile_id: item.customer.profile_id,
                branch: `${branch.nickname}(${branch.branch_code})`,
                registration_date: item.customer.introduced_date,
                customer_name: `${item.kyc_personal.first_name} ${item.kyc_personal.middle_name} ${item.kyc_personal.last_name}`,
                gender: item.kyc_personal.gender,
                contact_number: contact.length > 0 ? contact.reduce((prev: any, next: any) => `${prev.contact_number}, ${next.contact_number}`).contact_number : '',
                date_of_birth: item.kyc_personal.date_of_birth
            }
        })
        customer_data.value = table_data
        console.log(table_data);


    }).catch(err => {
        console.log(err);

    })
})

const handleEditIconClick = () => {
    console.log('edit ');

}

</script>