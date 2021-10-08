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
   },
   mounted(){
        document.body.addEventListener('touchstart',(e)=>{
            //   console.log("x1",e.touches[0].clientX);
                let x1 = e.touches[0].clientX

               document.body.addEventListener('touchmove',(e)=>{
            //   console.log("x2",e.touches[0].clientX);
                  if(e.touches[0].clientY<60)return;
                
                  let x2 = e.touches[0].clientX
                  let  diff = x2-x1;
                  if(diff>0){
                        this.$store.commit("setting/setColapsFalse");
                  }else if(diff<0){
                         this.$store.commit("setting/setColapsTrue");
                  }


             });

       });

     
   }
}
</script>

<style lang="less" scoped>

 .layout1-container{
     
     height: 100%;
     width:100%;
     display: flex;
    overflow: hidden;
 }
 .main{
       flex: 1 1 auto;
       background: yellow;
       height: 100%;
      overflow-x:hidden;
      overflow-y: auto;
 }
.left,.right{
    flex: 0 0 auto;
     background:rgb(58, 60, 60);
     height: 100%;
      overflow-x:hidden;
      overflow-y: auto;

}
.left{
      white-space: nowrap;
}

@media (max-width:650px) {
    .left{
        position: fixed !important;
        z-index: 1050;
        height: 100vh;
      opacity: .9;
    }
}
</style>