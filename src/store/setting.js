export default {

     namespaced:true,

     state: {
          menuData: [
               {
                    title: "员工管理",
                    iconClass: "bi-person-circle",
                    items: [
                         { item: "员工列表", to: "/stafflist" },
                         { item: "xxx", to: "" },
                         { item: "xxx", to: "" },

                    ]
               },
               {
                    title: "订单管理",
                    iconClass: "bi-card-list",
                    items: [
                         { item: "订单列表", to: "/orderlist" },
                         { item: "xxx", to: "" },
                         { item: "xxx", to: "" },
                    ]
               }



          ],
          isCollpase:false,
          
     },
     mutations: {
          togleCollapseState(state){

               state.isCollpase = !state.isCollpase;
              console.log("isCollpase",state.isCollpase);
          },
          
     },
     actions: {

     }








}