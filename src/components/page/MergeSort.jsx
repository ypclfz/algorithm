/*
归并排序
*/
import React from 'react'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class MergeSort extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }
  }

  mergeSort = (arrSrc) => {
    const arr = [...arrSrc]

    this.mergeSortRec(arr, 0, arr.length - 1)

    return arr
  }

  // 递归合并
  mergeSortRec (arr, start, end) {  
    if (start < end) {
      const median =  Math.floor( (start + end) / 2 )
      this.mergeSortRec(arr, start, median)
      this.mergeSortRec(arr, median + 1, end)
      this.mergeArr(arr, start, end, median)  
    }
  }

  // 合并有序数组
  mergeArr (arr, start, end, median) {
    const arr1 = arr.slice(start, median + 1)
    const arr2 = arr.slice(median + 1, end + 1)
    arr1.push(Infinity)
    arr2.push(Infinity)
    let i = 0, j = 0
    for(let k = start; k <= end; k++) {
      if(arr1[i] <= arr2[j]) {
        arr[k] = arr1[i]
        i++
      }else {
        arr[k] = arr2[j]
        j++
      }
    }
  }

  mergeSortAnimation = async (arr, end, animationTime) => {
    arr = arr.map((number, index) => new Block({number, index, animationTime}))
    this.animationTime = animationTime
    this.setState({ arr })
    await this.$tool.delayMethod(1000)

    let level = 0
    while (Math.pow(2, level) < arr.length) {
      level++
    }
    this.allLevel = level
    const temp = [...arr]
    await this.mergeSortRecAnimation(temp, 0, arr.length - 1, 0)

    temp.forEach(item => item.clear())
    this.setState({arr: temp})
    end()
  }

  async mergeSortRecAnimation (arr, start, end, level) {
    if (start < end) {
      const median = Math.floor( (start + end) / 2 )
      const x = (this.allLevel - level) * 10
      for (let i = start; i <= median; i++) {
        arr[i].x -= x
        arr[i].y += 40
      }
      for (let i = median + 1; i <= end; i++) {
        arr[i].x += x
        arr[i].y += 40
      }
      await this.refresh()
      await this.mergeSortRecAnimation(arr, start, median, level + 1)
      await this.mergeSortRecAnimation(arr, median + 1, end, level + 1)
      await this.mergeArrAnimation(arr, start, end, median, x)
    }
  }

  async mergeArrAnimation (arr, start, end, median, x) {
    const arr1 = arr.slice(start, median + 1)
    const arr2 = arr.slice(median + 1, end + 1)
    arr1.push({number: Infinity})
    arr2.push({number: Infinity})
    let i = 0, j = 0, left = median - start + 1
    for (let k = start; k <= end; k++) {
      if (arr1[i]['number'] <= arr2[j]['number']) {
        arr1[i].y -= 40
        arr1[i].x += x
        arr1[i].x += (k - i - start) * 40
        arr[k] = arr1[i]
        i++
      } else {
        arr2[j].y -= 40
        arr2[j].x -= x
        arr2[j].x += (k - left - j - start) * 40
        arr[k] = arr2[j]
        j++
      }
      await this.refresh()
    }
  }

  async refresh () {
    const time = this.animationTime * 1000
    const arr = this.state.arr
    this.setState({
      arr 
    })
    await this.$tool.delayMethod(time)
  }

  render () {
    return (
      <SortCommon title="MergeSort" onSort={this.mergeSort} onAnimation={this.mergeSortAnimation}>
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
export default MergeSort
