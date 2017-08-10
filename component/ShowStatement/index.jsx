import React from 'react';
// import {connect} from 'react-redux';
import './style.less';

class ShowStatement extends React.Component {
	constructor(props) {
		super(props);
	}
	getEnd(node) {
		console.log(node);
		node.style.right = '56vh';
	}
	componentDidMount() {
		let node = this.refs.node;
		setTimeout(()=>{
			this.getEnd(node)
		},400);
	}
	
	render() {
		let {text} = this.props;
		return (
			<span ref="node" className="statement">
				{text}
			</span>
		)
	}
}

export default ShowStatement;
