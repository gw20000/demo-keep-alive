<template>
    <div class="header-container bg-dark " id="scroll-1" ref="header"    :style="{width:`${headerWidth}px`}" >
        <!-- <div class="slide-left"> -->
         <!-- <i class="bi-chevron-bar-left" style="font-size: 2rem; color: white;"></i> -->
         <i @click="collpaseToggle"  class="bi bi-list" style="font-size: 2rem; color: whitesmoke;width:44px;"></i>
       <!-- </div> -->

        <div  class="cache-item"  v-for=" (item,i) in headerData" :key="i">
       <router-link  :to="`${item.to}`" style="text-decoration:none;">
       <Item   style="min-width:100px;draggable:true;" :content="item.name" />
        </router-link>
         <span  @click="removeCacheComp(item.to)"    style="width:15px;cursor:pointer">x</span>
        </div>
    </div>
</template>

<script>
import Item from "@/components/Item"
export default {
name:"Header",
components:{
    Item,
},
props:{
    headerData:{
        type:Array,
        default:()=>{return [{"to":"path1","name":"pageName1"},{"to":"path2","name":"pageName2"}]}
    },
    sideAsideWidth:{
        type:Number,
        default:200,
    },
 
},
data(){
   return {
       windowWidth:window.innerWidth,

   }
},
computed:{
  headerWidth(){
      console.log("headerWidth",this.windowWidth - this.sideAsideWidth);
       return this.windowWidth - this.sideAsideWidth;
  }
},
methods:{
    removeCacheComp(to){
        console.log("cache remove comp",to);
       this.$store.commit("cachedComponents/removeCachedComponent",to);
    },
    collpaseToggle(){
        this.$store.commit("setting/togleCollapseState");
    },

},
mounted(){
       this.windowWidth = window.innerWidth;
   window.addEventListener('resize',()=>{
         this.windowWidth = window.innerWidth;
         
   });
}
}
</script>

<style lang="less" scoped>

.header-container{
transition: width .5s;
width:100%;
height: 50px;
display: flex;
align-items: center;

flex-wrap: nowrap;
// flex-wrap: wrap;
// white-space: nowrap;
overflow-x:scroll!important;


}
.cache-item{
    display: flex;
    justify-content: space-between;
    background-color: turquoise;
    align-items: center;
    border-radius: 7px;
    margin-right: 10px;
    // color: whitesmoke;
}



#scroll-1::-webkit-scrollbar {
width:0px;
height:0px;
}
#scroll-1::-webkit-scrollbar-button {
background-color:#FF7677;
}
#scroll-1::-webkit-scrollbar-track {
background:#FF66D5;
}
#scroll-1::-webkit-scrollbar-track-piece {
background:#ff0000;
}
#scroll-1::-webkit-scrollbar-thumb{
background:#FFA711;
border-radius:4px;
}
#scroll-1::-webkit-scrollbar-corner {
background:#82AFFF;
}
#scroll-1::-webkit-scrollbar-resizer {
background:#FF0BEE;
}
</style>