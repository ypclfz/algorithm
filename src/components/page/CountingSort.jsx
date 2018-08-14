import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class CountingSort extends React.Component {
  
  countingSort = (arrSrc) => {
    const arr = [...arrSrc]
    if (arr.length === 0 || arr.length === 1) return arr

    const k = Math.max(...arr)
    const order = new Array(k+1).fill(0)
    arr.forEach((v, i) => {
    	order[v] += 1
    })
    for (let i = 1; i < k+1; i++) {
    	order[i] = order[i] + order[i-1]
    }
    let newArr = []
    let len = arr.length
    while(len--) {
    	const value = arr[len]
    	newArr[order[value] - 1] = value
    	order[value] -= 1 
    }
    return newArr
  }

  render () {
    return (<SortCommon title="CountingSort" onSort={this.countingSort} timeLock={true} animationLock={true}/>)
  }
}
export default CountingSort
