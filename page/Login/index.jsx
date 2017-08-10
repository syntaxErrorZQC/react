import React from 'react';

import jax from '_/services/request';
import { Link } from 'react-router-dom';
import Title from '_c/Title';

import './style';

class Login extends React.Component {
	constructor(props) {
		// loading();
		let data = localStorage.getItem('login');
		if (!data) {
			createNode();
		}
		super(props);
		this.state = {
			'hint': ''
		} 
	}
	componentDidMount() {
		let first = document.getElementsByClassName('first');
		if (first[0]) {
			remove();
		}
	}
	componentWillUnmount() {
		window.isdisplay = false;
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
	checkPhone() {
		let phone = this.refs.phone.value;
	}
	checkPwd() {
		let pwd = this.refs.password.value;
	}
	login() {
		let phone = this.refs.phone.value;
		let pwd = this.refs.password.value;
		jax.postData('user/regist', {phone, pwd}).then(req => {
			let data = req.data;
			if(data.errno) {
				if (!this.state.hint) {
					this.setState({'hint': data.msg});
				}
			} else {
				data.msg.phone = phone;
				localStorage.setItem('login', JSON.stringify(data.msg));
				this.props.history.push('/home');
			}
		});
	}
	check() {
		return false;
	}
	showHint(hint) {
		return (<div className="hint">{hint}</div>);
	}

	render() {
		let {hint} = this.state;
		return (
			<section className="login">
				<Title title={{value: '登录'}}></Title>
				<from className="from">
					<p className="phone"><i></i>
						<input ref="phone" type="text" onBlur={this.checkPhone.bind(this)} placeholder="请输入手机号"/>
					</p>
					<p className="password"><i></i>
						<input ref="password" onBlur={this.checkPwd.bind(this)} type="password" placeholder="输入密码"/>
					</p>
					<div className="forget"><a href="#">忘记密码</a></div>
					<div className="btn">
						<button onClick={this.login.bind(this)}>登录</button>
						<Link to="/regist"><button>注册</button></Link>
					</div>
				</from>
				{
					hint && this.showHint(hint)
				}
			</section>
		)
	}
}

export default Login;