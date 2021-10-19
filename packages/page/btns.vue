<template>
  <div class="btnsBox2" :style="inline ? 'background:transparent;display:none' : ''">
    <el-col>
      <template v-if="!inline">
        <template v-for="(btn, index) in filterActiveBtns">
          <template v-if="btn.children && btn.children.length">
            <el-dropdown :key="index" placement="bottom-start" @command="handleClick">
              <el-button :disabled="btn.disabled" type="primary" class="btn" size="mini">
                {{ btn.label }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="confBtn-menu">
                <el-dropdown-item
                  :command="item.type"
                  :disabled="item.disabled"
                  class="dropdown_desk"
                  v-for="item in btn.children"
                  :key="item.label"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <el-button :disabled="btn.disabled" v-else class="btn" type="primary" size="mini" @click="handleClick(btn.type)" :key="index">
            {{ btn.label }}
          </el-button>
          <template
            v-if="
              filterActiveBtns[index].indexs &&
              filterActiveBtns.length - 1 > index &&
              filterActiveBtns[index].indexs !== filterActiveBtns[index + 1].indexs
            "
          >
            <el-divider class="confBtn-divider" direction="vertical" :key="index"></el-divider>
            <span class="confBtn-line" :key="index + 'div'"></span>
          </template>
        </template>
        <slot></slot>
      </template>
    </el-col>
  </div>
</template>
<script>
import _debounce from 'lodash/debounce'

export default {
  name: 'btns',
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    localPermiss: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showTable: false,
      activeBtns: [],
      arr: [],
      btnType: ''
    }
  },
  watch: {
    localPermiss: {
      handler(v) {
        this.filterLocalPermissBtns(v)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    filterActiveBtns() {
      return this.activeBtns.filter((item) => !item.inline && item.type)
    }
  },
  mounted() {
    const jsonTree = JSON.parse(sessionStorage.getItem('authorityData'))
    this.transformTree(jsonTree)
  },
  methods: {
    /**
     * 过滤组件内传过来的权限配置
     * @param {Array} 权限字段
     * example 如果你的按钮type 为 search，那就传一个['search'] 过来就好了
     * example 如果需要禁用二级按钮，不传一级按钮type, 只用传需要禁用的二级按钮type
     */
    filterLocalPermissBtns(btns) {
      this.activeBtns.forEach((item) => {
        // 预先删除所有的disabled，然后在重新赋值
        // eslint-disable-next-line no-param-reassign
        item.disabled = undefined
        if (Array.isArray(item.children) && item.children.length) {
          item.children.forEach((i) => {
            // eslint-disable-next-line no-param-reassign
            delete i.disabled
          })
        }
        if (btns.includes(item.type)) {
          this.$set(item, 'disabled', true)
        } else if (Array.isArray(item.children) && item.children.length > 0) {
          item.children.forEach((i) => {
            if (btns.includes(i.type)) {
              this.$set(i, 'disabled', true)
            }
          })
        }
      })
      // 加这个是因为在处理按钮时，没有及时响应
      const list = JSON.parse(JSON.stringify(this.activeBtns))
      this.activeBtns.length = 0
      this.activeBtns.push(...list)
    },
    handleClick(type) {
      if (this.btnType !== type) {
        this.$emit('getClickResult', type)
      } else {
        this.debounceClick(type)
      }
      this.btnType = type
    },
    debounceClick: _debounce(
      (type) => {
        this.$emit('getClickResult', type)
      },
      300,
      { leading: true, trailing: false }
    ),
    setMenuList(data) {
      const path = this.$route.path.split('/')[1]
      // 解构接口拿到的权限数据
      // eslint-disable-next-line object-curly-newline
      data.forEach(({ label, id, parentId, type, link, children, inline }) => {
        if (!type) {
          if (parentId === -1) {
            this.setMenuList(children)
          } else {
            children.forEach((item) => {
              if (item.link && item.parentId === id) {
                if (children && children.length) {
                  this.setMenuList(children)
                }
              } else {
                const { link: l } = item
                if (item.children && item.children.length) {
                  if (l === path) {
                    this.setMenuList(item.children)
                  }
                }
              }
            })
            if (link === path) {
              this.arr.push({
                label,
                id,
                parentId,
                children,
                inline
              })
            }
          }
        }
      })
    },
    // 格式化数据
    transformTree(tree) {
      if (Array.isArray(tree)) {
        this.setMenuList(tree)
      }
      this.activeBtns = this.arr.length > 0 ? this.arr[0].children : []
      if (this.activeBtns.length) {
        const activeInlineBtns = this.activeBtns.filter((item) => !!item.inline)
        this.$emit('sendActiveBtns', activeInlineBtns)
        // 根据indexs排序
        this.activeBtns = this.activeBtns.filter((btn) => !btn.inline).sort((a, b) => a.indexs - b.indexs)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.btnsBox2 {
  user-select: none;
  display: flex;
  margin: 0;
  margin-bottom: 1px;
  background: #fff;
  width: 100%;
  padding: 5px 0;
  padding-left: 5px;
  align-items: center;
  position: sticky;
  box-sizing: border-box;
  top: 0;
  z-index: 10;

  .divider {
    background: #666;
    margin: 0;
  }

  .btn {
    margin-left: 5px;
    text-align: center;
    color: #fff;
    font-size: 12px;

    button {
      color: #fff;

      &:hover {
        cursor: pointer;
        color: #333;
      }

      &:active {
        color: #666;
      }
    }
  }

  .btn-long {
    width: 230px;
  }
}

::v-deep.dropdown_desk {
  min-width: 80px;
  text-align: center;
}

.confBtn {
  &-divider {
    margin: 0 5px 0 10px;
  }

  &-line {
    width: 2px;
  }

  &-menu {
    margin-top: 5px;
  }
}
</style>
