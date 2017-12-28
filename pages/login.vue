<template>
  <el-row>
    <el-col :span="24">
      <img class="hm-img-logo" src="../assets/img/logo-header.png"/>
      <div class="grid-content">
        <p class="hm-logo-title">登录</p>
        <el-form ref="form" :rules="rules" :model="form" label-position="top" label-width="80px">
          <el-form-item label="用户名" prop="formUsername">
            <el-input placeholder="请输入用户名或工号" v-model="form.formUsername" name="username">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="formPassword">
            <el-input type="password" placeholder="请输入密码,最小长度6位" v-model="form.formPassword" name="password" @keyup.enter="login">
            </el-input>
            <!-- <el-input @change="inputChange"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" style="width: 100%;" :loading="false" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="hm-form-error">
          <el-alert type="error" title="" v-if="form.formError" show-icon>
            {{ form.formError }}
          </el-alert>
        </div>
        <div style="text-align: center;">
          <el-button type="text">你已经忘记密码?</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import axios from '~plugins/axios'
import Vue from "vue";
import { Button, Col, Row, Form, Input, FormItem, Alert } from "element-ui";
import axios from "axios";

Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Alert);

export default {
  layout: "auth",

  watch: {
    check: function(e) {
      if (e.storeCode) {
        console.log("登录成功");
      }
    }
  },

  data(context) {
    return {
      state: {
        isSubmiting: false
      },
      form: {
        formError: null,
        formUsername: "",
        formPassword: ""
      },
      rules: {
        formUsername: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        formPassword: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  head() {
    return {
      title: "用户登陆"
    };
  },
  methods: {
    login() {
      const _this = this;
      this.$refs["form"].validate(valid => {
        //获取form表单中的用户名和密码
        // console.log(this.form.formUsername, this.form.formPassword);
        if (valid) {
          this.$store
            .dispatch("login", {
              username: this.form.formUsername,
              password: this.form.formPassword
            })
            .then(() => {
              this.formUsername = "";
              this.formPassword = "";
              this.formError = null;
              console.log(this.$store.state.storeCode);
              window.location.href = "/reports/homePage?method=login";
              this.$store.state.forbid = false;
            })
            .catch(e => {
              this.form.formError = e.message;
            });
        } else {
          return false;
        }
      });
    },
    // inputChange(e) {
    //   console.log(e);
    // },
    authLogin() {
      this.$refs["form"].validate(valid => {
        let username = this.form.formUsername;
        let password = this.form.formPassword;
        if (valid) {
          // axios.post('http://192.168.188.128:8090/hemiao-crm-backservice/data/login.htm', {
          //   account,
          //   password
          // })
          // .then((res) => {
          //   const data = res.data.loginUser;
          //   this.$store.state.storeCode = data.storeCode;
          //   this.$store.state.authUser = data.account;
          //   this.$store.state.forbid = false;
          //   console.log(this.$store.state)
          //   // window.location.href = '/reports/global-all?method=login'
          // }).catch((error) => {
          //   if (error.response.status === 401) {
          //     throw new Error('用户名或密码错误')
          //   }
          //   if (error.response.status === 500) {
          //     throw new Error('服务器错误')
          //   }
          // })
          this.$store
            .dispatch("comLogin", {
              account: "testadmin",
              password: "fhhemiao2203"
              // account: username,
              // password: password
            })
            // .then((data) => {
            //   if (!data) {
            //     this.form.formError = data.message;
            //   }
            //   console.log(data);
            // })
            .then(e => {
              this.formUsername = "";
              this.formPassword = "";
              this.formError = null;
              console.log(this.$store.state.storeCode);
              this.$store.state.forbid = false;
              // window.location.href = '/reports/global-all'
            });
          // .catch((e) => {
          //   console.log(e);
          //   this.form.formError = e.message
          // })
        } else {
          return false;
        }
      });
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.hm-main-logo {
  max-width: 100%;
  width: 81%;
}

.grid-content {
  position: relative;
  border: 1px solid rgba(234, 238, 251, 1);
  border-radius: 4px;
  transition: 0.2s;
  padding: 20px;
  margin-bottom: 33px;
  background-color: #fff;
}

.hm-img-logo {
  width: 60%;
  text-align: center;
  margin-top: 20px;
  margin-left: 18.25%;
  margin-bottom: 10px;
}

.grid-content h3 {
  font-size: 16px;
  font-weight: 400;
}

.grid-content .el-col-10 {
  width: 40%;
  padding-top: 20px;
  text-align: center;
}

.hm-form-error {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.hm-logo-title {
  color: #3c8c37;
  font-weight: 400;
  font-size: 28px;
  line-height: 1.2;
  margin-bottom: 15px;
}
</style>
