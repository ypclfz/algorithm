import React from 'react'
import SortCommon from '../common/SortCommon'
let endAnimation = null
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

  quickSortAnimation = (arrSrc, end) => {
    const arr = arrSrc.map((number, index) => ({number, index}))
    endAnimation = end

    this.setState({ arr })
    this.$tool.delayMethod(1000).then(() => {
      this.setState()
    })
  }

  render () {
    return (
      <SortCommon title="QuickSort" onSort={this.quickSort} onAnimation={this.quickSortAnimation}>
        <ul className="animation-ui">
          { 
            this.state.arr.map((item, index) => {
              let style = {}
              return (<li className='block' key={item.index}>{item.number}</li>)
            })
          }
        </ul>
      </SortCommon>
    )
  }
}
export default QuickSort
