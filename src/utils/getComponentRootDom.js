  
import Vue from "vue";
// import Icon from "@/components/Icon";
  //得到一个组件渲染的dom元素

  // 实例成员: $el : 可以拿到一个组件实例或vue实例渲染出来的根元素:


 // 🔥得到组件渲染后的根元素（真实dom）：把一个组件渲染出来，但是渲染出来的真实dom，并不挂载到页面上某个元素位置上。
/**
 *     @param  {Object} comp   组件配置对象
 *     @param  {Object} props   组件的属性    例如  { className:"homepage",}
 *    
 */
export default function getComponentRootDom(comp,props){
   const vm = new Vue({
    render: h=>h(comp,{props:props}),//通过h函数，直接渲染虚拟节点： 渲染一个组件，只不过这个组件有些属性。
      // h(vnode，props，children)
   });
 vm.$mount();//不挂载的话， 生成不出来真实的dom
 return vm.$el; //  $el就是vue实例渲染出来的真实dom根元素
}



// console.log("组件Icon的配置对象",Icon);

// const IconRoot = getComponentRootDom(Icon,{className:"homepage"});//template中也可以传组件的属性，但是模板最终也要编译成render函数 ，这里直接用一个函数 把组件和组件的属性传递进去，返回一个真实的dom，这个真实dom不再页面上


// console.log("Icon组件渲染出来的一个元素",IconRoot);
