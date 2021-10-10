import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import {loadingBar} from "@/utils"
import store from "@/store"
loadingBar.config.color = "blue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Layout',
    component: Layout,
    children:[

      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home'),
        meta:{
          title:"主页",
          // auth:true,
         }
      },
      {
        path: 'orderlist',
        name: 'OrderList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/OrderList'),
        meta:{
          title:"订单列表",
          module:"订单管理",
          auth:true,
         }
      },
      {
        path: '/stafflist',
        name: 'StaffList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/StaffList'),
        meta:{
          title:"员工列表",
          module:"员工管理",
          auth:true,

         }

      },
      {
        path: '/news',
        name: 'News',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/News'),
        meta:{
         title:"新闻",
        },
      },
    
            {
              path: '/about',
              name: 'About',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '@/views/PersonalCenter/About'),
              meta:{
               title:"个人信息",
               module:"个人中心",
               auth:true,
              },
            },
            {
              path: 'chat',
              name: 'Chat',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '@/views/PersonalCenter/Chat'),
              meta:{
               title:"聊天",
               module:"个人中心",
               auth:true,
              },
            },
            {
              path: 'friends',
              name: 'Friends',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '@/views/PersonalCenter/Friends'),
              meta:{
               title:"好友",
               module:"个人中心",
               auth:true,
              },
            },
            
    

    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login'),
    meta:{
      title:"登录"
     }
  },
  {
    path: '*',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/NotFound'),
    meta:{
     title:"404"
    }
  },
  


]






const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




// 路由跳转成功之后，走 afterEach

// router.afterEach((to,from)=>{
 
//   // console.log(to.meta.title)
//   document.title = `${process.env.VUE_APP_TITLE}-${to.meta.title}`;
//   // 在beforeEach里面才有 next()方法，afterEach不能让时光倒流; 不调用这个方法，就不会导航过去

// });

// 路由跳转之前，走 beforeEach
////导航守卫 /路由拦截器    (所有的路由切换都要经过 导航守卫/路由拦截器)
router.beforeEach((to,from,next)=>{
document.title = `${process.env.VUE_APP_TITLE}-${to.meta.title}`;

loadingBar.start();
console.log(from.name,to.name);
console.log("loginState",store.getters["user/loginState"]);
const status = store.getters["user/loginState"];

//如果目标页面需要鉴权
if(to.meta.auth){

//判断登录状态

if(status=='unlogin'){
   //如果未登录，跳转到login页面，并 携带目标页面的参数 ，以便登录成功后跳转到目标页面
  next({
          name:'Login',
         query:{
            name:to.name,
          }
      }); 
   }
   //如果已经登录（或登录信息未失效），恢复登录状态 并 跳转到目标页面
  else{
    if(store.state.user.user=='') store.commit('user/recoverLoginState');

     next();
  }


}

//如果目标页面不需要 鉴权 ，直接跳转到目标页面
else {
  if(status=='login')  store.commit('user/recoverLoginState');
  next();
  
} 

});


router.afterEach((to,from)=>{
  setTimeout(()=>{
   loadingBar.finish();

  },1500);
  
  
  
 
});

export default router
// 🌈师 ：懂小姐  之    鉴权 登录  恢复登录状态 
 // 鉴权： 如果不是login页面，其他页面都需要鉴权
// 设置登录 和 登出： 同时操作 用户登录信息  和 本地存储  ，并且改变仓库状态 都是使用的是  dispach （触发action ，师的理由是，这样devtool可以监控到仓库状态变化，否则，有些状态变化监控不到）
// 恢复登录状态 ： 网站初始化的时候 直接读取本地存储为用户登录信息  ，如果读到了，就是 login状态， 如果没读到，就是unlogin状体。 达到了自动恢复登录状态的目的。
//本地存储使用 cookie  ， 并使用 js-cookie 第三方库 来操作cookie。
//用户的登录信息user 的每个字段分别存到一个cookie。    而我，是直接整体作为一个字段 user 存储到一个 cookie/localStaorge


//师： 董小姐 ，根据用户role ，动态分配路由。  ： 根据用户权限，动态渲染菜单栏。 




