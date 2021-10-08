export default {

     namespaced:true,

     state: {
          menuData: [


               {
                    title: "主页",  
                    iconClass: "iconfont icon-zhuye",
                    to:"/",
                 

               },

               
               {
                    title: "员工管理",
                    iconClass: "bi bi-person-circle",
                    items: [
                         { item: "员工列表", to: "/stafflist" },
                         { item: "xxx", to: "" },
                         { item: "xxx", to: "" },

                    ]
               },
               {
                    title: "订单管理",
                    iconClass: "bi bi-card-list",
                    items: [
                         { item: "订单列表", to: "/orderlist" },
                         { item: "xxx", to: "" },
                         { item: "xxx", to: "" },
                    ]
               },
               {
                    title: "个人中心",
                    iconClass: "iconfont  icon-set_about_hov",
                    items: [
                         { item: "个人信息", to: "/about" },
                         { item: "聊天", to: "/chat" },
                         { item: "好友", to: "/friends" },
                      
                      


                    
                    ]

               },
               {
                    title: "新闻",  
                    iconClass: "iconfont  icon-set_about_hov",
                    to:"/news",
                 

               },
               



          ],
          isCollpase:true,
          
     },
     mutations: {
          togleCollapseState(state){

               state.isCollpase = !state.isCollpase;
              console.log("isCollpase",state.isCollpase);
          },
          setColapsTrue(state){

               state.isCollpase = true;
              console.log("isCollpase",state.isCollpase);
          },
          setColapsFalse(state){

               state.isCollpase = false;
              console.log("isCollpase",state.isCollpase);
          },
          
          
     },
     actions: {

     }






}