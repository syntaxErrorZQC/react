import React from 'react';
// import {dispatch} from 'react-redux';
import store from '#/store';
import ajx from '_/services/request';
import {connect} from 'react-redux';

import actions from '#/store/actions';
let {updata_input, updata_bulletScreen, updata_screen, showHint, show_liwu} = actions;
let updata = updata_bulletScreen;

let {getData} = ajx;
let dispatch = store.dispatch;
import './style';

class Liwu extends React.Component {
	constructor(props) {
		super(props);
		this.login = JSON.parse(localStorage.getItem('login'));
		this.roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
		this.state = {
			select: -1,
			items: [],
			login: this.login
		}
	}
	componentDidMount() {
		let liwuList = localStorage.getItem('liwu');
		if (!liwuList) {
			getData('room/present').then((res)=>{
				let data = res.data.slice(0,8);
				localStorage.setItem('liwu', JSON.stringify(data));
				this.setState({
					items: data
				})				
			});
		} else {
			liwuList = JSON.parse(liwuList);
			this.setState({
				items: liwuList
			})
		}
	}
	select(index, data) {
		this.selectInfo = data;
		this.setState({select:index});
	}
	getPresent(room) {
		// 没有选中礼物的情况
		if (!this.selectInfo) {
			dispatch(showHint({
				isshow: true,
				hint: '您没有选中任何礼物...',
				href: '/room',
				color: '#E7292E',
				btnText: '返回',
				clickHint: () => {
					dispatch(showHint({
						isshow: true,
						hint: '您没有选中任何礼物...',
						href: '/room',
						color: '#E7292E',
						btnText: '返回'
					}))
				}
			}));
			return;
		}
		// 余额不足的情况
		if (+this.login.gold < +this.selectInfo.price) {
			dispatch(showHint({
				isshow: true,
				hint: '您账号余额已不足, 请充值...',
				href: '/topup',
				color: '#E7292E',
				btnText: '前往充值'
			}))
			return;
		}
		// 检测通过可以发送礼物
		ajx.postData('money/recharge', {
			from: this.login.uid,
			to: this.roomInfo.room.uid,
			pid: this.selectInfo.id
		}).then(res=>{
			let data = res.data;
			console.log(data)
			if (typeof data === 'string') data = JSON.parse(data);
			if (data.suc) {
				console.log('000');
				let price = String(this.selectInfo.price).replace('千','000');
				price = price.replace('万','0000');
				this.login.gold = (+this.login.gold) - (+price);
				localStorage.setItem('login', JSON.stringify(this.login));
				this.setState({login: this.login});
				dispatch(show_liwu())
				this.sendLiwu(this.selectInfo.id, this.props.room);
			} else {
				dispatch(showHint({
					isshow: true,
					hint: data.msg,
					href: '/room',
					color: '#E7292E',
					btnText: '确定'
				}))
			}
		})
	}
	// 发送礼物
	sendLiwu(type,room) {
		// 获得获取用户信息
		let login = localStorage.getItem('login');
		login = JSON.parse(login);
		let {nickname, user_level} = login;
		// 整合数据
		let info = {
			level: user_level,
			nickname: nickname,
			inx: type
		}
		let msg = new AV.TextMessage(JSON.stringify(info));
		// 发送消息
		room.send(msg).then(function(data) {
			dispatch(updata(info));
			// dispatch(updata_screen(info.text));
		});
	}
	render() {
		let {liwu, room} = this.props;
		let items = this.state.items;
		let node = {};
		return (
			<div className="liwu" style={{bottom:liwu}}>
				<ul>
					{
						items.map((v,k)=>{
							return (
								<li key={k} className={this.state.select == k ? "lcur": ''} onClick={this.select.bind(this, k, v)}><a href="javascript:;">
									<img src={'public/img/' + v.picture} alt=""/>
									<p className="gold"><i></i>{v.price}贼卡币</p>
								</a></li>
							)
						})
					}
				</ul>
				<p className="liwuHint">您的账号余额: <span>{this.state.login.gold}</span> 贼卡币<a className="liwuBtn" onClick={this.getPresent.bind(this, room)}>送礼</a></p>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return state.inputRes;
}
const mapDispatchToProps = dispatch => {
	return {}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Liwu);