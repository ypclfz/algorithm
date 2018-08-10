/* 
堆排序

动画 使用CSS3实现 没有使用动画回调API 而是使用了延时函数
*/
import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class HeapSort extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: [],
      groups: [],
      description: ''
    }

    this.descriptionMap = new Map([
      ['build', '自底向上构建最大堆'],
      ['get', '取出最大值'],
      ['judst', '调整堆顺序'],
      ['success', '排序完成']
    ])
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
    const arrResult = []
    const time = animationTime * 1000
    this.time = time
    this.levelMap = this.getLevelMap(arr.length)
    let groups = this.getGroups(arr)
    this.setState({
      arr: [],
      groups
    })
    await this.$tool.delayMethod(1000)
    
    // 构建最大堆
    this.setState({
      description: this.descriptionMap.get('build')
    })
    await this.buildMaxHeapAnimation(arr)
    // 构建有序数组   
    while(arr.length !== 0) {
      arr.forEach(item => {item.clear()})
      arrResult.unshift(arr.splice(0, 1)[0])
      if (arr[0]) {
        this.levelMap = this.getLevelMap(arr.length)
        groups = this.getGroups(arr)
        this.setState({
          groups,
          arr: arrResult,
          description: this.descriptionMap.get('get')
        })
        await this.$tool.delayMethod(1000)
        arr[0].backgroundColor = 'red'
        this.setState({
          groups,
          description: this.descriptionMap.get('judst')
        })
        await this.$tool.delayMethod(1000)
        await this.MaxHeapAnimation(arr, 0)  
      } else {
        this.setState({
          arr: arrResult,
          groups: [],
          description: this.descriptionMap.get('success')
        })
      }     
    }
    end()
    
  }

  buildMaxHeapAnimation = async (arr) => {
    for(let i = Number.parseInt(arr.length/2) - 1; i > -1; i--) {
      arr[i].backgroundColor = 'red'
      this.setState({groups: this.state.groups})
      await this.$tool.delayMethod(500)
      await this.MaxHeapAnimation(arr, i)
    }
  }

  MaxHeapAnimation = async (arr, i) => {
    const length = arr.length
    const time = this.time
    const l = 2 * i + 1
    const r = 2 * i + 2
    let largest = i
    let flag

    // console.log(arr[i]['number'], arr[l]['number'], arr[r]['number'])
    if (l < length && arr[l]['number'] > arr[largest]['number']) {
      largest = l
      flag = 1
    }
    if (r < length && arr[r]['number'] > arr[largest]['number']) {     
      largest = r
      flag = -1
    }
    
    if (i !== largest) {
      const levelMax = this.levelMap.get('max')
      const level = this.levelMap.get(largest)
      const x = Math.pow(2, levelMax - level)*20
      arr[largest].y -= 40
      arr[largest].x += x * flag
      arr[i].y += 40
      arr[i].x -= x * flag
      this.$tool.exchangeArr(arr, i, largest)
      this.setState({groups: this.state.groups})
      await this.$tool.delayMethod(time)
      await this.MaxHeapAnimation(arr, largest)
    } else {
      arr[largest].backgroundColor = ''
    }
  }

  getLevelMap (length) {
    const map = new Map()
    let temp = 0
    let tempVal = Math.pow(2, temp)
    for (let i = 0; i < length; i++) {
      if (i >= tempVal) {
        temp += 1
        tempVal += Math.pow(2, temp)
      }
      map.set(i, temp)
    }
    map.set('max', temp)
    return map
  }

  getGroups (arr) {
    const powMap = new Map()
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

    const groups = this.state.groups
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
        arr.push(<div style={{width: (all - group.length)*width}} key='extra'></div>)
      }
      return (<ul className="animation-ul" key={index} style={ulStyle}>{arr}</ul>)
    }
    return ( 
      <SortCommon title="HeapSort" onSort={this.heapSort} onAnimation={this.heapSortAnimation}>
      <ul className="animation-ul" style={{marginBottom: '20px'}}>
        { 
          this.state.arr.map((item, index) => {
            return (<li className='block' key={`result__${item.index}`} style={item.style}>{item.number}</li>)
          })
        }
      </ul>
      {
        groups.map((group, index) => divBlocks(group, index, groups.length))
      }
      <div>{this.state.description}</div>
      </SortCommon>
    )
  }
}
export default HeapSort
