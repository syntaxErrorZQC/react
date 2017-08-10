import React from 'react';
import {connect} from 'react-redux';

import Title from '_c/Title';
import Inputs from '_c/Inputs';
import Button from '_c/Button';
import Hint from '_c/Hint';
import CheckCode from '_c/CheckCode';
 
import ajx from '_/services/request.jsx';
let {postData} = ajx;

import './style';


class UserCheck extends React.Component {
	constructor(props) {
		super(props);
		this.checkCode = '';
		this.state = {
			isShowHint: false,
			hint: ''
		}
	}
	check(inps) {
		console.log(this.checkCode);
		if (inps[0].value === '') {
			this.setState({isShowHint:true, hint:'名字不能为空!!'});
			return false;
		}
		if(inps[1].value === '') {
			this.setState({isShowHint:true, hint:'请填写验证码!!'});
			return false;
		}
		// 130303199511172214
		if(+inps[1].value !== +this.checkCode) {
			console.log(inps[1].value,555);
			console.log(this.checkCode,555);
			this.setState({isShowHint:true, hint:'验证码填写错误!!'});
			return false;
		}
		// let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		// if(!(reg.test(inps[2].value))) {
		// 	this.setState({isShowHint:true, hint:'请填写正确的身份证号码!!'});
		// 	return false;
		// }
		return true;
	}
	reply() {
		this.setState({isShowHint:false, hint:''})
	}
	componentDidMount() {
		let inps = document.getElementsByTagName('input');
		this.inpphone = inps[1].value;
	}
	sendMethd(fn) {
		return fn();
	}
	getPhone() {
		let login = localStorage.getItem('login');
		return JSON.parse(login).phone;
	}

	render() {
		let {title, input, button, history, onClick} = this.props;
		return (
			<section className="userCheck">
				<Title title={title} history={history}></Title>
				<p className="tmp">根据相关的规定, 您需要通过实名认证才能开启直播</p>
				<Inputs style={{marginTop: '50px'}} input={input}></Inputs>
				<CheckCode style={{position:'absolute', top: '196px'}}  getPhone={this.getPhone} space={this}></CheckCode>
				<div style={{marginTop: '50px'}}>
				<Button onClick={onClick.bind(this)} button={button[0]}></Button>
				</div>
				{this.state.isShowHint && (<Hint hint={this.state.hint} color="red" onClick={this.reply.bind(this)} href="userCheck"></Hint>)}
			</section>
		)
	}
}

const mapStateToProps = (state,newState) => {
	return state.userCheck;
}
const mapDispatchToProps = (dispatch) => {
	return {
		onClick() {
			console.log(11);
			let login = localStorage.getItem('login');
			let uid = JSON.parse(login)['uid'];
			let inputs = document.getElementsByTagName('input');
			// 检测
			if (!this.check(inputs)) return;
			postData('webcast', {
				id: uid,
				real_name: inputs[0].value,
				pnum: inputs[2].value
			}).then((res)=>{
				console.log(res);
				if (res.data.suc) {
					localStorage.setItem('toten', res.data.token);
					console.log(this.props)
					this.props.history.push('/UserCheckSuc');	
					this.props.history.go(1);
				} else {
					this.setState({
						isShowHint: true,
						hint: res.data.mes
					});
				}
				// this.props.history.push('/startWebcast');
			});
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserCheck);
