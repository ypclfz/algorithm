import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class HeapSort extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }
  }

  heapSort = (arrSrc) => {
    const arr = [...arrSrc]

    // 建立最大堆
    this.buildMaxHeap(arr)
    // 依次取出
    const arrResult = []
    for (let i = arr.length - 1; i > 0; i--) {
      this.$tool.exchangeArr(arr, i, 0)
      arr.heap_size -= 1
      this.MaxHeap(arr, 0)
    }
    return arr
  }

  buildMaxHeap (arr) {
    arr.heap_size = arr.length
    for(let i = Number.parseInt(arr.length/2) - 1; i > -1; i--) {
      this.MaxHeap(arr, i)
    }
  }
  
  MaxHeap (arr, i) {
    const l = 2*i+1
    const r = 2*(i+1)
    let largest = l < arr.heap_size && arr[l] > arr[i] ? l : i
    largest = r < arr.heap_size && arr[r] > arr[largest] ? r : largest
    if (largest !== i) {
      this.$tool.exchangeArr(arr, i, largest)
      this.MaxHeap(arr, largest)
    }
  }

  heapSortAnimation = async (arr, end, animationTime) => {
    arr = arr.map((number, index) => new Block({number, index, animationTime}))
    this.setState({arr})

    await this.$tool.delayMethod(1000)    
  }

  getGroups () {
    const arr = this.state.arr
    const groups = []
    let i = 0
    let length = 1
    while (i < arr.length) {
      groups.push(arr.slice(i, i + length))
      i += length
      length *= 2
    }
    return groups
  }

  render () {

    const groups = this.getGroups()
    const ulStyle = {
      display: 'flex',
      justifyContent: 'center'
    }
    const divBlocks = (group, index, length) => {
      const width = Math.pow(2, length - index - 1)*40
      const all = Math.pow(2, index) 
      const style = {
        width 
      }
      const arr = group.map((item) => {
        return (
          <div style={style} key={item.index}>
            <li className='block' style={item.style}>{item.number}</li>
          </div>
        )
      })
      if (all > group.length) {
        arr.push(<div style={{width: (all - group.length)*width}}></div>)
      }
      return (<ul className="animation-ul" key={index} style={ulStyle}>{arr}</ul>)
    }
    return ( 
      <SortCommon title="HeapSort" onSort={this.heapSort} onAnimation={this.heapSortAnimation}>
      {
        groups.map((group, index) => divBlocks(group, index, groups.length))
      }
      </SortCommon>
    )
  }
}
export default HeapSort
