<template>
  

<div class="nav-container  d-flex  justify-content-center px-3">
<nav aria-label="Page navigation example">
  <ul class="pagination">

    <li :class="`page-item  ${prevDisabled ? 'disabled' : ''}  `"   @click="active('prev')"><a class="page-link" >上一页</a></li>

   
    <li v-for="page in showPageNOs" :key="page" :class="`page-item ${ page==activePage ?  'active' : ''}` "  @click="active(page)">
      <a class="page-link" >{{page}}</a>
    </li>
    <!-- <li class="page-item active"><a class="page-link" >1</a></li>
    <li class="page-item"><a class="page-link" >2</a></li>
    <li class="page-item"><a class="page-link" >3</a></li> -->

    <li :class="`page-item  ${nextDisabled ? 'disabled' : ''}`"     @click="active('next')"><a class="page-link">下一页</a></li>
  
    
  </ul>
</nav>
</div>


</template>

<script>
export default {
    name:"PageNav",
    model:{
         prop:"activePage",
         event:"activePage"
    },
props:{
    //总数据量
    dataAmount:{
        type:Number,
        required:true,

    },
    //页容量
    pageItems:{
         type:Number,
        required:true,
        
    },
      
    //    //当前激活页
        activePage:{
          type:Number,
          default:1,
          
        },
    //显示的页码个数
    showPageNumbers:{
            type:Number,
            default:10,
    },
    //编辑时，触发初始化页码
    initPageNav:{
       type:Boolean,
       default:false,
    }

},
  data() {
      return {
           prevDisabled:false,
           nextDisabled:false,
    //    //当前激活页
        // activePage:1,
        // startPage:1,
        //切换展示页码的引发因子
        n:0,
        //进入到最后几页flag
        isLastSeveralPages:false,
        start:0,

     
       
      }
  },

computed:{
    //所有页码
    pages(){
        const pages = new Array(Math.ceil(this.dataAmount/this.pageItems));
        for(let i=0; i<pages.length; i++){
              pages[i]=i+1;
        }
        console.log("pages",pages);
        return pages;
    },
    // //实际要显示的页码个数
    // PageNOs(){
    //     if(this.pages.length<this.showPageNumbers) return this.pages.length;
    //     else return this.showPageNumbers;
    // },

   //当前显示的页码
    showPageNOs:{
        
        get(){
             

             if(this.pages.length<this.showPageNumbers){
                   
               
                 return this.pages;
             }    




             let length  =  this.start ? this.start : this.showPageNumbers;
            let showPages =new Array( length );
             
                      for(let i=0; i<length; i++){
         
                       showPages[i]=(i+1)+this.n-this.start + (this.start ? this.showPageNumbers : this.start);

                  }

        return showPages;

        }
    
      
    }
  

},

methods:{


     //更新激活的页码
     active(page){
        

         switch(page){
                     case "prev" :  this.currentPageReduce1() ; return ;
                      case "next" :  this.currentPagePlus1() ; return ;     
               }

        
    
        // console.log("activePage前前",this.activePage);
     
       this.$emit("activePage",page); //🌈抛出事件 是异步处理的

      //  console.log("activePage后后",this.activePage);


     
       if(page==1)this.prevDisabled = true;  
        else this.prevDisabled = false;   
            
        
        if(page==this.pages.length) this.nextDisabled = true;  
           else  this.nextDisabled = false;   
        
     
          // this.$emit("activePage",this.activePage);
      },















         //辅助函数：  点击“上一页”
         currentPageReduce1(){
           if (this.pages==0 || this.pages==1 ) return;
            if(this.activePage==1) return ;

          // if(this.prevDisabled)return;
    
            else if(this.activePage==2){
              
                //  this.activePage--;
                 this.$emit("activePage",this.activePage-1);
                //  this.$refs.prev.classList.add("disabled");
                 this.prevDisabled = true;
                 this.nextDisabled = false;
            }
            else {
                  // this.activePage--;
                   console.log("activePage减前",this.activePage);
                    this.$emit("activePage",this.activePage-1);
                     console.log("activePage减后",this.activePage);
                    // this.$refs.next.classList.remove("disabled");
                    this.nextDisabled = false;
            }
              // this.$emit("activePage",this.activePage);
              //更新展示的页码
               this.setShowPageNumbers("prev");
         },



     // 辅助函数： 点击“下一页”
        currentPagePlus1(){
              if (this.pages==0 || this.pages==1) return;
            if(this.activePage==this.pages.length) return ;

              // if(this.nextDisabled) return;
            else if(this.activePage==this.pages.length-1){
            
                //  this.activePage++;
                   this.$emit("activePage",this.activePage+1);
                //  this.$refs.next.classList.add("disabled");
                 this.nextDisabled = true;
                 this.prevDisabled =false;
            }
            else {

                  //  console.log("+1前",this.activePage);
                  // this.activePage++;
                    this.$emit("activePage",this.activePage+1);//🌈抛出事件 是异步处理的
                    // this.$refs.prev.classList.remove("disabled");
                          // console.log("+1后",this.activePage);
                    this.prevDisabled =false;
            }

              // this.$emit("activePage",this.activePage);
               //更新展示的页码
               this.setShowPageNumbers("next");

         },












             // 辅助函数 ： 更新当前展示的页码
         setShowPageNumbers(dir){


                //如果点击 “下一页”
            if(dir==="next"){
        
            if( (this.activePage) % this.showPageNumbers==0){

              if (this.activePage+this.showPageNumbers<=this.pages.length)
            
                this.n += this.showPageNumbers;
           
               else {
                    this.isLastSeveralPages = true;
                    this.n += (this.pages.length % this.showPageNumbers);
                    this.start = (this.pages.length % this.showPageNumbers);
                 } 
             }

         }

         //如果点击 “上一页”
      
         else if( dir === "prev" && ((this.activePage-1) % this.showPageNumbers==0)){
                
           console.log("activePage0000",this.activePage);


                  if(this.isLastSeveralPages){
                  
                       this.n -= (this.pages.length % this.showPageNumbers);
                       this.start = 0;
                       this.isLastSeveralPages = false;
                  }
                else if ((this.activePage-1)-this.showPageNumbers>=0){
                     
                         this.n -= this.showPageNumbers;
                         this.start = 0;
                }




              }
         },
         init(){
            this.n=0;
            this.start=0;
            this.isLastSeveralPages=false;
            this.prevDisabled=false;
            this.nextDisabled=false;
              
         }





},


watch:{
  dataAmount(){
 
          this.init();

         if(this.activePage==1) this.prevDisabled = true;
         if(this.activePage==this.pages.length || this.pages.length==1)  this.nextDisabled = true;       
  },
  
   activePage(){
      console.log("activePage",this.activePage);
   
   },
   initPageNav(){
        if(this.initPageNav==true){
         //如果是  编辑(dataAmount不会改变)， 而且也想 回到 第一页，可以走这里。 
            // init();
        }
   }
}

}



</script>

<style lang="less" scpoed>
 .pagination{
     display: flex;
     flex-wrap: wrap;
 }
</style>