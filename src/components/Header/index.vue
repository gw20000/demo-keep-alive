<template>
                                                       
    <div class="header-container bg-dark " ref="header"   :style="{width:`${headerWidth}px`}"    >
        <!-- left-collapse控制按钮 -->
        <!-- <div class="slide-left"> -->
         <!-- <i class="bi-chevron-bar-left" style="font-size: 2rem; color: white;"></i> -->
         <i @click="collpaseToggle"  class=" collpase-tog-btn bi bi-list" style="font-size: 2rem; color: whitesmoke;width:44px;"></i>
       <!-- </div> -->

<!-- :style="{width:`${headerWidth-220}px`}"  -->
       <!-- 页面缓存 -->
       <div class="cache-pages "  id="scroll-1"   >
        <div  class="cache-item"  v-for=" (item,i) in headerData" :key="i">
       <router-link  :to="`${item.to}`" style="text-decoration:none;">
       <Item   style="min-width:100px;draggable:true;" :content="item.name" />
        </router-link>
         <span  @click="removeCacheComp(item.to)"    style="width:15px;cursor:pointer">x</span>
        </div>
      </div>

      <!-- 登录或注销 -->
      <div class="login-logout">
      <a-dropdown>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
     {{loginState=='login' ? user.username : '未登录'}} <a-icon type="down" />
    </a>
    <a-menu slot="overlay" >
      <a-menu-item  >
        <!-- href="javascript:console.log('logout');" -->
       <a v-if="loginState=='login'" @click="handleLogout"  class="slect-item"><a-icon  type="logout" /> <span style="padding-right:16px" >&nbsp;&nbsp;&nbsp;退出</span></a>

        <a v-else  @click="handleLogin"  class="slect-item"><a-icon  type="login" /> <span style="padding-right:16px" >&nbsp;&nbsp;&nbsp;登录</span></a>

      </a-menu-item>
        <a-menu-item v-if="loginState=='login'">
        <a  @click="visible=true" class="slect-item"><a-icon type="lock"  /><span>修改密码</span></a>
     

 <!-- 模态框：修改密码 -->
    <Modal v-model="visible" title="修改密码" :submitHasResult="submitHasResult">
      
        <template name="default" v-slot:default="{doSubmit}">
      <FormModifyPwd :doSubmit="doSubmit"
        @submited="setSubmitHasResult"
          @changeV="visible=$event"
      />
       </template>
    </Modal>



      </a-menu-item>
    </a-menu>
  </a-dropdown>
  </div>

    </div>
</template>

<script>
import Item from "@/components/Item"
import FormModifyPwd from "./components/FormModifyPwd"
import{mapState,mapGetters} from "vuex"
export default { 
name:"Header",
components:{
    Item,
    FormModifyPwd
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
       visible:false,
       submitHasResult:false,

   }
},
computed:{
  headerWidth(){
      console.log("headerWidth",this.windowWidth - this.sideAsideWidth);
       return this.windowWidth - this.sideAsideWidth;
  },
  ...mapState("user",["user"]),
  ...mapGetters('user',['loginState'])
},
methods:{

   handleLogin(){
   
     this.$router.push({name:'Login'});
   },
   handleLogout(){
      this.$store.commit("user/setLogout");
     this.$router.push({name:'Login'});
     this.$store.commit("cachedComponents/removeAllCachedComponents");

   },
  
  
  //表单提交有了结果，才可以触发下一次提交。
     setSubmitHasResult($event){
       this.submitHasResult=!$event;
       this.$nextTick(()=>{
         this.submitHasResult=false;
       });
     },
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
@import "~@/styles/mixin.less";
.header-container{
// position: relative;
transition: width .5s;
// width:100%;
height: 50px;
display: flex;
align-items: center;

flex-wrap: nowrap;
// flex-wrap: wrap;
// white-space: nowrap;
// overflow-x:scroll!important;


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

.collpase-tog-btn{
      flex: 0 0 44px;
}

.login-logout{
  width: 80px;
  flex: 0 0 80px;

  
//   position:absolute;
// background-color: blue;
//   top:50%;
//   transform: translateY(-50%);
//   right:10px;
 

}

.cache-pages{
    display: flex;
    flex-wrap: nowrap;
    // width:250px;
    overflow: auto;
    flex: 1 1 250px ;
    
}



@media (max-width:650px) {
  
    .header-container{
        width:100vw !important;
    }
    // .cache-pages{
    //       width:250px !important;
    // }
}

.slect-item{
    .d-f-c();
}



</style>