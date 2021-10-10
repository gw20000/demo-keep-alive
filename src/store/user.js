
//用户登录信息

 export default {

     namespaced:true,

    state:{
        user:'',
        
        
    },
   getters:{
       loginState(state){
           if(state.user || window.localStorage.getItem("user")) return "login"
            else return "unlogin";

       }
   },
   mutations:{
       setLogin(state,payload){
           state.user = payload ;
           window.localStorage.setItem("user",JSON.stringify(payload));
       },
       setLogout(state){
        state.user = '';
        window.localStorage.setItem("user",'');
       },
      recoverLoginState(state){
          console.log("recover");
      state.user = JSON.parse(window.localStorage.getItem("user"));
      }
     
   },

   actions:{
       
   }

}

