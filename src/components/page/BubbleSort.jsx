import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class BubbleSort extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }
  }

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

  handleAnimation = async (arr, end, animationTime) => {
    arr = arr.map((number, index) => new Block({number, index, animationTime}))
    const time = animationTime * 1000
    this.setState({arr})
    await this.$tool.delayMethod(1000)
    let temp = [...arr]
    for (let i = arr.length; i > 0; i--) {
      for (let j = 0; j < i - 1; j++) {
        temp[j].y = 40
        temp[j+1].y = 40
        this.setState({arr})
        await this.$tool.delayMethod(time)
        if (temp[j]['number'] > temp[j+1]['number']) {
          temp[j].x += 40
          temp[j+1].x -= 40
          this.$tool.exchangeArr(temp, j, j+1)
        }
        temp[j].y = 0
        temp[j+1].y = 0
        this.setState({arr})
        await this.$tool.delayMethod(time)
        if (j + 1 === i - 1) {
          temp[j+1].borderColor = 'green'
        }
      }
    }
    arr = temp
    arr.forEach(item => {item.clear()})
    this.setState({ arr })
    end()
  }

  render () {
    return (
      <SortCommon title="BubbleSort" onSort={this.bubbleSort} onAnimation={this.handleAnimation}>
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
export default BubbleSort
