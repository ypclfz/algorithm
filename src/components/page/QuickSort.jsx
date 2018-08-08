/*
快速排序

动画的实现尝试使用纯手写的方式，不使用react-transition-group插件
*/
import React from 'react'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'
let endAnimation = null
let animationTime = 1
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
    const arr = arrSrc.map((number, index) => new Block({number, index, animationTime}))
    arr.forEach((item, index) => {
      if (index - 1 > -1) {
        item.beFore = arr[index - 1]
      }
      if (index + 1 < arr.length) {
        
      }
    })
    endAnimation = end

    // 构建基础布局
    this.setState({ arr })

    // 一秒后执行模拟快速排位
    await this.$tool.delayMethod(1000)
    // 选取最后一位
    const temp = arr[arr.length - 1]
    temp.borderColor = 'red'
    temp.y = 80
    this.setState({ arr })

    await this.$tool.delayMethod(animationTime * 1000)

    let chooseIndex = -1
    for (let i = 0; i < arr.length - 1; i++) {
      const choose = arr[i]
      choose.borderColor = 'green'
      choose.y = 80
      this.setState({ arr })
      await this.$tool.delayMethod(animationTime * 1000)
      if (choose['number'] <= temp['number']) {
        choose.x = -40 * (i - chooseIndex)
        choose.y = 0
        chooseIndex++
      } else {
        choose.y = 0
      }
      this.setState({ arr })
      await this.$tool.delayMethod(animationTime * 1000)
    }
    
      
      

    // let chooseIndex = 0
    // const choose = arr[i]
    // choose.borderColor = 'green'
    // choose.transitionFlag = true
    // choose.transform = 'translateY(80px)'
    // this.delayMethod(animationTime * 1000).then(() => {
    //   if(choose['number'] <= arr[i]['number']) {
    //     choose.transitionFlag = true
    //     choose.transform = 'translateX(-40px)'
    //   } else {
    //     choose.transform
    //   }
    // })
    
    
    
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
