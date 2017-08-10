import React from 'react';
import {Link} from 'react-router-dom';
import './style';

export default class Room extends React.Component {
	constructor(props) {
		super(props);
	}
	handlr() {
		sessionStorage.setItem('roomInfo', JSON.stringify(this.props));
	}
	render() {
		const {room, info, reg} = this.props;
		return (
			<section className="room">
				<div className="rtitle">
					<div className="picwrap">
						<div className="pic">
							<img src={"public/img/"+info.picture} />
						</div>
					</div>
					<div className="user">
						<p className="uname">{reg.nickname}</p>
						<p className="addr"><i></i>{'北京'}</p>
					</div>
					<div className="sumPeo">
						<p className="count">{room.total}</p>
						<p>在看</p>
					</div>
				</div>
				<div className="picShow">
					<Link to="/room" onClick={this.handlr.bind(this)}>
						<img src={'public/img/' + (room.picture ? room.picture : info.picture)}/>
					</Link>
					<div className="text">
						<p>直播</p>
					</div>
					<div className="rname">
						{reg.nickname}的直播
					</div>
				</div>
			</section>
		)
	}
}