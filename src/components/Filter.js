import React, { Component } from 'react';

class Filter extends Component {
	seeAll() {
		this.props.all();
	}

	seeActive() {
		this.props.active();
	}

	seeFinished() {
		this.props.finished();
	}

	render() {
		return (
			<div>
				<button onClick={() => this.seeAll() }>All</button>
				<button onClick={() => this.seeActive() } >Active</button>
				<button onClick={() => this.seeFinished() } >Finished</button>
			</div>
		)
	}
}

export default Filter;