import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css'

import './index.css'
// import router from './router.js';
const app = createApp(App);
app.use(ElementPlus);
app.mount('#app')
