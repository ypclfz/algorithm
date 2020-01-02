import React, {Component, Fragment} from 'react'
import {Input, Button, Icon, message, InputNumber} from 'antd'

class Stack extends Component {
	
	constructor (props) {
		super(props)
		this.state = {
			stack: null,
			createLength: 10,
			number: 10,
			top: -1
		}
	}

	createStack = () => {
		const { createLength } = this.state
		const stack = new Array(createLength)
		stack.fill(null)
		this.setState({stack, top: -1})
	}

	checkNull () {
		return new Promise(reject => {
			if (this.state.stack === null) {
				message.warning('请创建一个栈')
			} else {
				reject()
			}
		})
	}

	sPush = () => {
		this.checkNull().then(() => {
			let { stack, top, number } = this.state
			if (top === stack.length - 1) {
				return message.warning('栈已满，上溢出')
			}
			top += 1
			stack[top] = number
			this.setState({stack, top})	
		})
	}

	sPop = () => {
		this.checkNull().then(() => {
			let { stack, top } = this.state
			if (top === -1) {
				return message.warning('栈为空，下溢出')
			}
			const number = stack[top]
			top -= 1
			message.success(`弹出数字为${number}`)
			this.setState({top})
		})
	}

	render () {
		const { createLength, number, stack, top } = this.state
		const arrowStyle = {
			top: 40,
			left: top * 40,
		}

		return (
			<Fragment>
				<h1 className="title">栈介绍</h1>
				<p className="description">一种动态集合，且在其上进行DELETE操作所移除的元素是预先设定的，被删除的是最近插入的元素。队列实现的是一种<b>后进后出</b>（last-in,first-out,LIFO）策略。</p>
				<h1 className="title">栈实例</h1>
				<p className="description">利用数组S[1...n]实现一个最多可容纳n个元素的栈</p>
				<div>
					<div className="opera-style">
						<Button onClick={this.createStack}>创建栈</Button>
						<InputNumber min={1} max={20} value={createLength} onChange={(createLength) => {this.setState({createLength})}} />
					</div>
					<div className="opera-style">
						<Button onClick={this.sPush}>压入</Button>
						<InputNumber value={number} onChange={(number) => {this.setState({number})}}/>
					</div>
					<div className="opera-style">
						<Button onClick={this.sPop}>弹出</Button>
					</div>
					<div style={{margin: '50px 0', textAlign: 'center'}}>
						{ stack 
							? <div style={{position: 'relative', display: 'inline-block'}}>
									<ul className="none-ul">
										{
											stack.map((item, index) => (
												<li className="block" key={index}>{item}</li>
											))
										}
									</ul>
									<div className="arrow" style={arrowStyle}>
										<Icon type="arrow-up" />
										<br />
										<span>top</span>
									</div>
								</div>
							: <span>暂无栈</span>
						}
					</div>
				</div>
			</Fragment>
		)
	}
}
export default Stack
