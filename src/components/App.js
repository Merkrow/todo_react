import React, { Component } from 'react';
import Item from './Item';
import Filter from './Filter';

class App extends Component {
    constructor(props) {
    	super(props);
    	this.state = { value: '', items: [], filter: "all" };
	}

	handleOnChange(e) {
    	e.preventDefault();
    	this.setState({ value: e.target.value });
	}

	handleOnRemove(id) {
	    const oldItems = this.state.items;
	    const items = oldItems.filter(item => item.id !== id );

	    this.setState({ items });
	}

	handleOnClick(e) {
	    e.preventDefault();
	    if(this.state.value !== "") {
		    const items = this.state.items.slice();
		    const item = { id: +new Date, value: this.state.value, check: false };
		    items.push(item);
		    this.setState({ value: "", items});
	    }
	}

handleOnDone(id) {
  	const oldItems = this.state.items;
  	const items = oldItems.map(item => {
  		if(item.id === id) {
  			item.check = !item.check;
  		}
  		return item;
  	});
	
	this.setState({ items });
}

all() {
	this.setState({
		filter: "all"
	})
}

active() {
	this.setState({
		filter: "active"
	})
}

finished() {
	this.setState({
		filter: "finished"
	})
}

	render() {
	    const value = this.state.value;
	    const filter = this.state.filter;
	    let items;
	    switch (filter) {
	    	case 'all':
	    		items = this.state.items;
	    		break;
	    	case 'active':
	    		items = this.state.items.filter(item => !item.check);
	    		break;
	    	case 'finished':
	    		items = this.state.items.filter(item => item.check);
	    		break;
	    }
	    return (
	    	<div>
		        <form action="">
		          <input className="text" type="text" value={value}
		            onChange={e => this.handleOnChange(e)} />
		          <input className="submit" type="submit"
		            onClick={e => this.handleOnClick(e)} />
		        </form>

		        <div className="items">
		          {items.map(item => {
		            return <Item key={item.id} item={item} check={false}
		              onDone={id => this.handleOnDone(id)}
		              onRemove={id => this.handleOnRemove(id)} />;
		            }
		          )}
		        </div>
		        <Filter 
		        	all={ () => this.all() }
		        	active={ () => this.active() }
		        	finished={ () => this.finished() }
		        />
	    	</div>
	    );
	}
}

export default App;