import React from 'react';

import ajx from '_/services/request';
let {getData, postData} = ajx;

import {Link} from 'react-router-dom';

import './style';

class Regist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'hint':'',
			'getCode': '获取验证码',
			'disabled': false
		}
		this.checkCode = null;
	}
	componentDidUpdate(prevProps, prevState) {
		clearTimeout(timeout);
		if (this.state.hint !== '') {
			var timeout = setTimeout(()=>{
				this.setState({'hint':''});
				clearTimeout(timeout);
			}, 2000);
		}
	}
	handleCheck() {
		// console.log(JSON.stringify([1,{ni: 'hao'},3]));return;
		let phone = this.refs.phone.value;
		let checkCode = this.refs.checkCode.value;
		let nickname = this.refs.nickname.value;
		let password = this.refs.password.value;
		// 检查格式
		if(!(/^1[34578]\d{9}$/.test(phone))){
			if (this.state.hint) return;
			this.setState({hint:'请填写正确的手机格式'});
			return;
		}
		if(!checkCode) {
			if (this.state.hint) return;
			this.setState({hint:'验证码不能为空'});
			return;
		}
		if(checkCode != this.checkCode) {
			this.setState({hint:'验证码不正确'});
			return;
		}
		if(!nickname) {
			if (this.state.hint) return;
			this.setState({hint:'昵称不能为空'});
			return;
		}
		if(password.length < 6) {
			if (this.state.hint) return;
			this.setState({hint:'密码必须大于6位'});
			return;
		}
		ajx.postData('user/login', {phone, checkCode, nickname, password}).then(req=>{
			let data = req.data;
			console.log(req.data,11);
			if (data.errno != 0) {
				this.setState({hint: req.data.msg});
				return;
			}
			data.msg.phone = phone;
			data.msg.nickname = nickname;
			localStorage.setItem('login', JSON.stringify(data.msg));
			sessionStorage.setItem('diyici', '1');
			this.props.history.push('/home');
		});
	}
	showHint(hint) {
		return (<div className="rhint">{hint}</div>);
	}

	getCode() {
		let inp = this.refs.phone
		if (this.state.disabled) return;
		let phone = inp.value;
		if (!(/^1[34578]\d{9}$/.test(phone))) {
			this.setState({hint:'请填写正确的手机格式'});
			return;
		}
	  	let n = 10;
	  	let timer = null;
	  	this.setState({'getCode': n+'秒','disabled': true});
  		timer = setInterval(() => {
  			n--;
  			this.setState({'getCode': n+'秒'});
  			if (n == 0) {
  				clearInterval(timer);
  				this.setState({'getCode': '获取验证码', 'disabled':false});
  				n = 10;
  			} 
  		},1000);
		ajx.getData('user/getCheckCode/'+phone).then((req)=>{
			if (typeof req.data === 'string') {
				console.log(req.data)
				var data = JSON.parse(req.data);
			} else {
				var data = req.data;
			}
			console.log(data, '验证码,111');
			if (data.errno) {
				this.setState({hint:data.msg});
			}
			this.checkCode = data.msg
		});
	}

	render() {
		let {hint, getCode, disabled} = this.state;
		return (
			<section className="regist">
				<h1 className="rtitle"><Link to=""><i className="token"></i></Link>注册</h1>
				<from className="from">
					<p className="phone"><i></i>
						<input ref="phone" type="text" placeholder="请输入手机号"/>
					</p>
					<p className="checkCode"><i></i>
						<input ref="checkCode" type="text" placeholder="请输入验证码"/>
						<button className="fetchCode" onClick={this.getCode.bind(this)}>{getCode}</button>
					</p>
					<p className="nickname"><i></i>
						<input ref="nickname" type="text" placeholder="输入昵称"/>
					</p>
					<p className="password"><i></i>
						<input ref="password" type="password" placeholder="输入密码"/>
					</p>
					<div className="btn">
						<button onClick={this.handleCheck.bind(this)}>同意服务条款并注册</button>
					</div>
					<div className="clause"><a href="#">《贼卡直播服务条款》</a></div>
				</from>
				{
					hint && this.showHint(hint)
				}
			</section>
		)
	}
}
export default Regist;