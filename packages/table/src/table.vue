<template>
  <div class="baseTable">
    <!-- table 组件 -->
    <el-table v-loading="loading" :height="height" :summary-method="getSummaries" v-bind="tableAttrs" :data="list" v-on="$listeners">
      <template v-for="(item, idx) in tableColumnOptions">
        <el-table-column v-if="item.prop !== 'options'" :key="idx" v-bind="item" />
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <el-table-column v-else v-bind="item">
          <template v-if="typeof item.renderHeader === 'function'" #header>
            <Cell2 :item="list" :index="idx" :render="item.renderHeader" />
          </template>
          <template v-if="typeof item.render === 'function'" #default="scope">
            <Cell :children="tableOtherOpts.children" :item="list" :index="scope.$index" :render="item.render" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="tableOtherOpts.showPage" id="page" class="baseTable-page">
      <el-pagination
        v-bind="pAttrs"
        :current-page="pAttrs.pageNo"
        :page-size="pAttrs.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Cell2 from './cell2'
import Cell from './cell'

export default {
  name: 'BaseTable',
  components: {
    Cell2,
    Cell
  },
  props: {
    // 加载table 数据的函数
    tableLoadFunc: {
      type: Function,
      required: true,
      default: () => Promise.resolve({ rows: [], total: 0 })
    },
    // 表头配置
    tableOpts: {
      type: Array,
      required: true,
      default: () => []
    },
    // 分页参数
    paginationAttrs: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 10
      })
    },
    height: {
      type: Number,
      default: 500
    },
    // 其他配置项
    tableOtherOpts: {
      type: Object,
      default: () => ({
        showPage: true, // 是否展示分页
        children: 'children' // 支持树类型的数据的显示
      })
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      tableLocalAttrs: {
        // table 默认属性
        border: true
      },
      tableItemLocalAttrs: {
        // tableItem默认属性
        showOverflowTooltip: true
      },
      pAttrs: {
        total: 0,
        pageSizes: [10, 20, 50, 100, 500],
        layout: 'total, sizes, prev, pager, next',
        ...this.paginationAttrs
      }
    }
  },
  computed: {
    attrs() {
      return 'table-opts' in this.$attrs ? this.$attrs : this.$parent.$attrs
    },
    // 筛选出需要计算合计的列
    sumColumnArr() {
      return this.tableOptions.filter((i) => i.isSum).map((i) => i.prop)
    },
    // 加上table 默认属性
    tableAttrs() {
      return { ...this.tableLocalAttrs, ...this.attrs }
    },
    // 把tableItem默认属性加上，省的使用组件时，每个都需要加默认属性
    tableColumnOptions() {
      return this.tableOpts.map((i) => ({ ...this.tableItemLocalAttrs, ...i }))
    }
  },
  methods: {
    // 切换页码条数
    handleSizeChange(v) {
      this.pAttrs.pageNo = 1
      this.pAttrs.pageSize = v
      this.loadBaseTableData()
    },
    // 切换分页
    handleCurrentChange(v) {
      this.pAttrs.pageNo = v
      this.loadBaseTableData()
    },
    /**
     * 刷新table数据，pageNo恢复为1就好了
     * @param {Number} pageNo 分页
     */
    refresh(pageNo = 1) {
      Object.assign(this.pAttrs, { pageNo })
      this.handleCurrentChange(pageNo)
    },
    /**
     * 重置table数据， 分页 和 页码都需要重置
     * @param {Number} pageNo 分页
     * @param {Number} pageSize 页码
     */
    reset(pageNo = 1, pageSize = 10) {
      Object.assign(this.pAttrs, { pageNo, pageSize })
      this.handleSizeChange(pageSize)
    },
    // 自定义合计行
    getSummaries(param) {
      // 获取传入的属性
      const { sumInfo } = this.$attrs
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        // 这里目前设定的 合计文案在第二个位置也就是index=1，这里也可以做成配置
        if (index === 1) {
          sums[index] = '合计：'
          return
        }
        // 只有sumInfo 存在且为Object有值的情况下，才会渲染自定义的合计，比如后台接口返回的
        if (typeof sumInfo === 'object' && Object.keys(sumInfo).length) {
          // 使用接口返回的合计数据
          const tempList = this.sumColumnArr.filter((e) => e === column.property)
          tempList.forEach((i) => {
            sums[index] = sumInfo[i]
          })
        } else {
          // 如果你只想展示某些汇总的字段
          const values = []
          data.forEach((item) => {
            this.sumColumnArr.filter((e) => e === column.property).forEach(() => values.push(item[column.property]))
          })
          if (!values.every((value) => Number.isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = parseFloat(curr)
              if (!Number.isNaN(value)) {
                return (parseFloat(prev) + parseFloat(curr)).toFixed(2)
              }
              return parseFloat(prev).toFixed(2)
            }, 0)
          }
        }
      })
      return sums
    },
    /**
     * 加载父组件传入的接口请求方法
     * @param {Object} pagination 分页一些参数
     */
    async loadBaseTableData(pagination = {}) {
      this.loading = true
      // 只需要更新pageNo，pageSize 两个字段
      const { pageNo, pageSize } = this.pAttrs
      const params = { pageNo, pageSize, ...pagination }
      try {
        // 这两个字段可以根据业务情况更改
        const { data } = await this.tableLoadFunc(params)
        const { rows, total } = data.data
        this.loading = false
        this.list = rows
        this.pAttrs.total = total
      } catch {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.baseTable {
  background-color: #fff;
  height: 100%;
  width: 100%;

  &-page {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
