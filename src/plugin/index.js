
//所有的    工具方法，样式，自定义指令， 全局组件 ，组件配置混入对象（全局混入），全局过滤器 。。。 都可以通过插件注入到全局 ， 之后，在vue组件中可以直接使用，无需导入和注册。 


import "./global.css"
import Center from  "./Center"
// import loadingBar from "./loadingBar"

export default {


     install(Vue,options){
        //  console.log('pugin options:',options);
         //注入实例方法
          Vue.prototype.sayHello=()=>{
               console.log("hello");
          };
          //注入静态方法 或 属性  （我觉得没啥用）
        //   Vue.sayHi=()=>{
        //     console.log("hi");
        //   };


      //  Vue.loadingBar = loadingBar;


        //   注入组件配置 （注入 组件配置混入对象 到 全局，会影响每一个组件实例， 不推荐在工程中使用）
        // Vue.mixin({
        //     created: function () {
        //       // some logic ...
               
        //     }
        
        //   });
        //注册 全局指令 （注册一个自定义指令 到 全局）
        //   Add one or more global assets: directives/filters/transitions/components 
        Vue.directive("v-loading",{ //自定义指令 ： 针对dom元素，提供的生命周期钩子函数
            bind (el, binding, vnode, oldVnode) {
                // some logic ...
              }
        });

        //注册 全局组件 （注册一个自定义组件 到 全局）
        // register an extended constructor
        // Vue.component('my-component', Vue.extend({ /* ... */ }))
          //同上
         // register by  an component options object (automatically call Vue.extend)
       Vue.component(Center.name , Center);

    //注册全局过滤器 （过滤器就是一个函数） 
      Vue.filter('capitalize', function (value) {
        // return processed value
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      })
     }


}

