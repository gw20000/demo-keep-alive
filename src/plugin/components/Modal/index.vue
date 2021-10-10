<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">
      Open Modal with customized footer
    </a-button> -->
    <a-modal

     v-model="_visible" :title="title" on-ok="handleOk">

      <template slot="footer">
        <a-button key="back" @click="handleCancel">
         取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk"  >
          提交
        </a-button>
      </template>
      
     
        <!-- <Form :doSubmit="doSubmit"
         @submited="doSubmit=$event"
          @changeV="$emit('changeV',$event)"
          @success="$emit('success',$event)"
          />
       -->
         <slot name="default" :doSubmit="doSubmit" >
           
            </slot>
      

    </a-modal>
  </div>
</template>
<script>
export default {
  name:"Modal",
  model:{
    prop: "visible",
    event: "changeV"
  },
  props:{
    //模态框 标题
       title:{
          type:String,
          default:'title'
       },
       //模态框 是否可见
       visible:{
         type:Boolean,
         default:false,
       },
       //form表单提交之后，是否有了结果；有了结果 ，点击 模态框【提交】按钮 才会触发 表单提交
       submitHasResult:{
           type:Boolean,
           default:false
       }
  },
  data() {
    return {
      loading: false,
      doSubmit:false,
   
    };
  },
  computed:{
       _visible:{
             get(){
                 return this.visible;
             },
             set(val){
              
                 this.$emit("changeV",val);

             }
       }
  },
  methods: {
    showModal() {
      // this.visible = true;
      this.$emit("changeV",true);
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
         console.log("doSubmit 前前",this.doSubmit);

        this.doSubmit = true;
        console.log("doSubmit 后后",this.doSubmit);



            // this.visible = false;
            // this.$emit("changeV",false);
        this.loading = false;
      }, 1000);
       

    },
    handleCancel(e) {
      // this.visible = false;
          this.$emit("changeV",false);
    },
  },
  watch:{
        submitHasResult(){

          if(this.submitHasResult==true) this.doSubmit=false;
           console.log('reset doSubmit false');
        }
  }
};
</script>


<style lang="less" scoped>

</style>