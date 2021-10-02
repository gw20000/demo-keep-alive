<template>
<div class="layout1-container">
 
   <div class="left" :style="{width:leftWidth+'px',transition:`width .5s`}">
          <slot name="left"></slot>
   </div>
 
 <div class="main">
     <slot name="default"> </slot>
 </div>
   
   <div class="right" :style="{width:rightWidth+'px'}">
         <slot name="right"></slot>
   </div>
  
  




</div>


</template>

<script>
export default {
   name:"Layout1",
   props:{
        leftWidth:{
            type:Number,
            // required:true,
            default:0,
        },
         rightWidth:{
            type:Number,
            // required:true,
            default:0,
        }
   }
}
</script>

<style lang="less" scoped>

 .layout1-container{
     
     height: 100%;
     width:100%;
     display: flex;
    
 }
 .main{
       flex: 1 1 auto;
       background: yellow;
 }
.left,.right{
    flex: 0 0 auto;
     background:rgb(58, 60, 60);
   

}
.left{
      overflow-x: hidden;
      white-space: nowrap;
}
</style>