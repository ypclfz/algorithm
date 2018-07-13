import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class BubbleSort extends React.Component {
  
  bubbleSort = (arrSrc) => {
    const arr = [...arrSrc]
    
    let count = 0
    for (let j = arr.length; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        count += 1
        if (arr[i] > arr[i+1]) {
          this.$tool.exchangeArr(arr, i, i+1)
        }
      }  
    }
   
    return arr
  }

  render () {
    return (<SortCommon title="BubbleSort" onSort={this.bubbleSort}/>)
  }
}
export default BubbleSort
