<!--
 * @Author: 宋绍华
 * @Date: 2021-10-18 17:01:37
 * @LastEditTime: 2021-10-19 15:57:03
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\examples\App.vue
-->

<template>
  <div id="app">
    <RpPage
      ref="basePage"
      :form-opts="formOpts"
      :table-load-func="getList"
      :table-opts="options"
      :local-permiss="localPermiss"
      @handleBaseBtns="handleBaseBtns"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
import { RpPage } from '../packages'

export default {
  name: 'App',
  components: {
    RpPage
    // Hello
  },
  mounted() {
    this.$refs.basePage.loadBaseTableData()
  },
  data() {
    return {
      localPermiss: [],
      formOpts: [
        {
          type: 'input',
          model: 'name',
          rules: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          formItem: {
            label: '物料'
          },
          propsItem: {
            placeholder: '请输入名称或编码',
            clearable: true,
            event: {
              blur: (e) => {
                console.log(e)
                const item = JSON.parse(JSON.stringify(this.formOpts[1]))
                item.model = 'name1'
                item.formItem.label = '名字1'
                console.log(item, '====')
                this.formOpts.push(item)
              },
              change: (e) => {
                console.log(e)
              },
              focus: (e) => {
                console.log(e)
              },
              input: (e) => {
                console.log(e)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        },
        {
          type: 'input',
          model: 'code',
          formItem: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItem: {
            placeholder: '请输入物料条码',
            clearable: true,
            event: {
              input: () => {
                console.log('onInput')
                // this.handleInput(`onInput ${e}`)
              }
            }
          }
        }
      ],
      options: [
        {
          type: 'selection'
        },
        {
          type: 'index',
          label: '序号'
        },
        {
          prop: 'options',
          label: '物料编码'
          // renderHeader() {
          //   return <span style="color: red">*物料编码</span>
          // },
          // render: (h, params) => {
          //   const { skuNo } = params.row
          //   return (
          //     <div class="textButton" onClick={() => this.goToDetail(params.row)}>
          //       {skuNo}
          //     </div>
          //   )
          // }
        },
        {
          prop: 'barcode',
          label: '物料条码'
        },
        {
          prop: 'name',
          label: '物料名称'
        },
        {
          prop: 'categoryName',
          label: '物料分类'
        }
      ]
    }
  },
  methods: {
    async handleBaseBtns(type) {
      if (type === 'reset') {
        this.localPermiss = []
        this.$refs.basePage.resetForm()
        this.$refs.basePage.loadBaseTableData({ pageNo: 1, nameOrCode: 11 })
      } else if (type === 'search') {
        this.localPermiss = ['delete']
        const isTrue = await this.$refs.basePage.validateForm()
        if (!isTrue) return
        this.$refs.basePage.loadBaseTableData({ nameOrCode: 11, pageNo: 2, pageSize: 10 })
      }
    },
    async getList(params) {
      const { pageNo, pageSize } = params || this
      const url = `${this.$api.getHeadGoodsList}?pageNo=${pageNo}&pageSize=${pageSize}`
      console.log(url)
      // return await this.$ajax('postJson', url, params)
    },
    handleSelectionChange(val) {
      this.selectlist = val
    }
  }
}
</script>
