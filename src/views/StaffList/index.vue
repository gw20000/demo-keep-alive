<template>
  <div class="staff-list-container" >
    <h1>员工列表</h1>
     <Input placeholder="Search staffs..." @input="val=$event"/>
  <div class="statfflist-menu d-flex justify-content-between px-3" ref="msgContainer">
     <a-button type="primary" @click="handleAdd">新增员工<i class="bi bi-person-plus"></i></a-button>

     <!-- <button type="button" class="btn btn-primary" @click="handleAdd" >新增员工<i class="bi bi-person-plus"></i></button> -->
     <a-button   :loading="isExporting"  @click="showConfirm"  class="export">导出excel<i class="bi bi-file-earmark-excel"></i> </a-button>
     <!-- <button type="button" class="btn btn-outline-primary" >导出excel<i class="bi bi-file-earmark-excel"></i></button>
  -->
  </div>




<!-- 模态框 -->

<Modal v-model="visible" :submitHasResult="submitHasResult" title="新增员工">      
  
     <template name="default" v-slot:default="{doSubmit}">

        <!-- 临时变量doSubmit是来控制Form提交的 -->
         <Form :doSubmit="doSubmit"
         @submited="setSubmitHasResult"
          @changeV="visible=$event"
          @success="$event ? gengxin({addSuccess:$event}) : '' "
          />
      
     </template>
  
    </Modal>

<!-- <div class="test-container" style="background-color:green;height:500px;width:500px;position:fixed;z-index:1050;" @click="$event.target.style.backgroundColor='red'">  

</div> -->

<!-- 员工列表 -->
  <table class="table" >
  <thead style="border-bottom:1px solid black">
    <tr>
      <th scope="col">编号</th>
      <th scope="col">姓名</th>
      <th scope="col">性别</th>
      <th scope="col">创建时间</th>
      <th scope="col" >操作</th>
    </tr>
  </thead>
  <tbody>
<!--     
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>

    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr> -->



    <tr v-for="item in data" :key="item.id">
      <th scope="row">{{item.id}}</th>
      <td>{{item.name}}</td>
      <td>{{item.sex}}</td>
      <td>{{date.getFormatText(item.createTime,true,true)}}</td>
       <td style="color:#0d6efd;cursor:pointer">详情</td>
      <td style="color:#0d6efd;cursor:pointer" @click="handleDel(item.id)" >删除</td>
    </tr>
  

      


  </tbody>

</table>


<PageNav  :dataAmount="dataAmount" :pageItems="pageItems" :showPageNumbers="8"  v-model="activePag" :initPageNav="initPageNav" />


  </div>
</template>

<script>

import { getAll,getStaffListByPage,add,del} from "@/api/staffs"
import Input from "@/components/Input"

import {tree,date,export2excel,showMessage} from "@/utils"
// import {mapState} from "vuex"
import PageNav from "@/components/PageNav"
// import XLSX  from "xlsx"
// import {saveAs} from 'file-saver'


// console.log(XLSX);
// console.log(saveAs);
// console.log(export2Excel);

// console.log( export_json_to_excel);

// activePage
console.log(export2excel);

let columns=[
  {title:"编号",key:'id'},
   {title:"姓名",key:"name"},
     {title:"性别",key:"sex"},
       {title:"创建时间",key:"createTime"}

]


