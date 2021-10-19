/*
 * @Author: 宋绍华
 * @Date: 2021-10-18 17:01:37
 * @LastEditTime: 2021-10-19 09:55:10
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\examples\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import { lyLink } from '../packages'

Vue.use(lyLink)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
