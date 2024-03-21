<template>
  <h1 class="text-2xl py-4 text-blue-900"> New Group Ledger</h1>
  <div>
    <v-form v-model="valid" @submit.prevent="HandleFormSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-select label="Parent Account" variant="outlined" v-model="transaction_ledger_data.group_ledger_id"
                      :items="group_ledgers" item-title="name" item-value="id" :rules="rules"></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="transaction_ledger_data.account_code" :rules="rules" :counter="10"
                          label="Account Code" variant="outlined" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="transaction_ledger_data.account_name" :rules="rules" :counter="10"
                          variant="outlined" label="Account Name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="transaction_ledger_data.account_name_np" :rules="rules" :counter="10"
                          variant="outlined" label="Account Name Np" required></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-checkbox v-model="transaction_ledger_data.is_active" label="Is Active" variant="outlined"></v-checkbox>
          </v-col>

          <v-col cols="12" md="1">
              <v-checkbox v-model="transaction_ledger_data.is_ibt" label="Is IBT" variant="outlined"></v-checkbox>
          </v-col>

          <v-col cols="12" md="4">
            <v-select  v-if="transaction_ledger_data.is_ibt" label="Parent Account" variant="outlined" v-model="transaction_ledger_data.branch_id"
                       :items="branches" item-title="name" item-value="id" :rules="rules"></v-select>
          </v-col>


        </v-row>
        <v-col cols="12" md="3">
          <v-btn type="submit" color="indigo-darken-3" :loading="loading" size="large"> Save</v-btn>

          <router-link :to="`/core/ledgers`">
            <v-btn color="red-darken-3" size="large" class="mx-3"> Cancel</v-btn>
          </router-link>
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {onMounted , reactive , ref , watch} from "vue";
import ApiHandler from "@/utils/APIHandlers";
import RedirectLoginPage from "@/utils/RedirectLoginPage";

const router = useRouter()
const toast = useToast()


const transaction_ledger_data = reactive({
  account_code: "",
  account_name: "",
  account_name_np: "",
  is_active: true,
  is_ibt: false,
  branch_id: null,
  group_ledger_id: null
})
const valid = ref(false)
const rules = reactive([
  (value: any) => {
    if (value) return true
    return 'Required.'
  }
])
const group_ledgers = ref([])
const branches  = ref([])

const loading = ref(false)

const APIHandlers = new ApiHandler()

const HandleFormSubmit = () => {

  console.log (transaction_ledger_data)
  if (valid.value) {

    APIHandlers.post('/transaction/new_transaction_ledger', transaction_ledger_data).then(response => {
      toast.success('Group Ledger Create Success!!')
      router.push('/core/ledgers')
    }).catch(error => {
      console.log(error)
      if (error.status == 401) {
        RedirectLoginPage()
      }

      error.data.data.forEach((error: any) => {
        toast.error(error)
      });


    })
  }

}


onMounted(() => {
  APIHandlers.get('/transaction/all_group_ledger').then((response: any) => {
    group_ledgers.value = response.data.map ( ( item: any ) => {
      return {
        id: item.id ,
        name: `(${item?.attributes.account_code}) ${item.attributes.account_name}`
      }
    } )
  }).catch((error)=> {
    if (error.status == 401) {
      router.push(`/auth/login?return=${router.currentRoute.value.path}`)
    }
  })


  APIHandlers.get('/core/get_branches/').then((response: any) => {
    branches.value  =  response.data.map((item: any)=> {
      return {
        id: item.id,
        name: `(${item?.branch_code}) ${item?.nickname}`
      }
    })
  }).catch(error => {
    if (error.status == 401) {
      router.push(`/auth/login?return=${router.currentRoute.value.path}`)
    }
  })
})


watch(()=>transaction_ledger_data.is_ibt, (new_value, old_value)=> {
  if(!new_value) {
    transaction_ledger_data.branch_id  =  null
  }
})

</script>