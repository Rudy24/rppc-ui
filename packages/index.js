/*
 * @Author: 宋绍华
 * @Date: 2021-10-18 17:32:17
 * @LastEditTime: 2021-10-19 15:56:08
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\packages\index.js
 */
// 引入组件
// eslint-disable-next-line object-curly-newline
import { Table, TableColumn, Pagination, Form, FormItem, Input, Loading } from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import lyLink from './lyLink'
import RpTable from './table'
import RpPage from './page'
import RpForm from './form'

// 引入使用的element组件
const eleComps = [Table, TableColumn, Pagination, Form, FormItem, Input, Loading]
eleComps.forEach((item) => {
  Vue.use(item)
})

// 存放组件的数组
const components = [lyLink, RpTable, RpPage, RpForm]

// 定义 install 方法，接收 Vue 作为参数。
const install = (V) => {
  // 判断是否安装
  if (install.installed) return
  // 遍历 components 数组，来进行全局注册
  components.map((component) => V.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install

export {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  lyLink,
  RpTable,
  RpPage,
  RpForm
}
