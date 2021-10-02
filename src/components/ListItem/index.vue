<template>
    <div class="item-container" >
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
    }
}
</script>



<style lang="less" scoped>



</style>