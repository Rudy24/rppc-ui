<!--
 * @Author: 宋绍华
 * @Date: 2021-09-23 15:56:24
 * @LastEditTime: 2021-10-27 21:01:18
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\packages\form\form.vue
-->

<template>
  <el-form ref="baseForm" :class="{ 'baseForm-zoom': zoom }" class="baseForm" :model="formData" v-bind="formAttrs">
    <el-form-item v-for="(item, idx) in localOptions" :key="idx" v-bind="item.formItems" :prop="item.model">
      <template v-if="item.type === 'input'">
        <!-- v-base-input:[item.directive] -->
        <el-input class="baseForm-item" v-model.trim="formData[item.model]" v-bind="item.propsItems" v-on="item.propsItems.event">
          <template :slot="item.propsItems.slotType" v-if="item.propsItems.slotType">
            {{ item.propsItems.slotName }}
          </template>
        </el-input>
      </template>
      <template v-else-if="item.type === 'select'">
        <el-select class="baseForm-item" v-model.trim.lazy="formData[item.model]" v-bind="item.propsItems" v-on="item.propsItems.event">
          <template :slot="item.propsItems.slotType">{{ item.propsItems.slotName }}</template>
          <el-option v-for="n in item.propsItems.options" :disabled="n.disabled" :key="n.id" :label="n.label" :value="n.id"></el-option>
        </el-select>
      </template>
      <template v-else-if="item.type === 'datePicker'">
        <el-date-picker
          :class="getDatePickerClass(item.propsItems.type)"
          v-model.trim.lazy="formData[item.model]"
          v-bind="item.propsItems"
        ></el-date-picker>
      </template>
      <template v-else-if="item.type === 'radio'">
        <el-radio-group
          class="baseForm-item"
          v-model.trim.lazy="formData[item.model]"
          v-bind="item.propsItems"
          v-on="item.propsItems.event"
        >
          <el-radio :label="n.id" v-for="n in item.propsItems.options" :disabled="n.disabled" :key="n.id">
            {{ n.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="item.type === 'cascader'">
        <el-cascader
          class="baseForm-item"
          :options="item.propsItems.options"
          v-model.trim.lazy="formData[item.model]"
          v-bind="item.propsItems"
        ></el-cascader>
      </template>
      <template v-else-if="item.type === 'button'">
        <el-button v-on="item.propsItems.event" v-bind="item.propsItems">{{ item.propsItems.btnName }}</el-button>
      </template>
      <!-- 自定义组件 -->
      <template v-else-if="item.type === 'custom'">
        <component class="baseForm-item" :is="item.components" v-bind="item.propsItems" v-on="item.propsItems.event"></component>
      </template>
      <template v-else-if="item.type === 'slot'">
        <slot :name="item.slotName"></slot>
      </template>
    </el-form-item>
    <!-- 展开更多 -->
    <i
      v-if="!isInitOver"
      @click="$emit('update:zoom', !zoom)"
      :class="{ 'baseForm-icon__up': !zoom }"
      class="baseForm-icon el-icon-caret-bottom"
    ></i>
  </el-form>
</template>

<script>
export default {
  name: 'RpForm',
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    zoom: {
      type: Boolean,
      default: false
    },
    isInitOver: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      formLocalAtrrs: {
        // 本地form 一些基础属性
        labelWidth: '120px',
        size: 'small'
      },
      formData: this.getAttrs(0)
    }
  },
  computed: {
    // form的一些属性，除了formData
    formAttrs() {
      const rules = this.getAttrs(1)
      return { ...this.formLocalAtrrs, rules }
    },
    // 重组下form options，避免譬如propsItems 属性不存在而报错
    localOptions() {
      return this.options.map((item) => {
        const { type, formItems = {} } = item
        let { propsItems = {} } = item
        const { label = '' } = formItems
        // 判断null, 如果为null 就赋值为空对象
        if (propsItems instanceof Object) {
          propsItems = {}
        }
        // 如果没有填写placeholder，需要根据不同类型去配置placeholder value
        if (!propsItems.placeholder) {
          switch (type) {
            case 'input':
              propsItems.placeholder = `请输入${label}`
              break
            case 'select':
              propsItems.placeholder = `请选择${label}`
              break
            case 'datePicker':
              if (propsItems.type === 'date') {
                propsItems.placeholder = '请选择日期'
              }
              break
            default:
              break
          }
        }
        // 加上默认配置
        if (type === 'datePicker') {
          // eslint-disable-next-line no-param-reassign
          item.propsItems = {
            rangeSeparator: '至',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
            ...propsItems
          }
        } else if (type === 'button') {
          // eslint-disable-next-line no-param-reassign
          item.propsItems = { size: 'small', ...item.propsItems }
        }

        return item
      })
    }
  },
  methods: {
    // 获取options 对应的属性和值得集合
    getAttrs(type = 0) {
      const o = {}
      this.options.forEach((item) => {
        const { model, modelValue, rules } = item
        o[model] = type === 0 ? modelValue : rules
      })
      return o
    },
    // 重置表单，这个方法是从外面调用的，所以不要删掉了
    resetForm() {
      this.$refs.baseForm.resetFields()
    },
    //
    /**
     * 获取不同时间控件的class
     * @returns {String} class
     *
     */
    getDatePickerClass(type) {
      if (type === 'date') return 'baseForm-item'
      if (type === 'datetimerange') return 'baseForm-item__date-time-picker'
      return 'baseForm-item__date-picker'
    },
    /**
     * 校验form 表单是否复核必填需求
     * @returns {Promise} 返回一个Promise 对象
     */
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.baseForm.validate((valid) => {
          if (valid) return resolve(true)
          return resolve(false)
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.baseForm {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  transition: all 0.3s ease;
  will-change: height;
  background-color: #fff;

  &-icon {
    position: absolute;
    right: 20px;
    bottom: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &__up {
      transform: rotate(180deg);
    }
  }

  &-zoom {
    height: 102px !important;
  }

  &-item {
    width: 200px;

    &__date-picker {
      width: 225px;
    }

    &__date-time-picker {
      width: 350px;
    }
  }
}
</style>
