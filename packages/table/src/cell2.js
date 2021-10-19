/*
 * @Author: 宋绍华
 * @Date: 2021-10-19 09:45:36
 * @LastEditTime: 2021-10-19 10:10:26
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\packages\table\src\cell2.js
 */
/**
 * @author songshaohua
 * @Date 2021/08/21
 */

export default {
  name: 'Cell2',
  functional: true,
  props: {
    item: Array,
    render: Function,
    index: Number
  },
  render: (h, ctx) => {
    if (!ctx.props.item) return
    const params = {
      row: ctx.props.item[ctx.props.index],
      index: ctx.props.index
    }
    // eslint-disable-next-line consistent-return
    return ctx.props.render(h, params)
  }
}
