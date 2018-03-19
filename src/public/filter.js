// 两种导出  全局过滤器
export function numFormat (val) {
  if (val > 10e3) {
    return parseInt(val / 10e3) + '万'
  } else {
    return val
  }
}
export function timeFormat (val) {
  let sec = parseInt((val / 1000 % 60))
  let min = parseInt(val / 1000 / 60)
  min = (min < 10 ? '0' + min : min)
  sec = (sec < 10 ? '0' + sec : sec)
  return min + ':' + sec
}
// let numFormat = val => {
//   if (val > 10e3) {
//     return parseInt(val / 10e3) + '万'
//   } else {
//     return val
//   }
// }
// export { numFormat }
