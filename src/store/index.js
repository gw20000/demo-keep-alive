import Vue from 'vue'
import Vuex from 'vuex'

import user from "./user"
import setting from "./setting"
import  cachedComponents from "./cachedComponents"

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  modules: {
    user,
    setting,
    cachedComponents,
    
  },
  
})
