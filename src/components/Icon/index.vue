<!-- 图标组件 -->

<template>
	
<i class="iconfont icon-container" :class="iconClass" ></i>


</template>

<script >

/* eslint-disable */
//我：一些常量（永不会改变的数据），可以不用做成响应式数据 （因为vue没有必要监控永远不会变化的数据是否变化了 ，这回浪费vue的效率）


  //做一个映射 ，以提高代码的可阅读性， 可维护性 
  const iconMap = {

         downArrow:"icon-xiajiantou",
         upArrow:"icon-shangjiantou",
         qq:"icon-qq",
         info:"icon-xinxiinformation38",
         about:"icon-set_about_hov",
         wechat:"icon-z-weixin",
         leaveMsg:"icon-liuyan",
         blog:"icon-blog",
         warning:"icon-jinggao",
         correct:"icon-zhengque",
         error:"icon-cuowu1",
         homepage:"icon-zhuye",
         email:"icon-email",
         empty:"icon-empty",
         code:"icon-code",
         close:"icon-guanbi",
         github:"icon-GitHub",

        	};



//如果组件没有配置，可以不写该条导出语句， 或者不写script标签 也可以。
export default {
     props:{

     	className:{
          type:String,
          required:true,
     	},
     },


      data(){
        return {
       //做一个映射 ，以提高代码的可阅读性， 可维护性 
         //   iconMap:{

         // downArrow:"icon-xiajiantou",
         // upArrow:"icon-shangjiantou",
         // qq:"icon-qq",
         // info:"icon-xinxiinformation38",
         // about:"icon-set_about_hov",
         // wechat:"icon-z-weixin",
         // leaveMsg:"icon-liuyan",
         // blog:"icon-blog",
         // warning:"icon-jinggao",
         // correct:"icon-zhengque",
         // error:"icon-cuowu1",
         // homepage:"icon-zhuye",
         // email:"icon-email",
         // empty:"icon-empty",
         // code:"icon-code",
         // close:"icon-guanbi",
         // github:"icon-GitHub",

        	// },
        };

      },



      computed:{
        //图标类样式 
      	iconClass:{

            get(){
            	// console.dir(this); //🍊这里的this向vue组件实例，因为js代码是要经过vue编译过后才去执行的。
            	return iconMap[this.className]; // 依赖变，计算属性就重新计算
            }

      	},

      //计算属性简写
    // iconClass(){

    //   	        console.dir(this);
    //         	return this.iconMap[this.className];
    //   },



      }


     

}




</script>


<style scoped>
	@import "//at.alicdn.com/t/font_2606841_ufs3bav597.css";


 /*子组件不太会知道父组件需要有什么样的控制，为了方便父组件调整 子父组件的样式， vue使得 父组件可以影响子组件的根元素的样式 （我：这说明，父子组件之间并不是完全隔绝的，父组件不仅可以 属性传递，而且还可与调整子组件的根元素的样式）*/
   .iconfont{

   	 color: inherit;
     font-size: inherit;
   }
    
</style>