import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ajx from '_/services/request';

import Title from '_c/Title';
import Button from '_c/Button';
import Hint from '_c/Hint';

import './style';

class Topup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cur: 1,
			isshow: false,
			hint: null,
			href: null,
			color: null,
			btnText: null
		}
		this.login = JSON.parse(localStorage.getItem('login'));
		this.info = {
			nickname: this.login.nickname,
			level: this.login.user_level,
			gold: this.login.gold,
			weixin: 1303031995,
		}
	}
	init() {
		this.login = JSON.parse(localStorage.getItem('login'));
		this.info = {
			nickname: this.login.nickname,
			level: this.login.user_level,
			gold: this.login.gold,
			weixin: 1303031995,
		}
		this.setState({
			isshow: false,
			hint: null,
			href: null,
			color: null,
			btnText: null
		})
	}
	render() {
		let {bili, select, submit} = this.props;
		let {nickname, level, gold, weixin} = this.info;
		let {cur, isshow, hint, href, color, btnText} = this.state;
		return (
			<section className="topup">
				<Title title={{className:'left', value:'充值'}}></Title>
				<div className="tuser">
					<p>
						<span className="ttile">账号昵称:</span>
						<span>{nickname}</span>
					</p>
					<p>
						<span className="ttile">等级:</span>
						<span>{level}</span>
					</p>
					<p>
						<span className="ttile">账号余额:</span>
						<span><span style={{color:'red'}}>{gold} </span>卡币</span>
					</p>
					<p>
						<span className="ttile">客服:</span>
						<span>{weixin}</span>
					</p>
				</div>
				<div className="price">
					<Button style={{marginTop:'20px',marginBottom:'10px'}} button={{className:'submit1',value:'查看等级特权'}}></Button>
					<p className="ex">请选择充值金额</p>
					<ul onClick={select.bind(this)}>
						<li data-index="1" className={cur==1?'tcur':''} >
							<span>{10*bili}贼卡币</span>
							<span>10元</span>
						</li>
						<li  data-index="2" className={cur==2?'tcur':''} >
							<span>{50*bili}贼卡币</span>
							<span>50元</span>
						</li>
						<li  data-index="3" className={cur==3?'tcur':''} >
							<span>{100*bili}贼卡币</span>
							<span>100元</span>
						</li>
						<li data-index="4" className={cur==4?'tcur':''} >
							<span>{200*bili}贼卡币</span>
							<span>200元</span>
						</li>
						<li data-index="5" className={cur==5?'tcur':''} >
							<span>{400*bili}贼卡币</span>
							<span>400元</span>
						</li>
						<li data-index="6" className={cur==6?'tcur':''} >
							<span>{500*bili}贼卡币</span>
							<span>500元</span>
						</li>
					</ul>
				</div>

				<Button onClick={submit.bind(this)}  style={{marginTop:'40px'}} button={{className:'submit1', value:'确认支付'}}></Button>
				{
					this.state.isshow && <Hint onClick={this.init.bind(this)} hint={hint} href={href} color={color} btnText={btnText} ></Hint>
				}
			</section>
		)
	}
}


const mapStateToProps = state => {
	console.log(state);
	return state.topupRes;
}

const mapDispatchToProps = dispatch => {
	return {
		submit() {
			let money = 0;
			switch(+this.state.cur) {
				case 1:
					money = 10;
					break;
				case 2:
					money = 50;
					break;
				case 3:
					money = 100;
					break;
				case 4:
					money = 200;
					break;
				case 5:
					money = 400;
					break;
				case 6:
					money = 500;
					break;
				default: 
					return;
			}
			ajx.getData('useredit/userPay?uid='+this.login.uid + '&money='+money).then(res=> {
				let data = res.data;
				if (typeof data === 'string') data = JSON.parse(data);
				console.log(data)
				console.log(res.data);
				if (+data.suc) {
					this.login.gold = data.msg.gold;
					this.login.user_level = data.msg.user_level;
					localStorage.setItem('login', JSON.stringify(this.login));
					// 成功
					this.setState({
						isshow: true,
						hint: '充值成功..',
						href: '/topup',
						color: '#FECD50',
						btnText: null
					});	
				} else {
					// 失败
					this.setState({
						isshow: true,
						hint: data.msg,
						href: '/topup',
						color: '#E7262C'
					});
				}
			});
		},
		select(e) {
			this.setState({cur: e.target.getAttribute('data-index')});
		} 
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Topup);




