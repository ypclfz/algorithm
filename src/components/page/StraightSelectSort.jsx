import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class StraightSelectSort extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }
  }

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

  handleAnimation = async (arr, end, animationTime) => {
    arr = arr.map((number, index) => new Block({number, index, animationTime}))
    this.animationTime = animationTime
    this.setState({ arr })
    await this.$tool.delayMethod(1000)
    const temp = [...arr]

    for (let i = 0; i < temp.length; i++) {
      let minKey = i
      let minValue = temp[minKey]['number']
      temp[i].borderColor = 'red'
      temp[i].y = 80
      await this.refresh()

      for (let j = i + 1; j < temp.length; j++) {
        const value = temp[j]['number']
        temp[j].y = 40
        await this.refresh()
        
        if (minValue > value) {
          temp[minKey].borderColor = ''
          temp[minKey].y = 0
          temp[j].borderColor = 'red'
          temp[j].y = 80
          minKey = j
          minValue = value
        } else {
          temp[j].y = 0
        }
        await this.refresh()
      }

      if (minKey !== i) {
        const x = (minKey - i) * 40 
        temp[i].x += x
        temp[minKey].x -= x 
      }
      temp[minKey].y = 0
      temp[minKey].borderColor = 'green'
      this.$tool.exchangeArr(temp, i, minKey) 
      await this.refresh()
    }

    temp.forEach(item => {item.clear()})
    this.setState({arr: temp})
    end()
  }

  async refresh () {
    const arr = this.state.arr
    const time = this.animationTime * 1000
    this.setState({ arr })
    await this.$tool.delayMethod(time) 
  }

  render () {
    return (
      <SortCommon title="StraightSelectSort" onSort={this.straightSelectSort} onAnimation={this.handleAnimation}>
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
export default StraightSelectSort
