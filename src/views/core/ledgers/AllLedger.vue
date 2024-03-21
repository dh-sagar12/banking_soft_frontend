<template>
  <IndexPageHeader page_title="General Ledgers" router_link="/core/ledger/new"/>

  <v-radio-group inline label="Choose What to Show" v-model="ledger_type">
    <v-radio label="Group Ledgers" value="GROUP"></v-radio>
    <v-radio label="Transaction Ledgers" value="TRANSACTION"></v-radio>
  </v-radio-group>

  <div>

    <DataTable :data_columns="data_columns" :data_set="data" :show_pagination="true" :total_page="total_page"
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
import IndexPageHeader from '@/components/utilities/IndexPageHeader.vue';
import ApiHandler from '@/utils/APIHandlers';
import {onMounted , ref , watch , watchEffect} from 'vue';
import DataTable from "@/components/utilities/DataTable.vue";
import RedirectLoginPage from "@/utils/RedirectLoginPage";
import {useRouter} from "vue-router";

const ledger_type = ref('GROUP')
const APIHandlers = new ApiHandler()
const paginated_page = ref(1)
const data = ref([])
const total_page =  ref(0)
const router  =  useRouter()


// for data table
const data_columns  =  ref()

const showNextPage = (page: any) => {
  paginated_page.value = page
}


// api calling function
const fetchData  =  ()=> {

  if (ledger_type.value == 'GROUP') {
    data_columns.value  =  ['account_code', 'account_name', 'account_name_np', 'is_active', 'master_ledger']
    APIHandlers.get(`/transaction/all_group_ledger?page=${paginated_page.value}&per_page=5`).then(response => {
      total_page.value  =  response?.total_pages
      data.value  =  response.data.map((item: any) => {
        return  { ...item.attributes, master_ledger: item.attributes.master_ledger.account_name}
      } )
    }).catch((error)=>{
      if (error.status == 401) {
        router.push(`/auth/login?return=${router.currentRoute.value.path}`)
      }
    })

  }
  else {
    data_columns.value  =  ['account_code', 'account_name', 'account_name_np', 'is_active', 'parent_ledger', 'branch', 'creator']
    APIHandlers.get(`/transaction/all_transaction_ledger?page=${paginated_page.value}&per_page=5`).then(response => {
      total_page.value  =  response?.total_pages
      data.value  =  response.data.map((item: any) => {
        return  { ...item.attributes, parent_ledger: item.attributes.group_ledger.account_name, branch: item.attributes?.branch?.nickname, creator: item.attributes?.creator?.full_name}
      } )
    }).catch((error)=> {
      if (error.status == 401) {
        router.push(`/auth/login?return=${router.currentRoute.value.path}`)
      }
    })

  }
}



onMounted(() => {
    fetchData();
})

watch([ledger_type, paginated_page], ()=> {
  fetchData();
})


</script>

