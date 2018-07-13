import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class HeapSort extends React.Component {
  
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

  render () {
    return (<SortCommon title="HeapSort" onSort={this.heapSort}/>)
  }
}
export default HeapSort
