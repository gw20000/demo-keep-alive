
  import styles from "@/styles/message.module.less";
  import {getComponentRootDom} from "@/utils";
 import Icon from "@/components/Icon";
 
 
 
 /**
  *     @param  {String} content    消息内容        : 默认为 ""
  *     @param  {[String]} type     消息类型        ： success / warn/ error/info 
  *     @param  {Number} durarion   动画时间        : 单位ms   //  过渡动画延迟开始时间 :单位ms
  *     @param  {Object} container  dom对象（容器）  : 消息会显示到容器正中，默认为 document.body
  *      @param  {function} callback  回调函数      : 移除消息时 ，可能会做一些事情，例如跳转页面
  */ 
 export default function showMessage(options={}){
   
         // console.log("options.container",options.container);
 
        const content = options.content || "this is a pop message in body";
         const type = options.type || "info";
          const duration = options.duration || 2000;
           const container = options.container || document.body;
 
 
       // console.log("container",container);
 
 
      //容器没有传，默认为body
        // if(!container){
        // 	    container = document.body;
        //   container.style.position="relative";
        // }
     //判断容器的position是否改动过（默认为static），即容器不能是静态位置
     if(options.container){ //（body的高度可能为0 也可能超过视口高度）body没有设置定位，就会相对html，而html没有设置定位，就会相对于viewport定位
         if(getComputedStyle(container).position==="static"){//得到dom元素的最终样式
             container.style.position = "relative";
     }
 
     }
    
      const typeMap = {
         success: 'correct',
         warn: 'warning',
         error: 'error',
         info: "info",
      };
      //创建消息元素
       const div = document.createElement("div");
       // const span = document.createElement("span");
       // span.innerHTML = content;
      //得到Icon组件渲染的真实dom（但没有挂载到页面某个元素位置上）
       const IconDom = getComponentRootDom(Icon,{className:typeMap[type]});
       // console.log(typeof IconDom , IconDom); //IconDom 是一个Dom对象
        
       // console.log( IconDom.outerHTML ); //获取描述dom元素的html片段  (然后用innerHTML插入元素也可以)
      div.innerHTML = `<div class=\"${styles.icon}\">${IconDom.outerHTML}</div><span>${content}</span>`
       // div.appendChild(IconDom);
       // div.appendChild(span);
       container.appendChild(div);
       // // 设置样式
 
       // div.className = styles.message;
       // div.classList.add(styles[type]);
 
      div.className = `${styles.message}  ${styles['message-'+type]}`;
 
       //动效 方案一： 关键帧动画 + 定时器
       // div.style.animation = `${styles.pop} ${duration/1000}s forwards` ;
 
       // let timer = setTimeout(function(){
       //   container.removeChild(div);
       //   clearTimeout(timer);
       // },duration);
 
 
       //动效 方案一：过渡动画 + 强制渲染浏览器 + 事件(ontransitionend)+定时器
 
 
 
     
         div.classList.add(`${styles.state1}`);
         div.clientHeight;//由于浏览器渲染是异步的，因此，需要 强制渲染一次浏览器 ，以看到前面代码的效果（state1 的效果不会被state2 覆盖），防止被后面代码覆盖
         div.classList.add(`${styles.state2}`);
           
 
         
          div.addEventListener("transitionend",function(){
 
           div.style.transition = `.3s ${duration/1000}s`;
          
 
            div.classList.add(`${styles.state3}`);
 
 
            let timer = setTimeout(function(){
 
                div.remove();
                // 当消息元素消失的时候，运行回调函数
                options.callback && options.callback();
                clearTimeout(timer);
 
             },duration+300)
 
 
          },{once:true});// handler 只会调用一次，listener 会在其被调用之后自动移除。
 
          
 
   
 
 
        
      
 }