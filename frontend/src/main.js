import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.less';
import components from './components/global';
import Router from './router/index';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';
import './styles/light/css-vars.css';

const app = createApp(App)
const pinia = createPinia()

app.config.productionTip = false

// components
for (const i in components) {
  app.component(i, components[i])
}

app.use(pinia)
app.use(Router).mount('#app')
