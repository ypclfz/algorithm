import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class BinarySort extends React.Component {
  
  binarySort = (arrSrc) => {
    const arr = [...arrSrc]

    for (let j = 1; j < arr.length; j ++) {
      let key = arr[j]
      let start = 0
      let end = j - 1
      // 相比于 直接插入排序 使用二分查找的方式
      while (start <= end) {
        let mid = Math.floor( (start + end) / 2 )
        if(arr[mid] > key) {
          end = mid - 1
        }else {
          start = mid + 1
        }
      }

      if (start !== j) {
        arr.splice(j, 1)
        arr.splice(start, 0, key)
      }
    }

    return arr
  }

  render () {
    return (<SortCommon title="BinarySort" onSort={this.binarySort}/>)
  }
}
export default BinarySort
