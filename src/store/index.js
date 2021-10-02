import Vue from 'vue'
import Vuex from 'vuex'
import setting from "./setting"
import  cachedComponents from "./cachedComponents"

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  modules: {
    setting,
    cachedComponents,
  },
 
})
