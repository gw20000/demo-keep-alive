<template>
  <!-- 下拉列表/下拉菜单 -->

  <div class="dropdown-container" >
<!-- only single title -->
<router-link :to="dropDownData.to"  v-if="dropDownData.to"  :class="` title  ${$route.path===dropDownData.to ? 'active' : '' }`" ref="title" >
    <i :class="dropDownData.iconClass"></i>
    {{dropDownData.title}} 
</router-link>



<!-- title -->
<div v-if="!dropDownData.to"  class="title"  ref="title" @click="toggle" >
    <i :class="dropDownData.iconClass"></i>
    {{dropDownData.title}} 
</div>


<!-- list items  / menu items -->
<ul  v-if="!dropDownData.to"    :class="`list-group ${ slideDown ? '' :'hiden'}`"  >
  <div 
  style="position:relative" 
  :class="`list-group-item ${$route.path===item.to ? 'active' : '' }`" 
   v-for="(item,i) in dropDownData.items"  :key="i"
   >
        <RouterLink :to="item.to" style="color:white;text-decoration:none;display:inline-block;height:100%;width:100%;" >{{item.item}}</RouterLink>
        <span @click="addCacheComp(item.item,item.to,)"  ref="addCache" style="display:inline-block;position:absolute;right:0px;width:20px;"> +</span> 
  </div>
</ul>
</div>
</template>

<script>


export default {

 name:"DropDown",
  props:{
      dropDownData:{
          type:Object,
          required:true,
          default:()=>{return {title:"title",items:[1,2,3]}},//数据格式示范
      }
  },
  data(){
      return{
          slideDown:false,
      }
  },
 methods:{
    toggle(){

    //  console.log(e.target.tagName);
      
    //       let target = e.target;
        
    //       if(!e.target.classList.contains('title')) target=e.target.parentNode;
         const titleDom = this.$refs.title;
          
          if(this.n%2==0){
             titleDom.nextSibling.classList.add("hiden");

          }else{
              titleDom.nextSibling.classList.remove("hiden");
          }
          
       
        this.n++;
        
       
    },
    handleSlideDown(){
        const items= this.dropDownData.items;
        for (var prop in items) {
           if(items[prop].to===this.$route.path) this.slideDown=true;
          }
    },
    addCacheComp(name,to){
        console.log("cache add comp",to);
        this.$store.commit("cachedComponents/addCachedComponent",{to,name});
    
    }
 },
 watch:{
     dropDownData:{
         deep:true,
         handler(){
             this.handleSlideDown();
         }

     }

 },
 created(){
    this.handleSlideDown()
  
 },
 mounted(){
    this.n = 1;
     this.$refs.addCache
 }
}

</script>

<style scoped lang="less">
.title{
      color:whitesmoke;
      display: block;
       height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      border: 1px solid gray;
}

.dropdown-container{
   
    width:100%;
   .menu-item{
      height: 50px;
      line-height: 50px;
   }
}
.hiden{
  height: 0px;
  overflow-y: hidden;
}

// .list-group{
//  &::after{
//      display: block;
//      content: "";
//      height: 1px;
     
//  }
// }

.list-group-item{
    padding: 0px;
    height: 42px;
    line-height: 42px;
    color:whitesmoke;
      background-color:transparent;
//    &:hover{
     
     
    //   background-color:green;
  
//    }

}
.active{
    background-color: #0d6efd!important;
}
</style>