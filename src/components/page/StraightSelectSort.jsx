import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class StraightSelectSort extends React.Component {
  
  straightSelectSort = (arrSrc) => {
    const arr = [...arrSrc]

    for (let j = 0; j < arr.length; j++) {
      let minKey = j
      let minValue = arr[minKey]

      for (let i = j + 1; i < arr.length; i++) {
        const value = arr[i]
        if (minValue > value) {
          minKey = i
          minValue = value
        }
      }

      this.$tool.exchangeArr(arr, j, minKey)
    }
    

    return arr
  }

  render () {
    return (<SortCommon title="StraightSelectSort" onSort={this.straightSelectSort}/>)
  }
}
export default StraightSelectSort
