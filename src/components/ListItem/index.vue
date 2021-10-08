<template>
    <div class="list-item-container" >
         <span  v-for="(item,index ) in itemData"  :key="index" >
              {{item}}
         </span>
    </div>
</template>



<script>

export default {
     name:"ListItem",
    props:{
       itemData:{
           type:Object,
           default:()=>{}
       }
    },

 
    // mounted(){
    //    console.log(("listItem  mounted"));
    // },
    // activated(){
    //     console.log(("listItem  activated"));
    // },
    // deactivated(){
    //      console.log(("listItem  deactivated"));

    // }

}
</script>



<style lang="less" scoped>



</style>