import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'
import Block from '../../common/Block'

class RadixSort extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: [],
      buckets: [],
      description: ''
    }
  }

  radixSort = (arrSrc) => {
    let arr = [...arrSrc]

    let maxSize = arr.reduce((max, item) => {
      const size = (item + '').length
      return max < size ? size : max
    }, 1)
    
    let m = 1
    while (m <= maxSize) {
      let bucket = []
      let length = 10 // 对于十进制只需要十个容器
      while(length--) {
        bucket.push([])
      }

      for (let i = 0; i < arr.length; i++) {
        const temp = Math.floor(arr[i]/Math.pow(10, m - 1)) % 10
        const item = bucket[temp]
        item.push(arr[i])
      }
      arr = bucket.reduce((temp, item) => {
        return temp.concat(item)
      }, [])
      m++
    }
    return arr
  }

  handleAnimation = async (arr, end, animationTime) => {
    const maxSize = arr.reduce((max, item) => {
      const size = (item + '').length
      return max < size ? size : max
    }, 1)
    this.animationTime = animationTime
    arr = arr.map((number, index) => new Block({number, index, animationTime}))
    this.setState({arr})
    await this.$tool.delayMethod(1000)

    let m = 1
    while (m <= maxSize) {
      let buckets = this.getBuckets()
      this.setState({
        description: `对第${m}位进行排序`,
        buckets: this.getBuckets(),
      })

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        const number = item.number
        const temp = Math.floor(number/Math.pow(10, m - 1)) % 10
        const bucket = buckets[temp]
        
        item.borderColor = 'red'
        item.y = 40 * (temp + 1)
        item.x += 40 * (bucket.length - i)

        bucket.push(item)
        this.setState({ arr })
        await this.refresh()
      }
      
      await this.$tool.delayMethod(500)
      
      const temp = []
      let total = 0
      for (let i = 0; i < buckets.length; i++) {
        
        const bucket = buckets[i]
        if (bucket.length !== 0) {
          for (let j = 0; j < bucket.length; j++) {
            const item = bucket[j]
            temp.push(item)
            item.borderColor = 'green'
            item.y = 0
            item.x += 40 * (total - j)
            total++
          }
          
          await this.refresh()
        }
      }
      temp.forEach(item => {item.clear()})
      arr = temp
      this.setState({ arr })
      m++
      await this.$tool.delayMethod(500)
    }
    this.setState({buckets: [], description: ''})
    end()
  }

  getBuckets () {
    let buckets = []
    let length = 10 // 对于十进制只需要十个容器
    while(length--) {
      buckets.push([])
    }
    return buckets
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
    const ulStyle = {
      textAlign: 'left',
      position: 'relative',
      paddingLeft: '40px',
      height: '40px'
    }
    return (
      <SortCommon title="RadixSort" onSort={this.radixSort} onAnimation={this.handleAnimation}>
        <div>
          <ul className="animation-ul" style={ulStyle}>
            { 
              this.state.arr.map((item, index) => {
                return (<li className='block' key={item.index} style={item.style}>{item.number}</li>)
              })
            }
          </ul>
          {
            this.state.buckets.map((bucket, index) => {
              return (
                <ul className="animation-ul" style={ulStyle} key={`buckt_${index}`}>
                  <li style={{width: '20px', position: 'absolute', left: '20px', lineHeight: '40px'}}>{index}</li>
                  { 
                    /*bucket.map((item, index_in) => {
                      return (<li className='block' key={`${index}_${index_in}`} style={item.style}>{item.number}</li>)
                    })*/
                  }
                </ul>
              )
            })
          }
          <div>{this.state.description}</div>
        </div>
      </SortCommon>
    )
  }
}
export default RadixSort
