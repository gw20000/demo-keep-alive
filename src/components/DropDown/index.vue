<template>
  <!-- 下拉列表/下拉菜单 -->

  <div class="dropdown-container" >
<!-- only single title -->
<router-link :to="dropDownData.to"  v-if="dropDownData.to" 
 :class="` title  ${$route.name===dropDownData.to.name ? 'active' : '' }`" ref="title" >
    <i :class="dropDownData.iconClass"></i>
    {{dropDownData.title}} 
</router-link>


<!-- title with menu items -->
<template  v-if="!dropDownData.to">
<!-- title -->
<div   class="title"  ref="title"  @click="toggle" >
    <i :class="dropDownData.iconClass"></i>
    {{dropDownData.title}} 
</div>


<!-- list items  / menu items -->
<ul   :class="`list-group ${ slideDown ? '' :'hiden'}`"  >
  <div 
  style="position:relative" 
  :class="`list-group-item ${$route.name===item.to.name ? 'active' : '' }`" 
   v-for="(item,i) in dropDownData.items"  :key="i"
   >
        <RouterLink :to="item.to"  class="sub-menu-item"  >{{item.item}}</RouterLink>
        <span @click="addCacheComp(item)" class="addCache"> +</span> 
  </div>
</ul>
</template>

</div>

</template>

<script>


export default {

 name:"DropDown",
  props:{
      dropDownData:{
          type:Object,
          required:true,
          default:()=>{return {title:"title",iconClass:"home",items:[{item:"员工列表",to:{name:"StaffList"}},{item,to:{}},]}},//数据格式示范
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
           if(items[prop].to.name===this.$route.name) this.slideDown=true;
          }
    },
    addCacheComp(item){
     
        this.$store.commit("cachedComponents/addCachedComponent",item);
    
    }
 },
 watch:{
     dropDownData:{
         deep:true,
         handler(){
             this.handleSlideDown();
         }

     },
    //  $route(){
    //      console.log(this.$route,this.$router);
    //  }

 },
 created(){
    this.handleSlideDown()
  
 },
 mounted(){
    this.n = 1;
   
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

.sub-menu-item{
    color:white;
    text-decoration:none;
    display:inline-block;
    height:100%;
    width:100%;
}

.dropdown-container{
   
    width:100%;
//    .menu-item{
//       height: 50px;
//       line-height: 50px;
//    }
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

.addCache{
display:inline-block;
position:absolute;
right:0px;
width:20px;
}


</style>