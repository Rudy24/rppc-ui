/*
 * @Author: 宋绍华
 * @Date: 2021-09-23 14:53:59
 * @LastEditTime: 2021-10-19 10:28:02
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\packages\table\src\cell.js
 */
export default {
  name: 'Cell',
  functional: true,
  props: {
    item: {
      type: Array,
      default: () => []
    },
    children: {
      type: String,
      default: 'children'
    },
    render: Function,
    index: Number
  },
  render: (h, ctx) => {
    const { item, index, children } = ctx.props
    if (!ctx.props.item) return
    // 把children提取出来
    // eslint-disable-next-line no-use-before-define
    const arr = handleChildren(item, children)
    const params = {
      row: arr[index],
      index
    }
    /**
     * 把children数组提取一份到外面，注意保持顺序，以适应树形结构
     * @param {Array} list table数组
     * @param {String} key 默认 children
     * @returns {Array}
     */
    function handleChildren(list, key) {
      const tempArr = []
      list.forEach((n) => {
        let temp = []
        if (Object.keys(n).includes(key) && n[key]) {
          temp = n[key]
          tempArr.push(n, ...temp)
        } else {
          tempArr.push(n)
        }
      })

      return tempArr
    }

    // eslint-disable-next-line consistent-return
    return ctx.props.render(h, params)
  }
}
