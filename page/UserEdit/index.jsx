import React from 'react';
import {Link,Route} from 'react-router-dom';

import {connect} from 'react-redux';
import actions from '#/store/actions';
// import Fileinput from './fileinput';
// import FileUpload from 'react-fileupload';
import './style';

const UploadPic = props => {
	return (
		<div className="uploadPic">
			<input type="file" name="pic"/>
		</div>
	)
}

class UserEdit extends React.Component {
	constructor(props) {
		super(props);
		this.hobby = [];
		let login = localStorage.getItem('login');
		// console.log(props,'pro')
		this.uid = JSON.parse(login).uid;
		this.node = {};
		this.state = {
			isshow: false,
			// info: 
		}
	}
	componentDidMount() {
		this.props.init(this.uid);
	}	
	UploadPic() {
		return (
			<div className="uploadPic">
				<input type="file" name="pic"/>
			</div>
		)
	}

	handleSave() {
	// 	console.log(this)
	// 	let info = {};
	// 	let {birthday, city, emotion, hobby, nickname, pic, sex, sign} = this.refs;
	// 	info.picture = pic.src;
	// 	info.nickname = nickname.value;
	// 	info.city = city.innerHTML;
	// 	info.birthday = birthday.innerHTML;
	// 	info.emotion = emotion.value;
	// 	info.sex = sex.value;
	// 	info.sign = sign.value;
	// 	info.hobby = hobby.value;
	// 	// this.props.handleSave(info);
	}
	change() {
		
	}
	render() {
		let {userInfo, hobbyContent, handleSave, inputChange, buttonChange, hobbyChange} = this.props;
		let {birthday, city, emotion, hobby, nickname, pic, sex, sign} = userInfo;
		return (
			<section className="userEdit">
				<div className="utitle">
					<Link to="/user" className="backLink"><i className="back"></i></Link>
					<span>编辑资料</span>
					<a className="save" href="javascript:;" onClick={this.handleSave.bind(this)}>保存</a>
				</div>
				<ul>
					<li className="picture">
						<a href="javascript:;" className="flexParent">
							<span className="flex3">头像</span>
							<div className="wrap">
								<div className="pic">
									<img ref="pic" onClick={()=>this.setState({isshow:true})} src={'public/img/'+pic}/>
								</div>
							</div>
							<i className="rightToken"></i>
						</a>
					</li>
					<li className="nickname flexParent">
						<span className="flex3">昵称</span>
						<input className="flex9" type="text" ref={(node)=>{
							if (this.node['nickname']) return 'nickname';
							this.node['nickname'] = node;
							return 'nickname';
						}} name="nickname" 
						onChange={()=>inputChange({'nickname':this.node['nickname'].value})} value={nickname}/>
					</li>
					<li className="sex flexParent">
						<span className="flex3">性别</span>
						<div className="flex9">
							<button className={sex==1?'cur':''} 
							onClick={
								()=>buttonChange({sex:1})
							}
							ref={(node)=>{
								if (this.node['sex']) return; this.node['sex'] = node;
							}}>男</button>
							<button className={sex==0?'cur':''} 
							ref={(node)=>{
								if (this.node['sex']) return; this.node['sex'] = node;
							}}
							onClick={
								()=>buttonChange({sex:0})
							}
							>女</button>
						</div>
						<input type="hidden" ref="sex" name="sex" value={sex}/>
					</li>
					<li className="birthday">
						<a href="javascript:;" className="flexParent">
							<span className="flex3">出生日期</span>
							<input className="flex9" 
							onChange={()=>inputChange({birthday:this.node['birthday'].value})} 
							ref={(node)=>{
								if (this.node['birthday']) return;
								this.node['birthday'] = node;
							}} 
							type="date" value={birthday}/>
						</a>
					</li>
					<li className="emotion flexParent">
						<span className="flex3">情感状态</span>
						<div className="flex9">
							<button className={emotion==1?'cur':''}
								onClick={()=>buttonChange({emotion:1})}
							>单身</button>
							<button className={emotion==2?'cur':''}
								onClick={()=>buttonChange({emotion:2})}
							>已婚</button>
							<button className={emotion==0?'cur':''}
								onClick={()=>buttonChange({emotion:0})}
							>同性</button>
						</div>
						<input type="hidden" ref="emotion" value={emotion}/>
					</li>
					<li className="city flexParent">
						<span className="flex3">居住地</span>
						<input className="flex9" type="text" ref={(node)=>{
							if (this.node['city']) return;
							this.node['city'] = node;
						}} name="city" 
						onChange={()=>inputChange({'city':this.node['city'].value})} value={city}/>
					</li>
					<li className="hobby flexParent">
						<span className="flex3">爱好</span>
						<div  className="btnlist flex9" onClick={(e)=>{
							let num = e.target.getAttribute('data-key');
							hobbyChange(hobby,num)
						} }>
							{
								hobbyContent.map((v,k)=>{
									let arr = hobby.split(',');
									if (arr.indexOf(String(k)) > -1) {
										return (<button key={k} data-key={k} className="cur">{v}</button>)
									}
									return (<button key={k} data-key={k}>{v}</button>)
								})
							}
						</div>
						<input className="flex9" type="hidden" ref="hobby" value={hobby}/>
					</li>
					<li className="sign flexParent">
						<span className="flex3">个性签名</span>
						<input className="flex9" type="text" onChange={()=>inputChange({sign:this.node['sign'].value})} ref={(node)=>{
							if(this.node['sign']) return;
							this.node['sign'] = node;
						}} value={sign}/>
					</li>
				</ul>
			</section>
		)
	}
}


const mapStateToProps = (state) => {
	return state.userEditRes;
}

const mapDispatchToProps = (dispatch) => {
	return {
		init(uid) {
			actions.async.getUserEdit(dispatch,uid);
		},
		handleSave: () => {

		},
		inputChange(obj) {
			dispatch(actions.inputChange(obj));
		},
		hobbyChange(hobby,num) {
			var inx;
			var hobby = hobby ? hobby.split(',') : [];
			if ((inx = hobby.indexOf(String(num))) > -1) {
				hobby.splice(inx,1);
			} else {
				hobby.push(String(num));
			}
			dispatch(actions.buttonChange({hobby:hobby.join(',')}));
		},
		buttonChange(obj) {
			dispatch(actions.buttonChange(obj));
		}
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(UserEdit);