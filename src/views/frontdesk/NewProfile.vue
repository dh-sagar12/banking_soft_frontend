<template>
    <h1 class="text-2xl py-4 text-blue-900">Profile Registration</h1>

    <v-form v-model="valid" @submit.prevent="HandleFormSubmit">
        <v-container>
            <v-row>

                <v-col cols="12" md="2">
                    <v-text-field variant="outlined" type="date" v-model="introduced_date" :rules="nameRules" :counter="10"
                        label="Introduced Date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="1">
                    <v-select label="Salutation" v-model="salutation" variant="outlined"
                        :items="['Mr', 'Ms', 'Mrs', 'Other']"></v-select>

                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field variant="outlined" v-model="first_name" :rules="nameRules" :counter="10"
                        label="First name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field variant="outlined" v-model="middle_name" :counter="10" label="Middle name"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field variant="outlined" v-model="last_name" :rules="nameRules" :counter="10" label="Last name"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                    <v-select label="Gender" variant="outlined" v-model="gender"
                        :items="['Male', 'Female', 'Other', 'NotSpecified']"></v-select>
                </v-col>

                <v-col cols="12" md="2">
                    <v-select label="Maritial Status" variant="outlined" v-model="maritial_status"
                        :items="['Single', 'Married', 'UnMarried', 'Divorced', 'Seperated']"></v-select>
                </v-col>

                <v-col cols="12" md="2">
                    <v-text-field variant="outlined" type="date" v-model="date_of_birth" :rules="nameRules" :counter="10"
                        label="Date Of Birth" required></v-text-field>
                </v-col>
                <v-col cols="12" md="1">
                    <label for="">Is Minor</label>
                    <v-switch v-model="is_minor"></v-switch>
                </v-col>
                <v-col cols="12" md="1">
                    <label for="">Is Residensial</label>
                    <v-switch v-model="is_residential"></v-switch>
                </v-col>
            </v-row>
        </v-container>


        <!-- contact information  -->
        <v-container>
            <h2 class="text-xl text-blue-900 mb-10">Contact Information</h2>
            <v-row>
                <v-col cols="12" md="2">
                    <v-select label="Contact Relation" variant="outlined" v-model="contact_relation"
                        :items="['Self', 'Father', 'Mother', 'GrandFather', 'GrandMother', 'Spouse', 'Other']"></v-select>
                </v-col>

                <v-col cols="12" md="2">
                    <v-select label="Contact Type" variant="outlined" v-model="contact_type"
                        :items="['Mobile', 'LandLine', 'Fax', 'Other']"></v-select>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field variant="outlined" v-model="contact_number" :rules="nameRules" :counter="10"
                        label="Contact Number" required></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-btn icon="mdi-plus" :disabled="!contact_number" color="indigo-darken-3" size="large"
                        @click="MakeKycContactPayload"></v-btn>
                </v-col>
            </v-row>

            <v-row>
                <DataTable :data_columns="['contact_relation', 'contact_type', 'contact_number']" :data_set="kyc_contacts"
                    v-slot="slotProps" height="200px">
                    <td>
                        <v-btn icon="mdi-close" color="red-darken-3" size="30px" class="mx-2"
                            @click="DeleteSelectedContact(slotProps.id)"></v-btn>
                        <v-btn icon="mdi-pencil" color="indigo-darken-3" size="30px"
                            @click="UpdateSelectedContact(slotProps.id)"></v-btn>
                    </td>
                </DataTable>
            </v-row>
        </v-container>


        <!-- address information -->
        <v-container>
            <h2 class="text-xl text-blue-900 mb-10">Address Information</h2>
            <v-row>
                <v-col cols="12" md="2">
                    <v-select label="Address Type" variant="outlined" v-model="address_type"
                        :items="['Temporary', 'Permanent']"></v-select>
                </v-col>

                <v-col cols="12" md="2">
                    <v-select label="Province" variant="outlined" v-model="province" :items="province_data"
                        item-title="name" item-value="id"></v-select>
                </v-col>

                <v-col cols="12" md="2">
                    <v-select label="District" variant="outlined" v-model="district" :items="district_data"
                        :disabled="!province" item-title="name" item-value="id"></v-select>
                </v-col>

                <v-col cols="12" md="4">
                    <v-select label="Local Body" variant="outlined" v-model="mn_vdc" :items="mn_vdc_data" item-title="name"
                        :disabled="!district" item-value="id"></v-select>
                </v-col>

                <v-col cols="12" md="1">
                    <v-text-field type="number" variant="outlined" v-model="ward_no" :rules="nameRules" label="Ward"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field variant="outlined" v-model="street" label="Street"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field variant="outlined" v-model="tole_name" label="Tole Name"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-btn icon="mdi-plus" :disabled="!(province && district && mn_vdc && ward_no)" color="indigo-darken-3"
                        size="large" @click="MakeKycAddressPayload"></v-btn>
                </v-col>
            </v-row>

            <v-row>
                <DataTable
                    :data_columns="['address_type', 'province', 'district', 'mn_vdc', 'ward_no', 'street', 'tole_name']"
                    :data_set="kyc_address_table_data" height="200px" v-slot="slotProps">
                    <td>
                        <v-btn icon="mdi-close" color="red-darken-3" size="30px" class="mx-2"
                            @click="DeleteSelectedAddress(slotProps.id)"></v-btn>
                        <v-btn icon="mdi-pencil" color="indigo-darken-3" size="30px"
                            @click="UpdateSelectedAddress(slotProps.id)"></v-btn>
                    </td>
                </DataTable>
            </v-row>
        </v-container>

        <v-col cols="12" md="3">
            <v-btn type="submit" color="indigo-darken-3" :loading="loading" size="large"> Save </v-btn>

            <router-link :to="`/frontdesk/profile`">
                <v-btn color="red-darken-3" size="large" class="mx-3"> Cancel </v-btn>
            </router-link>
        </v-col>

    </v-form>
