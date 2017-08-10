import React from 'react';

import './style';

class HistoryTag extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {time, picture, username, sex, user_level, sign} = this.props;
		return (
			<div className="HistoryTag">
				<p className="htime"><i></i>{time}</p>
				<div className="hcontent">
					<div className="himgroom">
						<img src={'public/img/'+picture}/>
					</div>
					<div className="huser">
						<p>{username} <i className={+sex?'nan':'nv'}></i><span className="level"><i></i>{user_level/100^0}</span></p>
						<p>{sign}</p>
					</div>
				</div>
			</div>		
		)
	}
}
export default HistoryTag;