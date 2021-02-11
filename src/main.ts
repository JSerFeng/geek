import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import vuex from 'vuex'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'
import { ElButton } from 'element-plus'
import store, { key } from './store'
import 'element-plus/lib/theme-chalk/index.css';
import './config/theme.scss'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes
})

app
  .use(store, key)
  .use(router)
  .use(ElButton)

app.mount('#app')