/*
直接插入排序

动画的实现尝试使用了react-transition-group，但是感觉并不适用于当前使用场景，过于繁琐了
*/
import React from 'react'
import SortCommon from '../common/SortCommon'
import '../../css/animation.css'
import { CSSTransition } from 'react-transition-group'

let endAnimation = null

class StraightInsertionSort extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      keyIndex: '',
      orderlyArr: [],
      outTrigger: false,
      compareIndex: '',
      backControl: false,
      moveControl: {},
      count: 0
    }
  }

  straightInsertionSort = (arrSrc) => {
    const arr = [...arrSrc]

    for (let j = 1; j < arr.length; j++) {
      let key = arr[j]
      let i = j - 1
      while(i >= 0 && arr[i] > key) {
        arr[i+1] = arr[i]
        i = i - 1
      }
      arr[i+1] = key
    }

    return arr
  }

  straightInsertionSortAnimation = (arrSrc, end) => {
    endAnimation = end
    const arr = arrSrc.map((number, index) => ({number, index}))
    const moveControl = {}
    arr.forEach(item => {
      moveControl[item.index] = false
    })
    this.setState({
      arr,
      moveControl
    })
    this.$tool.delayMethod(1000).then(() => {
      this.selectItem(1)
    })   
  }

  selectItem (keyIndex) {
    keyIndex = keyIndex === undefined ? this.state.keyIndex + 1 : keyIndex
    
    if (keyIndex < this.state.arr.length) {
      this.setState({
        keyIndex,
        compareIndex: keyIndex - 1
      })
      this.$tool.delayMethod(100).then(() => {
        this.setState({
          backControl: true
        })
      })
    } else {
      this.setState({
        keyIndex: '',
        compareIndex: '',
        count: 0
      })
      endAnimation()
    }
  }

  insertItem () {
    const arr = this.state.arr
    if(this.state.compareIndex < 0 || arr[this.state.keyIndex]['number'] >= arr[this.state.compareIndex]['number']) {
      this.setState({
        backControl: false
      })
    }else {
      const moveControl = this.state.moveControl
      moveControl[arr[this.state.compareIndex]['index']] = true
      this.setState({
        moveControl,
      })
    }
  }

  moveCallBack () {
    this.setState({
      compareIndex: this.state.compareIndex - 1
    })
    this.$tool.delayMethod(100).then(() => {
      this.insertItem()
    })
  }

  backExiting (element) {
    const style = element.style
    const xN = -1 * (this.state.keyIndex - this.state.compareIndex - 1) * 40
    style.transform = `translate(${xN}px, 0px)`
    style.transition = 'all 500ms'
  }

  backExited (element) {
    const style = element.style
    style.transform = ''
    style.transition = ''
    const arr = this.state.arr
    const item = arr.splice(this.state.keyIndex, 1)[0]
    arr.splice(this.state.compareIndex + 1, 0, item)
    const moveControl = {}
    arr.forEach(item => {
      moveControl[item.index] = false
    })
    this.setState({
      arr,
      moveControl,
      count: this.state.count + 1
    })    
    this.$tool.delayMethod(100).then(() => {
      this.selectItem()
    })   
  }

  render () {
    return (
      <div>
        <SortCommon title="StraightInsertionSort" onSort={this.straightInsertionSort} onAnimation={this.straightInsertionSortAnimation} timeLock={true}>
          {            
            <ul className="animation-ul">
              {
                this.state.arr.map((item, index) => {
                  const style = {}

                  if (index === this.state.keyIndex) {
                    style.border = 'red 1px solid'
                    return (
                      <CSSTransition
                        in={this.state.backControl} 
                        classNames="take-out" 
                        key={item.index + '#' + this.state.count}
                        timeout={500}
                        onEntered={() => {this.insertItem()}} 
                        onExiting={(element) => {this.backExiting(element)}}
                        onExited={(element) => {this.backExited(element)}}>
                          <li className="block" style={style} key={item.index}><span>{item.number}</span></li>
                      </CSSTransition>
                    )
                  } else if(index < this.state.keyIndex) {
                    style.border = 'green 1px solid'
                    return (
                      <CSSTransition in={this.state.moveControl[item.index]} classNames="move" key={item.index + '#' + this.state.count} timeout={500} onEntered={() => {this.moveCallBack()}}>
                        <li className="block" style={style} key={item.index}><span>{item.number}</span></li>
                      </CSSTransition>
                    )
                  } else {
                    style.border = 'black 1px solid'
                    return (<li className="block" style={style} key={item.index}><span>{item.number}</span></li>)
                  }
                })
              }
            </ul>            
          }
          
          
        </SortCommon>
      </div>
    )
  }
}
export default StraightInsertionSort
