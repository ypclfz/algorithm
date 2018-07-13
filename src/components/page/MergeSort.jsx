import React from 'react'
import SortCommon from '../common/SortCommon'
import { CSSTransition, Transition } from 'react-transition-group'

let levelMax = 0
let endAnimation = null

class MergeSort extends React.Component {
  
  constructor (props) {
  	super(props)
  	this.state = {
  		arr: [],
  		levelTree: null
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

  mergeSortAnimation = (arrSrc, end) => {
  	const arr = arrSrc.map((number, index) => ({number, index}))
  	this.setState({
  		arr
  	})
  	endAnimation = end

  	this.$tool.delayMethod(1000).then(() => {
  		const tree = { level: 0 }
      levelMax = 0
  		this.getLevelRec(tree, 0, arr.length - 1)
      
  		this.setState({ levelTree: tree })
  	})
  }

  getLevelRec (tree, start, end) {
  	if (start < end) {
  		const median = Math.floor( (start + end) / 2 )
	  	Object.assign(tree, {
	  		start,
	  		end,
	  		median,
	  		left: {level: tree.level + 1},
	  		right: {level: tree.level + 1}
	  	})
	  	
	  	this.getLevelRec(tree.left, start, median)
	  	this.getLevelRec(tree.right, median + 1, end)
  	}else {
  		tree.index = start
      levelMax = levelMax < tree.level ? tree.level : levelMax  
  	}
  }

  generateLevelEl = (data, state = false) => {
  	let result
    if (data.index === undefined) {
      const arr = []
      arr.push(this.generateItem(data, 'left', state))
      arr.push(this.generateItem(data, 'right', state))
      result = arr
    } else {
  		const item = this.state.arr[data.index]
      const style = {}
      style.border = 'black solid 1px'
      result = <li className="block" key={item.index} style={style}>{item.number}</li>
  	}

  	return result
  }

  generateItem = (data, position, state) => {
    const item = data[position]
    let flag = false
    if(state === 'entered') {
      flag = true
    }
    return  (
      <Transition
        in={flag}
        appear={flag}
        key={item['index'] === undefined ? `${item['start']}#${item['end']}` : `${item['index']}#${item['index']}`}
        timeout={500}
        onEnter={(el) => {this.beforeMoving(el)}}
        onEntering={(el) => {this.handleMoving(el, item, position)}}>
        {
          (state) => (<div style={{display: 'inline-block'}}>{this.generateLevelEl(item, state)}</div>)
        }
      </Transition>
    )
    
  } 

  beforeMoving (el) {
    el.style.transform = `translateX(0px)`
  }

  handleMoving (el, data, position) {
    this.$tool.delayMethod(0).then(() => {
      position = position === 'left' ? -1 : 1
      const xDis = position * (levelMax - data.level + 1) * 10 
      el.style.transform = `translate(${xDis}px, 40px)`
      el.style.transition = 'all 500ms'  
    })
  }

  handleMoved () {

  }

  

  render () {
  	let result
  	if (this.state.levelTree === null) {
  		result = this.state.arr.map(item => {
				const style = {}
				style.border = 'black solid 1px'
				return (
					<li className="block" style={style} key={item.index}>{item.number}</li>
				)
		  })
  	}else {
  		result = <Transition in={true} appear={true} key='root' timeout={0}>{(state) => (<div>{this.generateLevelEl(this.state.levelTree, state)}</div>)}</Transition>
  	}

    return (
    	<SortCommon title="MergeSort" onSort={this.mergeSort} onAnimation={this.mergeSortAnimation}>
    		<ul className="animation-ul">
	    		{result}
    		</ul>
    	</SortCommon>
    )
  }
}
export default MergeSort
