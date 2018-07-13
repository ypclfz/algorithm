import React from 'react'
import {Input, Button, Icon, message} from 'antd'

class SortCommon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      result: [],
      animationLock: false
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
    }catch (e) {
      message.warning('输入不符合规范')
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
        this.props.onAnimation(arrSrc, endAnimation)
      }  
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

  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
        
          <Input addonAfter={<Icon type="retweet" style={{cursor: 'pointer'}} title="随机生成" onClick={this.handleRandom} />} placeholder="json格式的数字数组" value={this.state.value} onChange={this.onChange}/>          
          <Button onClick={this.handleSort}>开始排序</Button>
          <Button onClick={this.handleAnimation} disabled={this.state.animationLock}>播放排序动画</Button>
          <div>
            <span>排序结果：</span>
            <span>{this.state.result.join(',')}</span>
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    )   
  }
}
export default SortCommon
