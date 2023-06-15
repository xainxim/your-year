import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


// App.use(BootstrapVue)
const app = createApp(App);
app.use(router).mount('#app')
