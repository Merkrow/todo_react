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

	handleCorrectChange(e, id) {
		e.preventDefault();
		const oldItems = this.state.items.slice();
		const items = oldItems.map(item => {
			if(item.id === id) {
				item.value = e.target.value;
			}
			return item;
		})
		this.setState({ items });
	}

	handleOnCorrect(e, id) {
		e.preventDefault();
		const oldItems = this.state.items.slice();
		const items = oldItems.map(item => {
			if(item.id === id) {
				item.correct = false;
			}
		})
		this.setState({ oldItems, correct: "" });
	}

	handleOnRemove(id) {
	    const oldItems = this.state.items.slice();
	    const items = oldItems.filter(item => item.id !== id );

	    this.setState({ items });
	}

	handleOnClick(e) {
	    e.preventDefault();
	    if(this.state.value !== "") {
		    const items = this.state.items.slice();
		    const item = { id: +new Date, value: this.state.value, check: false, correct: false };
		    items.push(item);
		    this.setState({ value: "", items});
	    }
	}

handleOnDouble(id) {
	const oldItems = this.state.items.slice();
	const items = oldItems.map(item => {
		if(item.id === id) {
			item.correct = !item.correct;
			this.setState({ correct: item.value })
		}
		return item;
	});

	this.setState({ items });
}

handleOnDone(id) {
  	const oldItems = this.state.items.slice();
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
		          	if(!item.correct) {
		            return <Item key={item.id} item={item} check={false}
		              onDone={id => this.handleOnDone(id)}
		              onRemove={id => this.handleOnRemove(id)}
		              onDouble={id => this.handleOnDouble(id)}/>;
		            }
		            return (<form action="">
		            	<input className="t" type="text" value={item.value}
		            	  onChange={e => this.handleCorrectChange(e, item.id) />
		            	}
		            	<input className="s" type="submit"
		            	  onClick={(e) => this.handleOnCorrect(e, item.id)} />
		            	</form>
		            	)
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