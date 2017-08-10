import React from 'react';
import {Link} from 'react-router-dom';
import './style';

class Title extends React.Component {
	constructor(props) {
		super(props);
	}
	handler() {
		window.history.go(-1);
	}
	render() {
		let {title} = this.props;
		return (
			<div className="title">
				<a href="javascript:;" onClick={this.handler.bind(this)}>
					<i className={title.className}></i>
				</a>
				{title.value}
			</div>
		)
	}
}

export default Title;
