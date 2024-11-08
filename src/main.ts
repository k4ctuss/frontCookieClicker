import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const userStateFromLocalStorage = localStorage.getItem('userState');
if (userStateFromLocalStorage) {
    pinia.state.value = JSON.parse(userStateFromLocalStorage);
}

watch(
    pinia.state,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        localStorage.setItem('userState', JSON.stringify(state))
    },
    { deep: true }
)

app.mount('#app')
