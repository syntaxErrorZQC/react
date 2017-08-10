import React from 'react';
import {connect} from 'react-redux';

import Title from '_c/Title';
import HistoryTag from '_c/HistoryTag';

import './style';

const History = props => {
	let {time, picture, username, sex, user_level, sign, title} = props;
	return (
		<section className="history">
			<Title history={props.history} title={title}></Title>
			<HistoryTag time={time} picture={picture} username={username} sex={sex} 
			user_level={user_level} sign={sign} title={title} ></HistoryTag>
		</section>
	)
}

const mapStateToProps = (state) => {
	// console.log(state)
	return state.historyRes;
}

const mapDispatchToprops = () => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToprops
)(History);

