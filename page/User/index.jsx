import React from 'react';
// connect
import {connect} from 'react-redux';
// actions
import actions from '#/store/actions';

import UserTop from '_c/UserTop';
import Usernav from '_c/Usernav';
import Userbar from '_c/Userbar';
import UserInfobar from '_c/Userbar';
import Footer from '_c/Footer';
import Hint from '_c/Hint';

import './style';

class User extends React.Component {
	constructor(props) {
		super(props);
		let login = localStorage.getItem('login');
		if(!login) {
			props.history.replace('/');
			return;
		}
		this.login = JSON.parse(login);
		// console.log(this.login)
	}
	componentDidMount() {
		let login = this.login;

		this.props.init(login.uid);
	}

	render() {
		let {phone, nickname} = this.login;
		let { picture, sex, rank, city, user_level, nav, userinfo_one, userinfo_two,hint,href } = this.props.data;
		console.log(this.props.data,1);
		return (
			<section>
				<UserTop pic={'public/img/'+ picture} nickname={nickname} sex={sex} rank={user_level} phone={phone} addr={city}></UserTop>
				<Usernav items={nav}></Usernav>
				<Userbar  items={userinfo_one}></Userbar>
				<UserInfobar items={userinfo_two}></UserInfobar>
				<Footer cur="2"></Footer>
				{
					hint && <Hint hint={hint} href={href}></Hint>
				}
			</section>
		)
	}
}
const mapStateToProps = (state, props) => {
	let info = state.contentRes;
	return info;
}

const mapDispatchToProps = (dispatch) => {
	return {
		init(uid) {
			actions.async.getUserInfo(dispatch,uid)
		}
	}
} 


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User);

// export default User;

