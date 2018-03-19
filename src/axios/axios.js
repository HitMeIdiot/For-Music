import axios from 'axios'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  //  对返回的数据进行一些处理
  // console.log(response)
  if (response.status === 200) {
    // console.log(response.data)
    return response.data
  } else {
    console.log(response)
  }
}, function (error) {
  console.log(error)
  // if (error.response) {
  //   switch (error.response.status) {
  //     case 401:
  //       // 401 清除token信息并跳转到登录页面
  //   }
  // }
  // 对返回的错误进行一些处理
  return Promise.reject(error)
})
export default axios
