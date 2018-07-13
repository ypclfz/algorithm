import React from 'react'
import {Input, Button} from 'antd'
import SortCommon from '../common/SortCommon'

class ShellSort extends React.Component {
  
  shellSort = (arrSrc) => {
    const arr = [...arrSrc]


    return arr
  }

  render () {
    return (<SortCommon title="ShellSort" onSort={this.shellSort}/>)
  }
}
export default ShellSort
