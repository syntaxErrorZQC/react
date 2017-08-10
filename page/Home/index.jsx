import React from 'react';
import {connect} from 'react-redux';

import Home from './HomePage';
import actions from '#/store/actions';

const mapStateToProps = (state, props) => {
	let info = state.showHintRes;
	return info;
}

const mapDispatchToProps = (dispatch) => {
	return {
		init() {
			actions.async.getList(dispatch)
		}
	}
} 


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);