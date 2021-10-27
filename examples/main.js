/*
 * @Author: 宋绍华
 * @Date: 2021-10-18 17:01:37
 * @LastEditTime: 2021-10-27 20:23:30
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\examples\main.js
 */
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
