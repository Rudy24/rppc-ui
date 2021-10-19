<template>
  <a :href="href || undefined" :class="[`ly-link-${type}`]" >
      <!-- 使用默认插槽来填充文本 -->
      <slot/>
  </a>
</template>

<script>
export default {
  // 等下 index.js 里面要用到
  name: 'lyLink',
  props: {
    // 限制类型
    href: String,
    type: {
      type: String,
      default: 'default'
    },
    methods: {
      create(Con, ...args) {
        const obj = {}
        Object.setPrototypeOf(obj, Con.prototype)
        const result = Con.apply(obj, args)
        return result instanceof Object ? result : obj
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  // 定义链接字体颜色
  .ly-link-default {
      color: #606266;
  }
  .ly-link-primary {
      color: #409eff;
  }
</style>
