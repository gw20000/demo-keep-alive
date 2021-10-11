


const cachedComponents =  {

   
    namespaced:true,

    state:{
      //路由的名字  就是 组件的名字  ，因此，不用映射了。
        // path2CompNameMap:{
        //    "/stafflist":'StaffList',
        //    "/orderlist":'OrderList',
        //    "/about" :'About',
        //    "/chat":'Chat',
        //    "/friends":'Friends',
        //    "/news":'News',
        //    "/add":'Add',
        //    "/index":'Index'

        // },
        cachedComponents:[],
        //顶层缓存组件
        TopLayerCachedCompNames:Object.freeze(["StaffList,Orders,PersonalCenter","Home"]),
       // 对应 子层缓存组件
        PersonalCenterSubCachedCompNames:Object.freeze(['About','Chat','Friends']),
        OrdersSubCachedCompNames:Object.freeze(['Add','OrderList']),
        HomeSubCachedCompNames:Object.freeze(['Index']),
   },

   mutations:{
     //添加缓存组件
    addCachedComponent(state,payload){
     
     let  isAdded = false;//如果已经添加过了，就不在重复添加
      state.cachedComponents.forEach(i=>{
        if(i.to.name==payload.to.name)  isAdded = true;
      })
      if(isAdded) return;
       state.cachedComponents.push(payload);
      //  console.log(state.cachedComponents);
    },

    //移除缓存组件
    removeCachedComponent(state,payload){
      
  state.cachedComponents.findIndex((i,index,initArr)=>{
          if(i.to.name===payload.to.name){
           initArr.splice(index,1);
            return true;
          }
      });
    },
    //清空缓存组件
    removeAllCachedComponents(state){
      state.cachedComponents = [];
    }
  },
  //仓库的计算属性 
  getters:{
         cachedCompNames(state){
          
         let    cachedCompNamesArr =  state.cachedComponents.map(i=>i.to.name);

               
           console.log(cachedCompNamesArr);
                 return  cachedCompNamesArr;
         },
         cachedCompNames2(state,getters){
          //  let arr =  ["StaffList","Orders,PersonalCenter","Home"];
            let arr = [];
           let flagP , flagO,flagH ,flagS;
           console.log("state,getters",state,getters);
          getters.cachedCompNames.findIndex((name)=>{
              if( state.PersonalCenterSubCachedCompNames.indexOf(name)>-1)  flagP=true  ;
              if( state.OrdersSubCachedCompNames.indexOf(name)>-1)  flagO =true;
              if(state.HomeSubCachedCompNames.indexOf(name)>-1) flagH = true;
              if(name == 'StaffList')  flagS = true;
         });
           arr = [
             `${flagS ? "StaffList" : ''}`,
             `${flagO ? "Orders" : ''}`,
             `${flagP ? "PersonalCenter" : ''}`,
             `${flagH ? "Home" : ''}`,
                   
          ];
          console.log('cachedCompNames2',arr);
          return arr;
         } 
      
  }

}
// window.cachedComponents = cachedComponents;

export default cachedComponents;