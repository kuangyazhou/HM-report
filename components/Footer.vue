<template>
  <el-col :span="24" class="divider-section">
    <p style="text-align: center; line-height: 44px;font-size: 14px;">服务热线：400-878-3608</p>
    <p style="text-align: center;font-size: 14px;">©2015-2017，www.hemiao100.com  备案/许可证号：鄂ICP备15014881号</p>
  </el-col>
</template>

<script></script>
<style scoped>
  .divider-section {
    height: 44px;
    margin-bottom: -18px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, .14), rgba(0, 0, 0, .03) 3px, transparent);
    z-index: 0;
    zoom: 1;
  }

  .divider-section:after {
    content: "";
    display: block;
    width: 100%;
    height: 44px;
    background-color: transparent;
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0), #fff);
    z-index: 1;
  }
</style>