export default {
  name:"StaffList",
  components:{
    Input,
    PageNav,
   
 

  },
  data() {
      return {
        //当前页数据
        data:[],
        date,
        val:"",
        //页容量
       pageItems:4,
       //总数据量
       dataAmount:0,
       //Modal是否可见
       visible:false,
       totalData:[],
       del,
       isExporting:false,
       n:0,
       activePag:0,
       initPageNav:false,
       //提交表单是否 响应正确的结果
       success:false,
       //Form表单提交了，是否有了结果（有了结果，才允许下一次提交）
       submitHasResult:false,
       
      }
  },
  computed:{
    // ...mapState(),
     //将 对象集合 转换成  二维数组  (我：该二维数组，目前项目中暂未用到)
   mapData(){
     console.log("执行了3");
     if(this.totalData==null || this.totalData.length==0 ) return [];
    // const keys =  Object.keys(this.totalData[0]);
   const  totalData = this.totalData.map((i)=>{
        const arr = [];

        
        for(const prop in i ){
            arr.push(i[prop]);
        }
       return arr;
    });
    return totalData;

   },

   mapTotal(){

     
      const mapTotalData = this.totalData.map((i)=>{

          return {id:i.id,name:i.name,sex:i.sex,createTime:date.getFormatText(i.createTime,true,true)};
            
            
        });


      

     return    [ { columns,data: mapTotalData , sheet_name:`${process.env.VUE_APP_TITLE}-员工名单`}]
      
   }


    
  },
  methods:{
  //表单提交有了结果，才可以触发下一次提交。
     setSubmitHasResult($event){
       this.submitHasResult=!$event;
       this.$nextTick(()=>{
         this.submitHasResult=false;
       });
     }
     ,

     showConfirm() {
      this.$confirm({
        title: '确定要下载「员工列表」到excel文件吗?',
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
         okText: '确认',
        cancelText: '取消',
        onOk:()=> {

              // console.log("download stafflist to excel");

              this.export2Excel();

        },
        onCancel:()=>{
              //  console.log("cancel  download stafflist to excel file");

        },
      });
    },
     
      // async getAllStudents(){
      //   // console.log("1111");
      //     this.data = await getAll();
      //     console.log(this.data);
      //       //  console.log("2222");
      //  },
      //获取指定页的员工列表数据
   async getStaffsByPage(page){
       this.activePag = page;
      //  console.log(page);
         const resp = await  getStaffListByPage(page,this.pageItems);
         this.data = resp.pageData;
         console.log("dataAmount",resp.dataAmount);
         this.dataAmount = resp.dataAmount;

    },
     handleAdd(){
         
           this.visible = true;
              console.log(this.visible);
          //  let result = await add({name:options.name,id:options.id});
    },
    async handleDel(id){
            let {success} = await del(id);
            if(success){
              console.log("删除成功");
              showMessage({content:"删除成功",type:"success",container:this.$refs.msgContainer});
               this.gengxin();
            }else{
               console.log("删除失败");
              showMessage({content:"删除失败",type:"error",container:this.$refs.msgContainer});
            }
    },
    async getAllStaffs(){
       console.log("执行了1");
          this.totalData = await getAll();
    },
    
    async gengxin(options){
      //如果是 删除
      if(!options ){
        // await  this.getAllStaffs();
         this.getStaffsByPage(1) ;
         
          return;
      }
      //如果是 添加
      if(options.addSuccess) {
        showMessage({content:"添加成功",type:"success",container:this.$refs.msgContainer});
          //  await this.getAllStaffs();
        this.getStaffsByPage(1) ;

         //如果 编辑，也想初始化页码PageNav组件的状态到第一页， 其实，没有这个需求。 （🌈编辑时，需求是重新获取当前页）
        // this.initPageNav = true;
        // this.$nextTick(()=>{
        //      this.initPageNav = false;
        // });
         
      }
      else showMessage({content:"添加失败",type:"error",container:this.$refs.msgContainer});

         
    },
    async export2Excel(){
          this.isExporting = true;

          // setTimeout(()=>{
          //   this.isExporting = false;
          // },2000);

           await this.getAllStaffs();
            this.isExporting = false;
          export2excel(`myexcel${++this.n}员工名单.xlsx`,this.mapTotal);

    //  { columns, data, sheet_name }
    }
  },





  watch:{

      val(){
          // 树的深度/广度搜索   （ 树的广度遍历 + 模糊查找（通过名字或id工号，两种模式），正则匹配，贪婪匹配）
          //搜索之前，可以先对搜索函数 做 防抖处理。  你触发的很频繁，但，我处理的不那么频繁。以节省效率，况且，异步操作，一定要等一会才能做完。
          //防抖不防抖，可以直接封装到 tree.js模块里面， 调用的时候通过函数参数来控制，或者，选择导入防抖 或 不防抖的方法。
          console.log("树的深搜/广搜:"+this.val);
         
          tree.breadthSearch();
          //搜索的时候，动态显示一个下拉框， 点击下拉框中的一个item，会弹出一个模态框 显示item的具体信息。

      },

      mapData(){
         console.log("执行了2");
        console.log(this.mapData);
      },
      activePag(){
            console.log("activePag",this.activePag);
             this.getStaffsByPage(this.activePag);

            //  console.log(activePage);
      }


  },
    async created(){
        
      //  this.getAllStudents();

      this.getStaffsByPage(1);
     this.getAllStaffs();
       
     
      },

      // activated(){
      //   console.log("StaffList 显示了");

    
      
      // },
      // deactivated(){
      //   console.log("StaffList 隐藏了");
      //   this.getAllStudents();
      // },



}
</script>


<style lang="less" scoped>
.staff-list-container{
   width:100%;
  overflow-x:hidden;

 
}
h1{
  font-family: 'Times New Roman', Times, serif;
  margin-top: 8px;
  
}
.export:hover{
     color:whitesmoke;
     background-color:#1890ff;
     border-color: #1890ff;
}
.statfflist-menu{
  position: relative;
}

</style>