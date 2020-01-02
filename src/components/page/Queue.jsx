import React, {Component, Fragment} from 'react'
import {Input, Button, Icon, message, InputNumber} from 'antd'

const arrowStyle = {
	
}

class Queue extends Component {
	
	constructor (props) {
		super(props)
		this.state = {
			queue: null,
			createLength: 10,
			enQueueNumber: 10,
			queueHead: 0,
			queueTail: 0
		}
	}

	createQueue = () => {
		const { createLength } = this.state
		const queue = new Array(createLength)
		queue.fill(null)
		this.setState({queue, queueHead: 0, queueTail: 0})
	}

	checkNull = () => {
		return new Promise((reject) => {
			if (this.state.queue === null) {
				message.warning('请创建队列')
			}	else {
				reject()
			}
		})
	}
	
	enQueue = () => {
		this.checkNull().then(() => {
			let { enQueueNumber, queue, queueHead, queueTail } = this.state
			let newQueueTail = queueTail === queue.length - 1 ? 0 : queueTail + 1
			if (newQueueTail === queueHead) {
				return message.warning('当前队列已满，上溢出')
			}
			queue[queueTail] = enQueueNumber
			this.setState({queue, queueTail: newQueueTail})	
		})
	}

	deQueue = () => {
		this.checkNull().then(() => {
			let { queue, queueHead, queueTail } = this.state
			if (queueHead === queueTail) {
				return message.warning('当前队列为空，下溢出')
			}
			const number = queue[queueHead]
			queueHead = queueHead === queue.length - 1 ? 0 : queueHead + 1
			this.setState({queueHead})
			message.success(`出队数字为${number}`)	
		})
	}

	render () {
		const { queue, queueHead, queueTail, createLength, enQueueNumber } = this.state
		const headArrowStyle = {
			top: -40,
			left: queueHead * 40
		}
		const tailArrowStyle = {
			top: 40,
			left: queueTail * 40
		}
		return (
			<Fragment>
				<h1 className="title">队列介绍</h1>
				<p className="description">一种动态集合，且在其上进行DELETE操作所移除的元素是预先设定的，被删去的总是在集合中存在时间最长的那个元素。队列实现的是一种<b>先进先出</b>（first-in,first-out,FIFO）策略。</p>
				<h1 className="title">队列实例</h1>
				<p className="description">利用数组Q[1...n]实现一个最多容纳n-1个元素的循环队列</p>
				<div>
					<div className="opera-style">
						<Button onClick={this.createQueue}>创建队列</Button>
						<InputNumber min={1} max={20} value={createLength} onChange={(createLength) => {this.setState({createLength})}}/>
					</div>
					<div className="opera-style">	
						<Button onClick={this.enQueue}>入队</Button>
						<InputNumber value={enQueueNumber} onChange={(enQueueNumber) => {this.setState({enQueueNumber})}}/>
					</div>
					<div className="opera-style">
						<Button onClick={this.deQueue}>出队</Button>
					</div>
					<div style={{margin: '50px 0', textAlign: 'center'}}>
						{ queue 
							? <div style={{position: 'relative', display: 'inline-block'}}>
									<ul className="none-ul">
										{
											queue.map((item, index) => (
												<li className="block" key={index}>{item}</li>
											))
										}
									</ul>
									<div className="arrow" style={headArrowStyle}>
										<span>head</span>
										<br />
										<Icon type="arrow-down" />
									</div>
									<div className="arrow" style={tailArrowStyle}>
										<Icon type="arrow-up" />
										<br />
										<span>tail</span>
									</div>
								</div>
							: <span>暂无队列</span>
						}
					</div>
				</div>
			</Fragment>
		)
	}
}
export default Queue
