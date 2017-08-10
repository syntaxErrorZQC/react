import {combineReducers} from 'redux';
import init from '#/store/actions/init';
// home页面的reduce
const showHintRes = (state = {
	nav:[],
	items:[],
	speed:3000,
	users:[]
}, action) => {
	switch(action.type) {
		case 'CHANGE_CUR':
			return {
				cur: action.cur
			}
		case 'INIT_HOME':
			return action.data
		default:
			return state;
	}
}

// user页面的reduce
const contentRes = (state = init.user, action) => {
	switch(action.type) {
		case 'INIT_USER':
			return action;
		default:
			return state;
	}
}

// userEdit页面的reduce
const userEditRes = (state = init.userEdit, action) => {
	switch(action.type) {
		case 'UPDATE_EDIT':
			var userInfo = action.data.msg.userInfo;
			for(var k in userInfo) {
				userInfo[k] = userInfo[k]!==null?userInfo[k]:'';
			}
			return action.data.msg;
		case 'CHANGE_INPUT':
			let newState = JSON.parse(JSON.stringify(state));
			Object.assign(newState.userInfo, action.data);
			return newState;
		case 'CHANGE_BUTTON':
			let newState1 = JSON.parse(JSON.stringify(state));
			Object.assign(newState1.userInfo, action.data);
			return newState1;
		default: 
			return state;
	}
}
// 房间页面
const roomRes = (state = init.room, action) => {
	switch(action.type) {
		case 'SHOW_LIWU':
			state.liwu = state.liwu == '-212px' ? '40px' : '-212px';
			let result = JSON.parse(JSON.stringify(state));
			return result;
		case 'SHOW_HINT':
			state.hint = action.data;
			return JSON.parse(JSON.stringify(state));
		default: 
			return state;
	}
} 
// 房间的弹幕信息
const playerScreenRes = (state = {stateInfo: []}, action) => {
	switch(action.type) {
		case 'JIAN_INFO':
			state.stateInfo.shift();
			return state;
		case 'ADD_INFO': 
			state.stateInfo.push(action.data);
			return state;
		case 'UPDATA_SCREEN':
			state.stateInfo.push(action.data);
			return JSON.parse(JSON.stringify(state));
		case 'UPDATA_STATE':
			return JSON.parse(JSON.stringify(state));
		case 'INIT_STATEINFO':
			return {stateInfo: []}
		default: 
			return state;
	}
}
// 房间的通讯展示
const bulletScreenRes = (state = {info:[]}, action) => {
	switch(action.type) {
		case 'UPDATA_BULLETSCREEN':
			state.info.push(action.data);
			let data = JSON.parse(JSON.stringify(state));
			return data;
		case 'INIT_INFO':
			return {info:[]};
		default:
			return state;
	}
}

// 房间页面的发言按钮相关
const inputRes = (state = {}, action) => {
	switch(action.type) {
		case 'UPDATA_INPUT':
			// state.room = action.data;
			let data = JSON.parse(JSON.stringify(state));
			data.room = action.data;
			return data;
		default:
			return state;
	}
}
// 充值页面
const topupRes = (state = init.topup, action) => {
	switch(action.type) {
		case 'UPDATA_TOPUP':
			return action.data;
		default:
			return state;
	}
}

// 用户检测页面(实名认证)
const userCheck = (state = init.userCheck, action) => {  
	switch(action.type) {
		default: 
			return state;
	}
}

// 历史记录页面
const historyRes = (state = init.history, action) => {
	switch(action.type) {
		case 'UPDATA_HISTORY':
			return action.data;
		default: 
			return state;
	}
}

export default combineReducers({showHintRes, contentRes, 
	userEditRes,userCheck, historyRes,
	topupRes, roomRes, bulletScreenRes,
	inputRes, playerScreenRes
}); 