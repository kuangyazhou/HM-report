<template>
  <section class="hm-error-container">
    <img v-if="error.statusCode === 404" src="../assets/img/logo.png" alt="404 Error" class="logo" />
    <img v-if="error.statusCode === 403" src="../assets/img/403.png" alt="404 Error" class="logo" />
    <img v-if="error.statusCode === 500" src="../assets/img/500.png" alt="404 Error" class="logo" />
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      <p v-if="error.statusCode === 404">没有这个页面呀, 您是不是找错了地址!</p>
      <p v-if="error.statusCode === 403">请登陆后在使用本系统哦!</p>
      <p v-if="error.statusCode === 500">服务器出现了点问题, 请稍后再来哦!</p>
    </h2>
    <nuxt-link
      class="el-button el-button--primary el-button--large"
      to="/login"
      v-if="error.statusCode === 403">
      <span>登&nbsp;&nbsp;录</span>
    </nuxt-link>
  </section>
</template>
<script>
  export default {
    props: ['error'],
    head () {
      const errCode = this.error.statusCode
      const errMsg = this.error.message
      return {
        title: `出错啦, ${errMsg}`
      }
    }
  }
</script>

<style scoped>
  .title {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 5em;
  }

  .info {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
  }

  .button {
    margin-top: 50px;
  }

  a.el-button {
    width: 200px;
    margin-top: 25px;
  }

  .hm-error-container {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top: 5%
  }
</style>
