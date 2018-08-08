export default class Block {
	constructor ({number, index, animationTime}) {
		this.init({number, index, animationTime}) 
	}

	init ({number , index, animationTime}) {
		this.number = number
		this.index = index
		this.animationTime = animationTime
		this.__inner__ = {}
		this.clear()
	}

	set x (x) {
		this.__inner__.x = x
		this.transitionFlag = true
	}

	get x () {
		return this.__inner__.x
	}

	set y (y) {
		this.__inner__.y = y
		this.transitionFlag = true
	}

	get y () {
		return this.__inner__.y
	}

	clear () {
		this.__inner__.x = 0
		this.__inner__.y = 0
		this.transitionFlag = false
		this.borderColor = 'black'
	}

	get style () {
		return {
      border: `solid 1px ${this.borderColor}`,
      transition: this.transitionFlag ? `all ${this.animationTime}s` : '',
      transform: `translate(${this.x}px, ${this.y}px)`
    }
	}
}