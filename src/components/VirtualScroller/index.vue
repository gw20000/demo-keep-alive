<template>

         <!--师 ：  这个组件 LongList ： 可以控制我要显示哪些数据，而且，可以控制每个数据的偏移量（在页面上的位置）  -->
    
          <div class="long-list-container" ref="listContainer">
          <ul class="inner-container" ref="innerContainer" >




            <!-- 包一层div的目的，是为了决定item的位置 -->
             <!-- 注意🔥 li的高度应该由要显示的内容决定(即 由其 插槽内容的高度决定) -->
            <li
            :style="{
               transform:`translateY(${transY}px)`,
             }"  
             v-for="item in showData" 
             :key="item[keyField]" 
            >

              <!-- <keep-alive> -->
               <!-- 🔥虽然，当前组件有每一项的数据，但是， 每一项需要显示成什么样/当前组件不知道显示啥，我并不知道， 所以，需要使用 插槽 ，并且 绑定了插槽数据 ， 即 使用 作用域插槽，因为，父组件中插槽内容需要的数据，只有我有 -->
                <!-- 绑定一个插槽数据 为 一个动态数据  : 子组件通过插槽向父组件传递数据-->
              <slot :item="item"></slot>

               <!-- </keep-alive> -->
            </li>

          

          </ul>
       </div>
     
</template>

<script>
// import ListItem from "./ListItem"
export default {
   name:"VirtualScroller",
  // components:{
  //    ListItem,
  // },
      props:{
        //数据的数组
          data:{
           type:Array,
           default:()=>[],
          },
        //每条数据的高度

        itemHeight:{
           type:Number,
           default:0,
        },
        //给我的data数组中，每个item对象的什么属性作为key值 ：唯一且稳定的编号
        //即，通过哪一个属性名字，对应的属性值，来表示唯一且稳定的编号。
       keyField:{
            type:String,
            default:"id",
       }
      },
     data(){
       return{
          showData:[], // 渲染池，保持当前需要渲染的数据
          startIndex:0,
          endIndex:10,
          transY:0,
          sTop:0,
    
        
       }
     },
   
     computed:{
       
            innerContainerHeight(){

                return this.data.length * this.itemHeight;
            }
     },
     methods:{

            maintainShowData(){
              
              this.showData =  this.data.slice(this.startIndex,this.endIndex);
              //调试
              // console.log(this.showData);
            },
            handleLastChildBottomBorder(innerContainer,innerH,outerClientHAndSTop){
                
                  const yuliang = 20;
              if(innerH-outerClientHAndSTop<=yuliang){
                  // console.log("delete border");
                    innerContainer.children[innerContainer.children.length-1].children[0].style.borderBottomColor=" transparent ";
              }
            }
            
     },
     watch:{
            data(){
                   this.$refs.innerContainer.style.height = this.innerContainerHeight + "px";
                   this.maintainShowData();
            }

     },
      //组件加载（/渲染/  组件实例对应的dom树挂载）完成之后
      mounted(){
           const innerContainer = this.$refs.innerContainer;
           
            innerContainer.style.height = this.innerContainerHeight + "px";
            
           const container = this.$refs.listContainer;
           const cHeight = container.clientHeight ;

            container.addEventListener('scroll',()=>{
            
                  let sTop = container.scrollTop;
                  this.sTop = sTop;
               
                  let  yuliang = 5; //前后多显示一点，以防止白板，不过白板肯定是防不了的，如果用户滑动太快

              this.startIndex =    Math.floor(sTop/this.itemHeight) -yuliang;
              if(this.startIndex<0) this.startIndex=0;
        
              this.transY = this.startIndex*this.itemHeight;

              this.endIndex =  this.startIndex + Math.ceil(cHeight/this.itemHeight) + 2*yuliang;
              //调试
              // console.log(this.startIndex,this.endIndex);

                 this.handleLastChildBottomBorder(innerContainer,this.innerContainerHeight,cHeight+sTop);
               this.maintainShowData();
            
            });
    
      },


       activated(){
     
        //  this.$refs.listContainer.clientHeight;
        this.$refs.listContainer.scrollTo(0, this.sTop);

        //debug调试 发现问题：
        //🌈activated的时候，显示的数据没有变，但是dom元素的位置变了（dom元素listContainer的scrollTop变为了0，这不是我们期望的，我们期望的是 deactivated时或那一刻之前listContainer状态（scrollTop）），
        
        // 分析：
        // keep-alive只缓存组件的状态，并不缓存组件实例的dom元素的状态，
        // 🔥因为，vue只监控组件状态变化（vue只监控数据操作 并 缓存数据），并不监控dom元素状态变化（vue并不监控dom操作 并 缓存dom信息）；
        //dom操作，vue是监控不到的。因此，你滚动了listContainer，vue是监控不到的，因此keep-alive不会缓存dom元素listContainer的状态，它认为listContainer没有滚动，
        //，🔥所以，这里需要手动滚动 （通过dom操作恢复listContaineryin c） deactived 时（或之前）我们滚动listContainer滚动的高度。
   

        //  虚拟dom 是 通过数据 与 真实dom 建立联系的 ， 所以，vue开发，关注的一直都是数据 ，数据， 数据。 
      //虚拟dom 通过 数据 影响 真实dom

      //  结论：
      // 🔥简言之， vue不会监控dom操作，keep-alive不会缓存dom元素的状态， 所以，activated的时候， 我们需要手动 恢复dom元素listContainer 在 deactivated时或那一刻之前的状态（scrollTop）


      },



}
</script>

<style lang=less scoped>

 .long-list-container{
    
     /* height: 100%;
     width: 100%; */

     /* height: 500px;
     width: 300px; */
     overflow: scroll;
     /* overflow: auto; */
    /* position: relative; */
   
 }

 .inner-container{
 
   width:100%;
   /* height:500000px; */
    margin:0px;
    padding: 0px;
    /* background-color: yellow; */

   list-style: none;
  
   &>li{
      list-style-type: none;
      padding: 0px;
      margin: 0px;
   }
 }
</style>