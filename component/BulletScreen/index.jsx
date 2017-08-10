import React from 'react';
import {connect} from 'react-redux';

import './style';
/*

*/ 
class BulletScreen extends React.Component {
	constructor(props) {
		super(props);
		this.node = [];
	}
	systemInfo(hint,k) {
		return (
			<div key={k} className="systemInfo">
				<span style={{color:'#FD6D53',fontWeight:600}}><i></i>系统信息: </span>
				<span style={{color:'#999',fontSize:'14px'}}>{hint}</span>
			</div>
		)
	}
	// 发言
	character(info) {
		return info.map((v,k) => {
			if (v.hint) {
				return this.systemInfo(v.hint,k);
			}
			if (v.inx) {
				return this.showLiwu(v,k);
			}
			let {level, nickname, text} = v;
			return (
				<div key={k} className="character">
					<span className="level"><i></i>{level} </span>
					<span style={{color:'#448AFB'}}> {nickname}: </span>
					<span>{text}</span>
				</div>
			)
		});
	}
	// 礼物
	showLiwu(info,k) {
		let {level, nickname, inx} = info;
		let data = JSON.parse(localStorage.getItem('liwu'));
		let imgObj = null;
		data.forEach((v,k) => {
			if (+v.id === +inx) {
				imgObj = v;
				return; 
			}
		})
		return (
			<div key={k} className="character">
				<span className="level"><i></i>{level} </span>
				<span style={{color:'#FA8D25'}}> <span style={{color:'#448AFB'}}>{nickname}</span>送了主播一个 </span>
				<img src={'public/img/'+imgObj.picture} style={{width: '30px'}}/>
				<span style={{color:'#E72A2F'}}>{imgObj.name}</span>
			</div>
		)
	}

	render() {
		let {info, nickname} = this.props;
		return (
			<section className="bulletScreen">
				{
					this.systemInfo(`欢迎来到${nickname}的直播间,喜欢就点关注吧。本直播提倡监堂的直播环境, 
									对直播内容24小时巡查。任何传播违法、违规、低俗等不良信息时将被封号。`)
				}
				{
					this.character(info) 
				}
			</section>
		)
	}
}
const mapStateToProps = state => {
	return state.bulletScreenRes;
}
const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BulletScreen);