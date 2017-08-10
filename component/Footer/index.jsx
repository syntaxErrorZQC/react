import React from 'react';
import {Link} from 'react-router-dom';

import ajx from '_/services/request';
let {getData} = ajx;

import Hint from '_c/Hint';

import './style';

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowHint: false
		}
	}
	handler() {
		let login = localStorage.getItem('login');
		console.log(JSON.parse(login))
		let uid = JSON.parse(login)['uid']
		getData('index/isanchor?uid='+uid).then((res) => {
			if (!res.data.msg) {
				this.setState({isShowHint: true});
			} else {
				this.props.history.push('/startWebcast');
			}
		} )
		// 检测是否是主播

		// this.setState({isShowHint:true});
	}
	render() {
		const {cur} = this.props;
		return (
			<section className="footer">
				<ul>
					<li className={cur==1?'cur':''}>
						<Link to="/home"><i></i></Link>
					</li>
					<li onClick={this.handler.bind(this)}>
						<a href="javascript:;"><i></i></a>
					</li>
					<li className={cur==2?'cur':''}>
						<Link to="/user"><i></i></Link>
					</li>
				</ul>
				{
					this.state.isShowHint && <Hint hint="根据相关法律法规, 您必须实名认证才能直播。" href="/userCheck"></Hint>
				}
			</section>
		)
	}
}



export default Footer;