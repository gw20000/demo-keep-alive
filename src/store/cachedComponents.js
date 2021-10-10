const cachedComponents =  {

   
    namespaced:true,

    state:{
        path2CompNameMap:{
           "/stafflist":'StaffList',
           "/orderlist":'OrderList',
           "/about" :'About',
           "/chat":'Chat',
           "/friends":'Friends',
           "/news":'News',

        },
        cachedComponents:[],
   },

   mutations:{
    addCachedComponent(state,payload){
     let isAdded = false;
      state.cachedComponents.forEach(i=>{
        if(i.to===payload.to)  isAdded = true;
      })
      if(isAdded)return;
       state.cachedComponents.push(payload);
    },
    removeCachedComponent(state,payload){
      
  state.cachedComponents.findIndex((i,index,initArr)=>{
          if(i.to===payload){
           initArr.splice(index,1);
            return true;
          }
      });
    },
    removeAllCachedComponents(state){
      state.cachedComponents = [];
    }
  },
  //仓库的计算属性 
  getters:{
         cachedCompNames(state){
            const arr = [];
            state.cachedComponents.findIndex((i)=>{
              // console.log(state.path2CompNameMap[i.to]);
                 arr.push(state.path2CompNameMap[i.to]);
            });
            console.log(arr);
            return arr;
         }
      
  }

}
// window.cachedComponents = cachedComponents;

export default cachedComponents;