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
   //如果未登录，跳转到login页面，并携带目标页面的参数 ，登录成功跳转到目标页面
  next({
          name:'Login',
         query:{
            name:to.name,
          }
      }); 
   }
   //如果已经登录（或登录信息未失效），恢复登录状态
  else{
    store.commit('user/recoverLoginState');
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
