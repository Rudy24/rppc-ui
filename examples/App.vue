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
import axios from 'axios'
import { RpPage } from '../packages'

export default {
  name: 'App',
  components: {
    RpPage
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
          formItems: {
            label: '物料'
          },
          propsItems: {
            placeholder: '请输入名称或编码',
            clearable: true,
            event: {
              blur: (e) => {
                console.log(e)
                const item = JSON.parse(JSON.stringify(this.formOpts[1]))
                item.model = 'name1'
                item.formItems.label = '名字1'
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
          formItems: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItems: {
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
          formItems: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItems: {
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
          formItems: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItems: {
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
          formItems: {
            label: '物料条码'
          },
          rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          propsItems: {
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
          type: 'button',
          model: 'btns',
          propsItems: {
            btnName: '提交'
          }
        },
        {
          type: 'button',
          model: 'btns',
          formItems: {
            labelWidth: '20px'
          },
          propsItems: {
            btnName: '重置',
            event: {
              click: () => {
                console.log(123123)
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
          label: '图片',
          renderHeader() {
            return <span style="color: red">*图片</span>
          },
          render: (h, params) => {
            const { image } = params.row
            return <el-image style="width: 50px; height: 50px" src={image}></el-image>
          }
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'csentence',
          label: '简介'
        },
        {
          prop: 'cparagraph',
          label: '内容'
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
      console.log(params)
      // eslint-disable-next-line no-return-await
      return await axios.get('/easymock/getList')
    },
    handleSelectionChange(val) {
      this.selectlist = val
    }
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100vh;
}

#app {
  height: 100%;
  // width: 90%;
}
</style>
