import Vue from 'vue'
window.console.log = function(){

}
import VCharts from 'v-charts'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import { Button,Form,Modal } from 'ant-design-vue';
// Vue.use(Button);
// Vue.use(Form);
// Vue.use(Modal);
Vue.use(Antd);
Vue.use(VCharts);
// console.log(Antd);
// console.log(Button);
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


