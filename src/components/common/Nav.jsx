import React from 'react'
import {Menu, Icon} from 'antd'
import {withRouter} from 'react-router-dom'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Nav extends React.Component {
  
  constructor (props) {
    super(props)
  }

  handleClick = ({key}) => {
    this.props.history.push(key)
  }

  render () {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        mode="inline"
      >
        <SubMenu title={<span>排序</span>}>
          <Menu.Item key="/straight_insertion_sort">插入排序</Menu.Item>
          <Menu.Item key="/binary_sort">二分法插入排序</Menu.Item>
          <Menu.Item key="/heap_sort">堆排序</Menu.Item>
          <Menu.Item key="/quick_sort">快速排序</Menu.Item>
          <Menu.Item key="/merge_sort">归并排序</Menu.Item>
          <Menu.Item key="/straight_select_sort">直接选择排序</Menu.Item>
          <Menu.Item key="/bubble_sort">冒泡排序</Menu.Item>
          <Menu.Item key="/radix_sort">基数排序</Menu.Item>
          <Menu.Item key="/counting_sort">计数排序</Menu.Item>
        </SubMenu>
        <SubMenu title={<span>数据结构</span>}>
          <Menu.Item key="/queue">队列</Menu.Item>
          <Menu.Item key="/stack">栈</Menu.Item>
          <Menu.Item key="/linked_list">链表</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default withRouter(Nav)
