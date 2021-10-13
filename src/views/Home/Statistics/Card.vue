
     <template>
  <div  style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="商品总览" :bordered="false"  hoverable :bodyStyle="{height:'60px'}" :headStyle="{height:'40px'}">
          <p>200次</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="用户纵览" :bordered="false" hoverable :bodyStyle="{height:'60px'}" :headStyle="{height:'40px'}" >
          <p>30单</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="销售纵览" :bordered="false" hoverable :bodyStyle="{height:'60px'}" :headStyle="{height:'40px'}" >
          <p>12900元</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>



<script>
export default {
    name:"Card",
}
</script>

<style>

</style>