</template>


<script lang="ts" setup>
import DataTable from '@/components/utilities/DataTable.vue';
import APIHandlers from '@/utils/APIHandlers';
import RedirectLoginPage from '@/utils/RedirectLoginPage';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { reactive } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'

const router = useRouter()
const loading = ref(false)
const toast = useToast()
const valid = ref(false)
const first_name = ref('')
const middle_name = ref('')
const introduced_date = ref('2023-12-11')
const date_of_birth = ref('2023-12-11')
const last_name = ref('')
const salutation = ref('')
const gender = ref('')
const maritial_status = ref('')
const is_minor = ref(false)
const is_residential = ref(true)
const nameRules = reactive([
    (value: any) => {
        if (value) return true

        return 'required.'
    }
])
const emailRules = reactive([
    (value: any) => {
        if (value) return true

        return 'E-mail is required.'
    },
    (value: string) => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    },
])

// contact information 

const kyc_contacts = ref<any[]>([])

const contact_relation = ref('Self')
const contact_type = ref('Mobile')
const contact_number = ref('')



// address information

const province_data = ref([
    {
        id: 1,
        name: 'Province 1'
    },
    {
        id: 2,
        name: 'Province 2'
    },
    {
        id: 3,
        name: 'Province 3'
    },
    {
        id: 4,
        name: 'Province 4'
    },
    {
        id: 5,
        name: 'Province 5'
    },
    {
        id: 6,
        name: 'Province 6'
    },
    {
        id: 7,
        name: 'Province 7'
    },

])
const district_data = ref<any>([])
const mn_vdc_data = ref<any>([])

const all_address_data = reactive<any>({ district: [], mn_vdcs: [] })
const kyc_address_table_data = ref<any>([])




// pay load address
const kyc_addresses = ref<any[]>([])

const address_type = ref('Temporary')
const province = ref()
const district = ref()
const mn_vdc = ref()
const ward_no = ref()
const street = ref('')
const tole_name = ref('')





