import React from 'react';
import './style';

class EndWebcast extends React.Component {
	render() {
		// 图片, 昵称, 观看人数, 获得金币, 获得用户粉丝, 主播总经验, 本次直播获得的经验
		let {pic, nickname, peoNum, countGold, countFans,anchor_level, countLevel} = this.props;
		return (
			<section className="endwebcast">
				<div className="euser">
					<div className="pic">
						<img src= alt={pic}/>
					</div>
					<p>{nickname}</p>
				</div>
				<p>直播已结束</p>
				<ul>
					<li><span>{peoNum}</span>人看过</li>
					<li><span>{countGold}</span>收益</li>
					<li><span>{countFans}</span>粉丝</li>
				</ul>
				<div>
					<div><i></i>主播</div>
					<div>{anchor_level}</div>
					<div>{countLevel}</div>
				</div>
				<div>返回首页</div>
			</section>
		)
	}
}
export default EndWebcast;