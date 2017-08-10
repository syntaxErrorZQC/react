import React from 'react';
import {Link} from 'react-router-dom';

import Video from '_c/Video';
import Button from '_c/Button';
import Hint from '_c/Hint';

import './style';

class StartWebcast extends React.Component {
	constructor(props) {
		super(props);
		this.upload = '您的推流地址是: rtmp://push.secretbase.top/zb/zb' + localStorage.getItem('toten'); 
		this.state = {
			isShow: false
		}
	}
	handler() {
		this.setState({isShow: true});
	}
	render() {
		let {hint} = this.state;
		return (
			<section className="startWebcast">
				<p className="shead"><a href="javasript:;"><Link to="/user"><i></i></Link></a></p>
				<Video></Video>
				<input className="sinp" autoFocus type="text" defaultValue="给直播写个标题吧"/>
				<Button onClick={this.handler.bind(this)} button={{className: 'submit', value: '开始直播'}}></Button>
				<p className="sfoot">直播即代表你同意 <a href="#">《贼卡主播协议》</a></p>
				{this.state.isShow && (<Hint hint={this.upload} href="/room"></Hint>)}
			</section>
		)
	}
}


export default StartWebcast;