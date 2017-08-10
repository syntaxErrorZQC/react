import React from 'react';
// import {Link} from 'react-router-dom';

import './style';

class UserTop extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let props = this.props;
		return (
			<section className="userTop">
				<div className="pic">
					<img src={props.pic} />
				</div>
				<p className="nickname">{props.nickname}<i className={props.sex?'nan':'nv'}></i><i className={'vip'+props.rank}></i></p>
				<p className="phone">Phone:{props.phone}</p>
				<p className="addr">{props.addr}</p>
			</section>
		)
	}
}
export default UserTop;