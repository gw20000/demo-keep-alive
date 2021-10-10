

export default {

     namespaced:true,

     state: {
          //🌈师，董小姐 ，把menuData 信息都放到了（融合到了） 路由的 meta里面了，  因为  菜单项 和 （页面）路由是有对应关系的。
          // 根据role 动态渲染 菜单栏 ： 首先根据登录用户role过滤路由，得到allowRoutes ，concat 到 路由规则里面去。 
           //                       然后（如果有需要），过滤menuData ，因为有些路由的 meta.title 不需要显示到菜单栏，例如 登录。 
          menuData: [

          //    用了 bstp 和 阿里 的icon-font   ， 师傅，董小姐 用了  ant design 的 icon 。 
          // 🌈小结 ： 基于vue ， 开发就是 ， 面向数据 ， 面向npm ， 面向组件库。 
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