import React from 'react';
import {Link} from 'react-router-dom';

import './style';
const Hint = ({hint, href, onClick, color, btnText}) => {
	return (
		<section className="hint">
			<div className="bg">
				<p className="text"  style={{color: color}}>{hint}</p>
				<div className="btnwrap">
					<Link to={href} onClick={onClick}  className="btn">{btnText ? btnText : '确定'}</Link>
				</div>
			</div>
		</section>
	)
}

export default Hint;