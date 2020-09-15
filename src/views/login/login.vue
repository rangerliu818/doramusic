<template>
  <div>
      <div>用户登录</div>
      <div>
          <van-form @submit="onSubmit">
            <van-field
                v-model="login.phone"
                name="手机号"
                label="手机号"
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
                v-model="login.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            提交
            </van-button>
  </div>
</van-form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        phone: '',
        password: ''
      }
    }
  }
}
</script>

<style>

</style>
