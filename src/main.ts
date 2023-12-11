import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/base.css'
import 'vue-toastification/dist/index.css' // if needed

import '@mdi/font/css/materialdesignicons.css'
import Toast from 'vue-toastification'



// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import $bus from '@/utils/Events'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.provide('$bus', $bus)
app.use(Toast, {
    position: "top-right",
    timeout: 2500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    rtl: false

})
app.mount('#app')

