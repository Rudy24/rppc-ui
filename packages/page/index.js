/*
 * @Author: 宋绍华
 * @Date: 2021-10-19 09:44:55
 * @LastEditTime: 2021-10-19 10:04:24
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\packages\table\index.js
 */
// 引入组件
import RpPage from './page'

// 提供 install 安装方法，供按需引入
RpPage.install = (Vue) => {
  // 注册组件
  Vue.component(RpPage.name, RpPage)
}
// 暴露组件
export default RpPage
