import React from 'react';
import {connect} from 'react-redux';
import actions from '#/store/actions';
import {Link} from 'react-router-dom';
let {updata_input, updata_bulletScreen, updata_screen, show_liwu} = actions;
let updata = updata_bulletScreen;

import './style';

class Input extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {room, sendMsg, encode, showLiwu} = this.props
		let inp = {};
		return (
			<section className="input">
				<a href="#" className="btn" ><i></i></a>
				<input placeholder="吐个槽呗~" ref={(node)=>{
					if (inp.node) return;
					inp.node = node;
				}} className="put" type="text"/>
				<a href="#" className="inpBtn" onClick={sendMsg.bind(this, inp, room)}><i></i></a>
				<div className="func">
					<a href="#">
						<img src="public/img/hongbao.png" alt=""/>
					</a>
					<Link to="/topup">
						<img src="public/img/chongzhi.png" alt=""/>
					</Link>
					<a href="javascript:;" onClick={showLiwu}>
						<img src="public/img/liwu.png" alt=""/>
					</a>
				</div>
			</section>	
		)
	}	
}

const mapStateToProps = state => {
	return state.inputRes;
}
const mapDispatchToProps = dispatch => {
	return {
		showLiwu() {
			dispatch(show_liwu());
		},
		sendMsg(val,room) {
			let temp = val.node.value
			// console.log(val,111);return;
			if (!temp.replace(/(^\s+)|(\s+$)/g, '')) {
            	dispatch(updata({hint:'不能发送空字符'}));
                return;
            }
			// 防xss
			let data = this.props.encode(temp);
			// 获得获取用户信息
			let login = localStorage.getItem('login');
			login = JSON.parse(login);
			let {nickname, user_level} = login;
			// 整合数据
			let info = {
				level: user_level,
				nickname: nickname,
				text: data
			}
			let msg = new AV.TextMessage(JSON.stringify(info));
			// 发送消息
			room.send(msg).then(function(data) {
				val.node.value = '';
				dispatch(updata(info));
				dispatch(updata_screen(info.text));
			});
		},
		// 防xss
		encode(str) {
		    return str.replace(/&/g, '&amp;')
		        .replace(/</g, '&lt;')
		        .replace(/>/g, '&gt;');
  		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Input);