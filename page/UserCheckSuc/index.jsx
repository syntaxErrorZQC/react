import React from 'react';
import {Link} from 'react-router-dom';

import Title from '_c/Title';
import Button from '_c/Button';

import './style';

const UserCheckSuc = (props) => {
	let title = {className: 'left', value: '实名认证'};
	return (
		<section className="userCheckSuc">
			<Title title={title}></Title>
			<div className="contentHint">
				<div className="checkPic"><i></i></div>
				<p className="checkText">认证成功</p>
				<p className="checkHint">恭喜你, 已经完成实名认证</p>
			</div>
			<div style={{marginTop: '30px'}}>
				<Link to="/startWebcast"><Button button={{className:'submit1', value:'确定'}}></Button></Link>
			</div>
		</section>
	)
}

export default UserCheckSuc;