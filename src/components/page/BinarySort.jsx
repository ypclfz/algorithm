/*
二分插入排序
*/
import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class BinarySort extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }
  }

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
        } else {
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

  handleAnimation = async (arr, end, animationTime) => {
    arr = arr.map((number, index) => new Block({number, index, animationTime}))
    this.animationTime = animationTime
    this.setState({ arr })
    await this.$tool.delayMethod(1000)

    const temp = [...arr]
    temp[0].borderColor = 'green'
    for(let i = 1; i < temp.length; i++) {
      let key = temp[i]['number']
      let start = 0
      let end = i - 1
      temp[i].y = 80
      temp[i].borderColor = 'red'
      await this.refresh()
      while (start <= end) {
        const mid = Math.floor( (start + end) / 2 )
        temp[mid].y = 40
        await this.refresh()
        if (temp[mid]['number'] > key) {
          end = mid - 1
        } else {
          start = mid + 1
        }
        temp[mid].y = 0
        await this.refresh()
      }

      temp[i].borderColor = 'green'
      temp[i].y = 0
      if (start !== i) {
        for (let j = start; j < i; j++) {
          temp[j].x += 40
        }
        temp[i].x -= (i - start) * 40
        temp.splice(start, 0, temp.splice(i, 1)[0])
      }
      await this.refresh()
    }

    temp.forEach(item => {item.clear()})
    this.setState({arr: temp})
    end()
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
      <SortCommon title="BinarySort" onSort={this.binarySort} onAnimation={this.handleAnimation}>
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
export default BinarySort
