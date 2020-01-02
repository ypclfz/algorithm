// import React, {Component, Fragment} from 'react'
// class Node {
// 	constructor (key) {
// 		this.key = key
// 		this.next = null
// 		this.prev = null
// 	}
// }
// class LinkedList extends Component {
// 	constructor (props) {
// 		super(props)

// 		this.state = {
// 			headKey: '',
// 			searcKey: 0,

// 		}
// 		this.head = null
// 	}

// 	searchNode (key) {
// 		let x = this.head
// 		while (x !== null && x.key !== key) {
// 			x = x.next
// 		}
// 		return x
// 	}

// 	insertNode (key) {
// 		const node = new Node(key)
// 		const x = this.head
// 		if (x !== null) 	{
// 			node.next = x
// 			x.prev = node
// 		}
// 		this.head = node
// 	}

// 	deleteNode (key) {
// 		const x = this.searchNode(key)
// 		if (x === null) return
// 		if (x.prev !== null) {
// 			x.prev.next = x.next
// 		} else {
// 			this.head = x.next
// 		}
// 		if (x.next !== null) {
// 			x.next.prev = x.prev
// 		}
// 	}

// 	handleSearch = () => {
// 		const {searcKey} = this.state
// 	}

// 	render () {
// 		const {headKey, searcKey, insetKey, deleteKey} = this.state

// 		return (
// 			<Fragment>
// 				<h1 className="title">链表介绍</h1>
// 				<p className="description">链表是一种包含多个对象并按线性顺序排列的数据结构，其中的顺序是由各个对象里的指针决定的</p>
// 				<h1 className="title">链表实例</h1>
// 				<p className="description">双向链表L的每个元素都是一个对象，每个对象有一个关键字key和两个指针：next和prev。x.next指向后继元素，x.prev则指向它的前驱元素。</p>
// 				<div>
// 					<div className="opera-style">
// 						<Button onClick={this.handleSearch}>查询</Button>
// 						<InputNumber value={searchKey} onChange={(searchKey) => {this.setState({searchKey})}}/>
// 					</div>
// 					<div className="opera-style">
// 						<Button onClick={this.handleInsert}>插入</Button>
// 						<InputNumber value={insertKey} onChange={(insertKey) => {this.setState({insertKey})}}/>
// 					</div>
// 					<div className="opera-style">
// 						<Button onClick={this.handleDelete}>删除</Button>
// 						<InputNumber value={deleteKey} onChange={(deleteKey) => {this.setState({deleteKey})}}/>
// 					</div>
// 					<div style={{margin: '50px 0', textAlign: 'center'}}>
// 						{ stack 
// 							? <div style={{position: 'relative', display: 'inline-block'}}>
// 									<ul className="none-ul">
// 										{
// 											stack.map((item, index) => (
// 												<li className="block" key={index}>{item}</li>
// 											))
// 										}
// 									</ul>
// 									<div className="arrow" style={arrowStyle}>
// 										<Icon type="arrow-up" />
// 										<br />
// 										<span>top</span>
// 									</div>
// 								</div>
// 							: <span>暂无栈</span>
// 						}
// 					</div>
// 				</div>
// 			</Fragment>			
// 		)
// 	}
// }