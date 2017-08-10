import React from 'react';
import {connect} from 'react-redux';
import ajx from '_/services/request';
import actions from '#/store/actions';
let {updata_input, updata_bulletScreen, updata_screen, closeHint} = actions;
let updata = updata_bulletScreen;

let {getData} = ajx;

import Player from '_c/Player';
import Landlord from '_c/Landlord';
import BulletScreen from '_c/BulletScreen';
import Input from '_c/Input';
import Liwu from '_c/Liwu';
import Hint from '_c/Hint';

import './style';

class Room extends React.Component {
	constructor(props) {
		super(props);
		this.login = JSON.parse(localStorage.getItem('login'));
		this.roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
		this.state = {
			picture: this.roomInfo.info.picture,
			nickname: this.roomInfo.reg.nickname,
			addr: '未在直播中',
			count: 0
		}
	}
	componentDidMount() {
		let roomInfo = this.roomInfo;
		console.log(roomInfo,'roomInfo');
		this.props.createCommunicate(roomInfo.info.uid, roomInfo.room.chat_id, this);
		// if (roomInfo.room.on_off == 1) {
			this.props.createWebcast(roomInfo.room.play_url);
		// }
	}
	render() {
		let {liwu, hint, clickHint} = this.props;
		return (
			<section className="Room">
				<Player></Player>
				<Landlord user={this.state}></Landlord>
				<BulletScreen nickname={this.roomInfo.reg.nickname}></BulletScreen>
				<Liwu liwu={liwu}></Liwu>
				<Input></Input>
				{
					hint.isshow?(<Hint onClick={clickHint} hint={hint.hint} color={hint.color} href={hint.href} btnText={hint.btnText}></Hint>):null
				}
			</section>
		)
	}
}

const mapStateToProps = state => {
	return state.roomRes;
}

const mapDispatchToProps = dispatch => {
	// realtimeObject.on(Event,callback)  on 方法每次派发会触发一次
	//  create  	   创建room的时候触发
	//  membersjoined  加入room的时候触发
	// 
	return {
		clickHint() {
			dispatch({
				isshow:false
			})
		},
		// 创建直播
		createWebcast(url) {
			// 用户播放地址
			let play_url = url.split(',')[2];
			var player = cyberplayer("playercontainer").setup({
		  		width : "100%",
		        height : "100%",
		        backcolor: "#FFFFFF",
		        stretching : "uniform",
		        file : play_url,
		        ak : "52c640e2dd5946b38d270256da05a5d3",
		        autoStart : true,
		        repeat : false,
		        volume : 100,
		        controls : "over"
	        });
		},
		// 创建实时通讯
		createCommunicate(uid, chat_id, space) {
			let appId = 'TaMsTkuYdueGhpc0ceKhTTEz-gzGzoHsz';
	        let appKey = 'dOGukbhf1LHWCRqEwDuDRdpp';
	        // 用户名
	        // 获得chat_id, 创建实时通讯
	        let clientId = chat_id;
	        // 房间id
	        let roomId = chat_id;
	        //登录实时通讯接口
	        AV.init(appId, appKey);
	        let realtime = new AV.Realtime({
	            appId: appId,
	            appKey: appKey,
	            plugins: AV.TypedMessagesPlugin,
	        });
	        realtime.on('membersjoined', function (msg) {
	            	console.log(111)
	            	console.log(msg);
	            });
            realtime.on('invited', function () {
            	console.log(222)
            })

	        realtime.createIMClient(clientId)
	        .then(function (client) {
	        	dispatch(updata({hint:'连接成功'}));
	            let firstFlag = false;
	            // console.log(client);
	            client.on('disconnect', function () {
	            	dispatch(updata({hint:'服务器连接已断开'}));
	            });
	            client.on('offline', function () {
	            	dispatch(updata({hint:'离线（网络连接已断开）'}));
	            });
	            client.on('online', function () {
	            	dispatch(updata({hint:'已恢复在线'}));
	            });
	            client.on('schedule', function (attempt, time) {
	            	dispatch(updata({hint: time / 1000 + 's 后进行第 ' + (attempt + 1) + ' 次重连'}));
	            });
	            client.on('retry', function (attempt) {
	            	dispatch(updata({hint:'正在进行第 ' + (attempt + 1) + ' 次重连'}));
	            });
	            client.on('reconnect', function () {
	            	dispatch(updata({hint:'重连成功'}));
	            });
	            client.on('reconnecterror', function () {
	            	dispatch(updata({hint:'重连失败'}));
	            });

	            // 获取对话
	            return client.getConversation(roomId);
	        }) 
	        .then(function (conversation) {
	        	// 检测房间是否存在
	            if (conversation) {
	            	// 将对象传递给Input组件 **** Input组件发送消息
	            	dispatch(updata_input(conversation));
	            	// 加入当前房间
	                return conversation.join();
	            } else {
	                dispatch(updata({hint:'不存在这个房间'}));
	            }
	        })
	        .then(function (conversation) {
	            // 有新消息时触发, 改变弹幕和消息面板的状态 ****
	            conversation.on('message', function (msg) {
	                // this.showMsg(message);
	                let data = JSON.parse(msg.content._lctext);
	                dispatch(updata(data));
	                dispatch(updata_screen(data.text));
	            });

	          	conversation.count().then((res)=>{
	          		space.setState({
	          			count: res
	          		})
	            });
	        })
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Room);