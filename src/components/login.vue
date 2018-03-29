<template>
  <div class="login" v-show="isLog">
    <div>
      <div class="m0">
        <b v-show="goLogin" @click="goLogin=false"><i class="iconfont icon-arrowleft"></i>返回其他登录</b>
        <span @click="isLog=false">X</span>
      </div>
      <div class="m1" v-show="!goLogin">
        <img src="../assets/img/logo.png" alt="">
        <p @click="goLogin=true">手机号登录</p>
        <p @click="goLogin=true">注册</p>
      </div>
      <div class="m2" v-show="goLogin">
        <img src="../assets/img/phone.png" alt="">
        <div>
          <p>
              <span>
                <i class="iconfont icon-shouji"></i>
                <b>+86</b>
                <em class="iconfont icon-xiala"></em>
              </span>
            <input type="tel" placeholder="请输入手机号" v-model="phone">
          </p>
          <p>
            <i class="iconfont icon-suo"></i>
            <input type="password" placeholder="请输入密码" v-model="word" @keyup.enter='enter'>
            <b>重设密码</b>
          </p>
        </div>
        <button class="btn" @click="login" >登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { loginCellphone, userDetail } from '@/api/api'
export default {
  data () {
    return {
      isLog: false,
      goLogin: false,
      word: '',
      phone: '',
      myId: ''
    }
  },
  components: {},
  created () {
    if (sessionStorage.myId) {
      this.myId = sessionStorage.myId
    }
  },
  methods: {
    showLog () {
      if (!this.myId) {
        this.isLog = true
      }
    },
    // 手机登录
    enter () {
      this.login()
    },
    login () {
      loginCellphone({params: {phone: this.phone, password: this.word}}).then((res) => {
        console.log('个人信息', JSON.stringify(res))
        if (res.code === 200) {
          sessionStorage.loginInfo = JSON.stringify(res)
          this.isLog = false
          this.$toast('登录成功')
          this.$router.push({path: '/find/personRecommend'})
          this.getUserDet(res.account.id)
        }
      })
    },
    getUserDet (id) {
      userDetail({params: {uid: id}}).then((res) => {
        console.log('用户详情', res)
        if (res.code === 200) {
          sessionStorage.user = JSON.stringify(res)
          sessionStorage.myId = res.profile.userId
          sessionStorage.myName = res.profile.nickname
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .login {
    position: absolute;
    width: 350px;
    height: 500px;
    border: 1px solid #ddd;
    z-index: 888;
    background: #FAFAFA;
    box-shadow: 0 0 8px 3px #E1E1E2;
    left: 335px;
    top: 85px;
    padding: 10px;
    >div {
      position: relative;
      .m0 {
        font-size: 12px;
        color: #666;
        b {
          cursor: pointer;
        }
        i {
          font-size: 12px;
        }
        span {
          position: absolute;
          right: 0;
          top: 0;
          color: #999;
          cursor: pointer;
        }
      }
      .m1 {
        text-align: center;
        img {
          margin: 85px 0 15px 0;
          width: 80px;
          height: 80px;
          border-radius: 15px;
        }
        p {
          width: 260px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #c62f2f;
          color: #c62f2f;
          border-radius: 20px;
          margin: 10px auto;
        }
        p:hover {
          background: #F3B1B1;
        }
      }
      .m2 {
        text-align: center;
        img {
          width: 50px;
          height: 85px;
          margin: 70px 0 15px 0;
          border-radius: 15px;
        }
        .btn {
          width: 260px;
          height: 40px;
          background: #CE332E;
          border: none;
          border-radius: 3px;
          color: #fff;
          margin-top: 40px;
          outline: none;
          cursor: pointer;
        }
        .btn:active {
          background: #c62f2f;
        }
        div {
          border: 1px solid #E7E7E7;
          border-radius: 5px;
          background: #fff;
          width: 260px;
          margin:  0 auto;
          font-size: 12px;
          p {
            height: 40px;
            line-height: 40px;
            display: flex;
            align-items: center;
            input {
              border: none;
              outline: none;
            }
            .iconfont {
              color: #999999;
              font-size: 14px;
            }
          }
          p:first-child {
            border-bottom: 1px solid #E7E7E7;
            span {
              width: 85px;
              border-right: 1px solid #E7E7E7;
              flex-shrink: 0;
            }
            input {
              padding-left: 10px;
              width: 100%;
            }
          }
          p:last-child {
            i {
              width: 40px;
              flex-shrink: 0;
            }
            input {
              width: 100%;
            }
            b {
              width: 80px;
              flex-shrink: 0;
              color: #B3B3B3;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  input::-webkit-input-placeholder{
    color: #B3B3B3;
  }
  input::-moz-placeholder{
    color: #B3B3B3;
  }
  input:-moz-placeholder{
    color: #B3B3B3;
  }
  input:-ms-input-placeholder{
    color: #B3B3B3;
  }
</style>
