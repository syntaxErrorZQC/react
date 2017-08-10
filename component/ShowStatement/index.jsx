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
	componentDidUpdate(prevProps, prevState) {
		// console.log(this.state)
		// if (prevState.right > 100) return;
		// setTimeout(()=>{
		// 	this.setState({
		// 		right: prevState.right + 5
		// 	})	
		// },400);
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
// const mapStateToProps = state => {
// 	return state.bulletScreenRes;
// }
// const mapDispatchToProps = dispatch => {
// 	return {}
// }

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(ShowStatement);