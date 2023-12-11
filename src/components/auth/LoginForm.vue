
<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://cdn.icon-icons.com/icons2/3005/PNG/512/vue_js_icon_188136.png"
                alt="logo">
            CBS
        </a>
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleLogin">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            email</label>
                        <input type="email" name="email" id="email" v-model="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
                            placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" v-model="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  block w-full p-2.5 "
                            required>
                    </div>

                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Branch</label>
                        <select id="countries" v-model="branch_id"
                            class="bg-gray-50 px-3 border w-full h-[35px] border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none">
                            <option>Choose Branch</option>
                            <option :value="branch.id" v-for="branch in branches">{{ branch.nickname }}
                            </option>
                            <!-- <option value="2">Branch 2</option>
                            <option value="3">Branch 3</option>
                            <option value="4">Branch 4</option> -->
                        </select>
                        <p v-show="invalidBranch" class="text-xs text-red-600">Invalid Branch</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot
                            password?</a>
                    </div>
                    <button type="submit"
                        class="w-full text-black bg-blue-400 hover:bg-blue-500  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                        in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import APIHandlers from '@/utils/APIHandlers';
import { ref } from 'vue';
import { inject } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'


const branches = ref<any>([])
const router = useRouter()
// payload data 

const email = ref<string>('')
const password = ref<string>('')
const branch_id = ref<number>(0)
const invalidBranch = ref<boolean>(false)
const toast = useToast();
const bus: any = inject("$bus")


onMounted(() => {
    APIHandlers.get('/core/get_branches').then(response => {
        if (response.status == 200) {
            branches.value = response.data


        }
    }).catch(error => {
        if (error.status == 401) {

        }

    })
})


const handleLogin = () => {
    let login_payload = {
        "user": {
            "email": email.value,
            "password": password.value,
            "branch_id": branch_id.value
        }
    }

    if (branch_id.value > 0)
        APIHandlers.postWithoutBearer('/login', login_payload).then(response => {
            localStorage.setItem('authToken', response.headers.authorization)
            if (response.status == 200) {
                toast.success('User Login successfully')
                bus.$emit("user-authorized", true);
                router.currentRoute.value.query.return ? router.push({ path: router.currentRoute.value.query.return.toString() }) : router.push('/')
            }


        }).catch(err => {
            console.log(err);
            toast.error('Invalid Credentials')
        })




}

</script>
