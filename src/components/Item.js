import React, { Component } from 'react';

class Item extends Component {
	handleOnRemove() {
	    this.props.onRemove(this.props.item.id);
	}

	handleOnDone() {
	  	this.props.onDone(this.props.item.id);
	}

	handleDoubleClick() {
		this.props.onDouble(this.props.item.id);
	}

	render() {
	    return (<div style={{ 
	      		textDecoration: 
	      		this.props.item.check ?
	                'line-through' : 'none'
	      	}}>
	    <span onDoubleClick={() => this.handleDoubleClick()}>{this.props.item.value}</span>
	    <input type="button" className="remove" value="remove"
	        onClick={() => this.handleOnRemove()} />
	    <input type="checkbox" className="done"
	     	checked={this.props.item.check}
	      	onClick={() => this.handleOnDone()} 
	      	/>
	    </div>);
	  }
}

export default Item;