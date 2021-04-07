import { createApp } from 'vue'
import { router } from './router'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'
import {ElTooltip, ElTableColumn, ElTable,ElButton,ElAlert, ElDialog, ElInput, ElSelect, ElOption, ElPopover, ElCheckbox, ElTabs, ElTabPane, ElPagination, ElNotification } from 'element-plus'
import store, { key } from './store'
import 'element-plus/lib/theme-chalk/index.css';
import './config/theme.scss'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont'

const app = createApp(App)

app
  .use(store, key)
  .use(router)
  .use(ElButton)
  .use(ElDialog)
  .use(ElInput)
  .use(ElSelect)
  /**@ts-ignore */
  .use(ElOption)
  .use(ElPopover)
  .use(ElCheckbox)
  .use(ElTabs)
  .use(ElTabPane)
  /**@ts-ignore */
  .use(ElPagination)
  .use(ElAlert)
  .use(ElTable)
  /**@ts-ignore */
  .use(ElTableColumn)
  /**@ts-ignore */
  .use(ElTooltip)
app.mount('#app')