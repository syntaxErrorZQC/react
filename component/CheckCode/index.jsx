import React from 'react';
import ajx from '_/services/request';
let {getData} = ajx;

import './style';
class CheckCode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			getCode: '获取验证码'
		}
	}
	getCode(space, getPhone) {
		let phone = getPhone();
		if (this.state.disabled) return;
		if (!(/^1[34578]\d{9}$/.test(phone))) {
			space.setState({isShowHint: true,hint:'请填写正确的手机格式'});
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
				var data = JSON.parse(req.data);
			} else {
				var data = req.data;
			}
			if (data.errno) {
				space.setState({hint:data.msg});
			}
			space.checkCode = data.msg
		});
	}
	render() {
		let {space, getPhone} = this.props;
		return (
			<button style={this.props.style} className="btnCheckCode" onClick={this.getCode.bind(this,space,getPhone)} disabled={this.state.disabled} >{this.state.getCode}</button>
		)
	}
}

export default CheckCode;

