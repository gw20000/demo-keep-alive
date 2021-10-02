import Vue from 'vue'
import MyPlugin from "@/plugin"
Vue.use(MyPlugin,{someOptions:true});
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// document.title = `${process.env.VUE_APP_TITLE}-${vm.$route.meta.title}`//拿不到路有信息，因为，main.js不受路由管制


