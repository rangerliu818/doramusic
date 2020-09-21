<template>
  <div class="login-container">
      <div>
        <img class='logo' src="../../assets/images/wangyiyun.png">
      </div>
      <div>
          <van-form @submit="onSubmit">
            <van-field
                v-model="login.phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
                v-model="login.password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
            <van-button round block type="warning" native-type="submit" >
            登录
            </van-button>
  </div>
</van-form>
      </div>
  </div>
</template>

<script>
import api from '../../api/index'
export default {
  data () {
    return {
      login: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (login) {
      api.phoneLogin(login)
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.$nextTick(() => {
              this.$router.push({
                path: '/home'
              })
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  padding: 3rem 1rem;
  .logo{
    width: 20vw;
    height: 20vw;
  }
}

</style>
