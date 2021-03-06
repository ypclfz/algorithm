import React from 'react'
import {Input, Button, Icon, message} from 'antd'
import { InputNumber } from 'antd'
import '../../css/animation.css'

class SortCommon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      result: [],
      animationLock: false,
      animationTime: 0.5
    }
  }

  onChange = (e) => {
    const {value} = e.target
    this.setState({value})
  }

  handleSort = () => {
    let arrSrc 
    try {
      arrSrc = JSON.parse(this.state.value)
    }catch (e) {
      message.warning('输入不符合规范')
      return false
    }
    if (Array.isArray(arrSrc)) {
      const arr = this.props.onSort(arrSrc)
      this.setState({
        result: arr
      })  
    }
  }

  handleAnimation = () => {
    let arrSrc 
    try {
      arrSrc = JSON.parse(this.state.value)
    } catch (e) {
      message.warning('JSON输入不符合规范')
      return false
    }
    if (this.state.animationTime === undefined) {
      message.warning('动画间隔不能为空')
      return false
    }
    if(Array.isArray(arrSrc)) {
      if (!this.state.animationLock) {
        this.setState({
          animationLock: true
        })
        const endAnimation = () => {
          this.setState({
            animationLock: false  
          })
        }
        this.props.onAnimation(arrSrc, endAnimation, this.state.animationTime)
      }  
    } else {
      message.warning('请确认JSON输入为数组')
    }
    
  }

  handleRandom = () => {
    const arr = []
    let i = 10
    while(i--) {
      arr.push(Number.parseInt(Math.random()*100))
    }

    this.setState({
      value: JSON.stringify(arr)
    })
  }

  onChange1 (val, key) {
    this.setState({
      [key]: val
    })
  }

  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
        
          <Input addonAfter={<Icon type="retweet" style={{cursor: 'pointer'}} title="随机生成" onClick={this.handleRandom} />} placeholder="json格式的数字数组" value={this.state.value} onChange={this.onChange}/>          
          <Button onClick={this.handleSort}>开始排序</Button>
          <Button onClick={this.handleAnimation} disabled={this.props.animationLock || this.state.animationLock}>播放排序动画</Button>
          <InputNumber placeholder="动画间隔" value={this.state.animationTime} disabled={this.props.timeLock || this.state.animationLock} min={0.1} max={10} step={0.1} onChange={(val) => {this.onChange1(val, 'animationTime')}} />
          <div>
            <span>排序结果：</span>
            <span>{this.state.result.join(',')}</span>
          </div>
          <div style={{textAlign: 'center'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    )   
  }
}
SortCommon.defaultProps = {
  animationLock: false,
  timeLock: false
};
export default SortCommon
