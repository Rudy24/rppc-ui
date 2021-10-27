/*
 * @Author: 宋绍华
 * @Date: 2021-10-18 20:32:45
 * @LastEditTime: 2021-10-21 14:25:42
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\tests\unit\button.spec.js
 */
import { mount } from '@vue/test-utils'
import { lyLink } from '../../packages'

test('test lyLink link', () => {
  const wrapper = mount(lyLink, {
    propsData: {
      href: 'www.baidu.com',
      type: 'primary1'
    },
    slots: {
      default: 'button text'
    }
  })
  expect(wrapper.props().type).toContain('primary')
  expect(wrapper.props().href).toEqual('www.baidu.com')
  expect(wrapper.text()).toBe('button text')
  expect(wrapper.html()).toMatchSnapshot()
  // wrapper.unmount();
})
