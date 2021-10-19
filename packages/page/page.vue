<template>
  <div class="basePage">
    <!-- 按钮组件 -->
    <Btns v-if="showBaseBtns" :localPermiss="localPermiss" @getClickResult="$emit('handleBaseBtns', $event)" />
    <!-- form 表单组件 -->
    <RpForm ref="baseForm" :height="formHigt" :isInitOver="isInitOver" :zoom.sync="isZoom" :options="formOpts" v-if="formOpts.length">
      <template v-for="item of Object.keys($slots)" v-slot:[item]>
        <slot :name="item"></slot>
      </template>
    </RpForm>
    <!-- table 组件 -->
    <RpTable ref="baseTable" :height="height" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import RpForm from '../form/form'
import RpTable from '../table/src/table'
import Btns from './btns'

export default {
  name: 'rp-page',
  components: {
    RpForm,
    RpTable,
    Btns
  },
  props: {
    // 除了form、table之外的高度
    otherHight: {
      type: Number,
      default: 157
    },
    // 默认显示form item的高度，
    normalFormItemHight: {
      type: Number,
      default: 102
    },
    // form 表单组件
    formOpts: {
      type: Array,
      default: () => []
    },
    // 是否显示公共按钮
    showBaseBtns: {
      type: Boolean,
      default: false
    },
    // 按钮权限
    localPermiss: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isInitOver: true,
      height: 500,
      formHigt: 'auto',
      isZoom: false
    }
  },
  watch: {
    isZoom() {
      this.$nextTick(() => {
        this.calculateTableHeight(this.isZoom)
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      const { isOver, formHigt, isInitOver } = this.calculateTableHeight()
      this.isZoom = isOver
      this.isInitOver = isInitOver
      this.formHigt = formHigt
    })
    // 监听页面缩放
    window.addEventListener('resize', this.calculateTableHeight, false)
  },
  methods: {
    // 计算table高度
    calculateTableHeight(zoom) {
      const doc = document
      let formHigt = doc.querySelector('.baseForm')?.offsetHeight
      // 初始化默认form 表单高度没有超过默认高度，不需要把收缩按钮显示出来
      let isInitOver = true
      // 是否超过默认高度，这里的102是两行form表单的大概宽度
      const isOver = formHigt > this.normalFormItemHight
      if (zoom) {
        formHigt = isOver ? this.normalFormItemHight : formHigt
      } else if (isOver) {
        isInitOver = false
      }
      const winHigt = window.innerHeight
      this.height = winHigt - formHigt - this.otherHight
      return { isOver, formHigt, isInitOver }
    },
    // 调用baseTable
    loadBaseTableData(params) {
      return this.$refs.baseTable.loadBaseTableData(params)
    },
    // 校验
    validateForm() {
      return this.$refs.baseForm.validateForm()
    },
    // 重置表单
    resetForm() {
      return this.$refs.baseForm.resetForm()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateTableHeight, false)
  }
}
</script>
