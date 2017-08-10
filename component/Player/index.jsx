import React from 'react';
import {connect} from 'react-redux';
import ShowStatement from '_c/ShowStatement';
// import Screen from '_c/Screen';

import './style';
class Player extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let stateInfo = this.props.stateInfo;
		return (
			<section className="player">
				<div id="playercontainer" className="playercontainer"></div>
				<div className="screenWrap">
					{
						stateInfo.map((v,k) => {
							return <ShowStatement key={k} text={v}></ShowStatement>
						})
					}
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return state.playerScreenRes;
}
const mapDispatchToProps = dispatch => {
	return {

	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Player);