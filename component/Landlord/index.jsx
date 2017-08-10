import React from 'react';
import {Link} from 'react-router-dom';
import store from '#/store';
import actions from '#/store/actions';

import ajx from '_/services/request';

import './style';

class Landlord extends React.Component {
	constructor(props) {
		super(props);
	}
	flow() {
		let data = JSON.parse(localStorage.getItem('login'));
		user_uid = data.uid;
		ajx.getData('room/attention?anchor_uid='+user.uid+'&user_uid='+user_uid)
		.then((res)=>{
			console.log(res,'res');
			let data = res.data;
			if (typeof data === 'string') data = JSON.parse(data);
			if (data.errno == 0) {
				store.dispatch(actions.showHint({
					hint: {
						isshow: true,
						hint: '关注成功...',
						href: '/room',
						color: '#27A264',
						btnText: '确定',
					}
				}))
			} else {
				store.dispatch(actions.showHint({
					hint: {
						isshow: true,
						hint: '出现未知错误...',
						href: '/room',
						color: '#E62128',
						btnText: '确定',
					}
				}))
			}
		})
	}
	render() {
		const {user} = this.props;
		return (
			<section className="landlord">
				<div className="ltitle">
					<div className="picwrap">
						<div className="pic">
							<img src={'public/img/' + user.picture} />
						</div>
					</div>
					<div className="user">
						<p className="uname">主播: {user.nickname}</p>
						<p className="addr"><i></i>{user.addr}</p>
					</div>
					<div className="sumPeo">
						<p className="count">{user.count}</p>
						<p>在看</p>
					</div>
				</div>
				<div className="bar">
					<a href="#"><i></i>发弹幕</a>
					<a href="javascript:;" onClick={this.flow.bind(this)}><i></i>关注</a>
					<Link to="/home"><i></i>返回</Link>
				</div>
			</section>
		)
	}
}
export default Landlord;