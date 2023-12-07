<script lang="ts" setup>

</script>

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
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            email</label>
                        <input type="email" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
                            placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  block w-full p-2.5 "
                            required>
                    </div>

                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Branch</label>
                        <select id="countries"
                            class="bg-gray-50 px-3 border w-full h-[35px] border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none">
                            <option>Choose Branch</option>
                            <option value="1">Branch 1</option>
                            <option value="2">Branch 2</option>
                            <option value="3">Branch 3</option>
                            <option value="4">Branch 4</option>
                        </select>
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