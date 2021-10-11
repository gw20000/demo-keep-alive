import Vue from 'vue'
import Vuex from 'vuex'

import user from "./user"
import setting from "./setting"
import  cachedComponents from "./cachedComponents"

Vue.use(Vuex)

let store = new Vuex.Store({
  strict:true,
  modules: {
    user,
    setting,
    cachedComponents,
    
  },

})
window.store = store;
export default store