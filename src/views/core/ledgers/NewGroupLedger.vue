<template>
  <h1 class="text-2xl py-4 text-blue-900"> New Group Ledger</h1>

  <div>
    <v-form v-model="valid" @submit.prevent="HandleFormSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-select label="Master Account" variant="outlined" v-model="group_ledger_data.master_ledger_id"
                      :items="master_ledgers" item-title="name" item-value="id" :rules="rules"></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="group_ledger_data.account_code" :rules="rules" :counter="10"
                          label="Account Code" variant="outlined" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="group_ledger_data.account_name" :rules="rules" :counter="10"
                          variant="outlined" label="Account Name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="group_ledger_data.account_name_np" :rules="rules" :counter="10"
                          variant="outlined" label="Account Name Np" required></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-checkbox v-model="group_ledger_data.is_active" label="Is Active" variant="outlined"></v-checkbox>
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
import ApiHandler from '@/utils/APIHandlers';
import {onMounted} from 'vue';
import {reactive, ref} from 'vue';
import RedirectLoginPage from "@/utils/RedirectLoginPage";
import {useRouter} from 'vue-router';
import {useToast} from "vue-toastification";


const router = useRouter()
const toast = useToast()


const group_ledger_data = reactive({
  account_code: "",
  account_name: "",
  account_name_np: "",
  is_active: true,
  master_ledger_id: null
})
const valid = ref(false)
const rules = reactive([
  (value: any) => {
    if (value) return true
    return 'Required.'
  }
])
const master_ledgers = ref([])

const loading = ref(false)

const APIHandlers = new ApiHandler()

const HandleFormSubmit = () => {
  if (valid.value) {

    APIHandlers.post('/transaction/new_group_ledger', group_ledger_data).then(response => {
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
  APIHandlers.get('/transaction/all_master_ledger').then((response: any) => {
    let resp_data = response.data.map((item: any) => {
      return {
        id: item.id,
        name: `(${item?.master_code}) ${item.account_name}`
      }
    })
    master_ledgers.value = resp_data
  })
})


</script>

