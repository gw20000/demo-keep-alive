<template>
<div class="layout1-container">
  
   <div  v-if ="!isMobile"   class="left" :style="{width:leftWidth+'px'}">
          <slot name="left"></slot>
   </div>

    <div  v-if="isMobile"   class="left" :style="{height:leftHeight+'px'}">
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
import {mapState} from "vuex"
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
        },
           leftHeight:{
            type:Number,
            // required:true,
            default:0,
        }
   },
   data(){
       return{
           Mobile:true,
       }
   },
   computed:{
       ...mapState("setting",["isMobile"]),
   },
   mounted(){
        document.body.addEventListener('touchstart',(e)=>{

              //如果是电脑端
               if(!this.isMobile){
                       //   console.log("x1",e.touches[0].clientX);
                let x1 = e.touches[0].clientX
                
               document.body.addEventListener('touchmove',(e)=>{
            //   console.log("x2",e.touches[0].clientX);
                  if(e.touches[0].clientY<60)return;
                
                  let x2 = e.touches[0].clientX
                  let  diff = x2-x1;
                  if(diff>50){
                        this.$store.commit("setting/setColapsFalse");
                  }else if(diff<-50){
                         this.$store.commit("setting/setColapsTrue");
                  }


                  });
        
               }


               //如果是移动端
               else{

                     //   console.log("y1",e.touches[0].clientY);
                let y1 = e.touches[0].clientY
                
               document.body.addEventListener('touchmove',(e)=>{
            //   console.log("x2",e.touches[0].clientY);
                  if(e.touches[0].clientY<60)return;
                
                  let y2 = e.touches[0].clientY
                  let  diff = y2-y1;
                  if(diff>50){
                        this.$store.commit("setting/setColapsFalse");
                  }else if(diff<-50){
                         this.$store.commit("setting/setColapsTrue");
                  }


             });
 

               }
         

       });
       console.log(document.body.offsetWidth);

   if(document.body.offsetWidth>650)  this.Mobile = false; 
    else  this.Mobile = true;

     console.log("isMobile",this.Mobile);
       this.$store.commit("setting/setIsMobile",this.Mobile);  


    window.addEventListener('resize',()=>{
           if(document.body.offsetWidth>650)  this.Mobile = false; 
    else  this.Mobile = true;

     console.log("isMobile",this.Mobile);
       this.$store.commit("setting/setIsMobile",this.Mobile);  

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
    //    background: yellow;
       height: 100%;
      overflow-x:hidden;
      overflow-y: hidden;
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
     
      transition: width .5s;
      height: 100%;
}

@media (max-width:650px) {
    // .left{
    //     position: fixed !important;
    //     z-index: 1050;
    //     height: 100vh;
    //   opacity: .9;
    // }


       .left{
        position: fixed !important;
        z-index: 1050;
        // height: 100vh;
        width:100vw !important;
        opacity: .9;
        transition: height .5s;
    }
}
</style>