onMounted(() => {
    APIHandlers.get('/core/get_addresses').then((response: any) => {

        all_address_data.district = response.data.districts
        all_address_data.mn_vdcs = response.data.mn_vdcs
    }).catch((error: any) => {
        if (error.status == 401) {
            RedirectLoginPage()
        }

        error.data.data.forEach((error: any) => {
            toast.error(error)
        });
    })
})

watch(province, () => {
    district_data.value = all_address_data.district.filter((dis: any) => dis.province_id == province.value).map((dis: any) => {
        return {
            id: dis.id,
            name: dis.district_name
        }
    })
})

watch(district, () => {
    mn_vdc_data.value = all_address_data.mn_vdcs.filter((mn: any) => mn.district_id == district.value).map((mn: any) => {
        return {
            id: mn.id,
            name: mn.municipality_name
        }
    })
})

watch(kyc_addresses.value, () => {
    kyc_address_table_data.value = kyc_addresses.value.map((item: any) => {
        return {
            ...item, province: province_data.value.filter((p: any) => item.province_id == p.id)[0].name, district: all_address_data.district.filter((d: any) => d.id == item.district_id)[0].district_name, mn_vdc: all_address_data.mn_vdcs.filter((m: any) => m.id == item.mn_vdc_id)[0].municipality_name
        }
    })

})

const MakeKycContactPayload = () => {
    kyc_contacts.value.push(
        {
            contact_relation: contact_relation.value,
            contact_type: contact_type.value,
            contact_number: contact_number.value
        }
    )

    contact_relation.value = 'Self'
    contact_type.value = 'Mobile'
    contact_number.value = ''

}


const MakeKycAddressPayload = () => {
    kyc_addresses.value.push({
        address_type: address_type.value,
        province_id: province.value,
        district_id: district.value,
        mn_vdc_id: mn_vdc.value,
        ward_no: ward_no.value,
        street: street.value,
        tole_name: tole_name.value,
    })
    address_type.value = 'Temporary'
    province.value = null
    district.value = null
    mn_vdc.value = null
    ward_no.value = null
    street.value = ''
    tole_name.value = ''
}



const DeleteSelectedContact = (id: number) => {
    kyc_contacts.value.splice(id, 1)

}


const DeleteSelectedAddress = (id: number) => {
    kyc_addresses.value.splice(id, 1)

}



const UpdateSelectedContact = (id: number) => {
    let updating_contact = kyc_contacts.value.splice(id, 1)
    contact_relation.value = updating_contact[0].contact_relation
    contact_type.value = updating_contact[0].contact_type
    contact_number.value = updating_contact[0].contact_number
}


const UpdateSelectedAddress = (id: number) => {
    let updating_address = kyc_addresses.value.splice(id, 1)
    address_type.value = updating_address[0].address_type
    province.value = updating_address[0].province
    district.value = updating_address[0].district
    mn_vdc.value = updating_address[0].mn_vdc
    ward_no.value = updating_address[0].ward_no
    street.value = updating_address[0].street
    tole_name.value = updating_address[0].tole_name
}


const HandleFormSubmit = () => {
    loading.value = true
    if (kyc_addresses.value.length > 0 && kyc_contacts.value.length > 0) {
        let payload_data = {
            customer: {
                introduced_date: introduced_date.value,
                branch_id: 1,
            },
            kyc_personal: {
                is_minor: is_minor.value,
                is_residential: is_residential.value,
                salutation: salutation.value,
                first_name: first_name.value,
                middle_name: middle_name.value,
                last_name: last_name.value,
                gender: gender.value,
                date_of_birth: date_of_birth.value,
                maritial_status: maritial_status.value,
            },
            kyc_contacts: kyc_contacts.value,
            kyc_addresses: kyc_addresses.value,

        }
        APIHandlers.post('/kyc/new_customer', payload_data).then(response => {
            toast.success('Profile Registration Success!!')
            router.push('/frontdesk/profile')


        }).catch(error => {
            if (error.status == 401) {
                RedirectLoginPage()
            }

            error.data.data.forEach((error: any) => {
                toast.error(error)
            });


        })

    }
    else {
        toast.error('Invalid Kyc Contacts or Addresses')
    }
    loading.value = false

}
</script>