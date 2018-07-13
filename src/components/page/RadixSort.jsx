import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class RadixSork extends React.Component {
  
  radixSork = (arrSrc) => {
    let arr = [...arrSrc]

 		let maxSize = arr.reduce((max, item) => {
 			const size = (item + '').length
 			return max < size ? size : max
 		}, 1)
 		
 		let m = 1
    while (m <= maxSize) {
    	let bucket = []
    	let length = 10
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

  render () {
    return (<SortCommon title="RadixSork" onSort={this.radixSork}/>)
  }
}
export default RadixSork
