/*
快速排序

动画的实现尝试使用纯手写的方式，不使用react-transition-group插件
*/
import React from 'react'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'
let endAnimation = null
let animationTime = 0.3
class QuickSort extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      arr: [],

    }
  }

  quickSort = (arrSrc) => {
    const arr = [...arrSrc]

    this.quickSortRec(arr, 0, arr.length - 1)

    return arr
  }

  quickSortRec (arr, start, end) {
    if(start < end) {
      const median = this.partition(arr, start, end)
      this.quickSortRec(arr, start, median - 1)
      this.quickSortRec(arr, median + 1, end)
    }
  }

  // 取一个中位数(默认取数组最后一位 改进算法可先将最后一位随机与数组内任一数字调换) 并调整数组内
  partition (arr, start, end) {
    // 取一个中位数
    const x = arr[end]

    let i = start - 1
    for(let j = start; j < end; j++) {
      if(arr[j] <= x) {
        i += 1
        this.$tool.exchangeArr(arr, i, j)
      }
    }
    this.$tool.exchangeArr(arr, i + 1, end)

    return i + 1
  }

  quickSortAnimation = async (arrSrc, end) => {
    let arr = arrSrc.map((number, index) => new Block({number, index, animationTime}))
    endAnimation = end

    // 构建基础布局
    this.setState({ arr })

    // 一秒后执行模拟快速排位动画
    await this.$tool.delayMethod(1000)
    await this.quickSortAnimationRec(0, arr.length - 1, arr)
    arr.forEach(item => {item.clear()})
    this.setState({arr})
    end()
  }

  async quickSortAnimationRec (start, end, arr) {
    if (start < end) {
      const middle = await this.partitionAnimation(start, end, arr)
      arr[middle + 1].backgroundColor = 'red'
      this.setState({arr})
      await this.quickSortAnimationRec(start, middle, arr)
      await this.quickSortAnimationRec(middle + 2, end, arr)
    }
  }

  async partitionAnimation (start, end, arr) {
    const time = animationTime * 1000
    
    // 选择区域
    for (let i = start; i < end; i++) {
      arr[i].borderColor = 'blue'
    }

    // 选取最后一位
    const temp = arr[end]
    temp.borderColor = 'red'
    temp.y = 80
    temp.flag = 'middle'
    this.setState({ arr })
    await this.$tool.delayMethod(time)
    // 依次比较大小
    let chooseIndex = start - 1
    for (let i = start; i < end; i++) {
      const choose = arr[i]
      choose.borderColor = 'green'
      choose.y = 80
      this.setState({ arr })
      await this.$tool.delayMethod(time)
      if (choose['number'] <= temp['number']) {
        choose.x = -40 * (i - chooseIndex)
        choose.y = 40
        choose.flag = 'left'
        for (let j = start; j < i; j ++) {
          if (arr[j].flag === 'right') {
            arr[j].x += 40
          }
        }
        chooseIndex++
      } else {
        choose.y = 40
        choose.flag = 'right'
      }
      this.setState({ arr })
      await this.$tool.delayMethod(time)
    }
    temp.x = (end - chooseIndex) * (-40)
    temp.y = 40
    this.setState({ arr })
    await this.$tool.delayMethod(time)
    temp.borderColor = 'green'
    for (let i = start; i < end + 1; i++) {
      arr[i].x += 40
      arr[i].y = 0
    }
    this.setState({ arr })
    await this.$tool.delayMethod(time)
    // 调整数组顺序
    let obj = {
      'left': [],
      'middle': [],
      'right': []
    }
    for (let i = start; i < end + 1; i++) {
      const item = arr[i]
      obj[item.flag].push(item)
      item.clear()
    }
    arr.splice(start, (end - start + 1), ...obj['left'], ...obj['middle'], ...obj['right'])
    this.setState({ arr })
    await this.$tool.delayMethod(100)
    return chooseIndex
  }


  render () {
    return (
      <SortCommon title="QuickSort" onSort={this.quickSort} onAnimation={this.quickSortAnimation}>
        <ul className="animation-ul">
          { 
            this.state.arr.map((item, index) => {
              return (<li className='block' key={item.index} style={item.style}>{item.number}</li>)
            })
          }
        </ul>
      </SortCommon>
    )
  }
}
export default QuickSort
