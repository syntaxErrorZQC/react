import url from './url';
import ajx from '_/services/request';
let {getData, postData} = ajx;
let index = {};
index.user = (data) => {    // user页面初始化信息
	data.hint = '';
	data.href = '';
	return {
		type: 'INIT_USER',
		data
	}
}
// 房间页面action
index.showHint = data => {
	return {
		type: 'SHOW_HINT',
		data
	}
}
index.jian_info = data => {
	return {
		type: 'JIAN_INFO',
		data
	}
}
index.add_info = data => {
	return {
		type: 'ADD_INFO',
		data
	}
} 
// 
index.updata_screen = data => {
	return {
		type: 'UPDATA_SCREEN',
		data
	}
}
index.show_liwu = data => {
	return {
		type: 'SHOW_LIWU',
		data
	}
}
index.updata_state = data => {
	return {
		type: 'UPDATA_STATE',
		data
	}
}
index.update = (data) => {  // home页面初始化信息
	return {
		type: 'INIT_HOME',
		data
	}
}
index.update_userEdit = (data) => { // 更新userEdit页面
	return {
		type: 'UPDATE_EDIT',
		data
	}
}
// 历史浏览页
index.updata_history = data => {
	return {
		type: 'UPDATA_HISTORY',
		data
	}
}

// 支付页面
index.updata_topup = data => {
	return {
		type: 'UPDATA_TOPUP',
		data
	}
}

// room的信息版面
index.updata_bulletScreen = data => {
	return {
		type: 'UPDATA_BULLETSCREEN',
		data
	}
}
// room发送信息
index.updata_input = data => {
	return {
		type: 'UPDATA_INPUT',
		data
	}
}

index.inputChange = (data) => {  // userEdit表单
	return {
		type: 'CHANGE_INPUT',
		data
	}
} 
index.buttonChange = (data) => {  // userEdit按钮
	return {
		type: 'CHANGE_BUTTON',
		data
	}
}



index.async = {};
// 请求的url地址
let {home,user, userEdit} = url;
// 请求home页面的信息
index.async.getList = async (dispatch) => {
	var response = await getData(home);
	var data = response.data;
	if (typeof data === 'string') data = JSON.parse(data);
	dispatch(index.update(data))
	remove();
}

// 请求user页面的信息
index.async.getUserInfo = async (dispatch, uid) => {
	let response = await postData(user, {uid});
	let data = response.data;
	if (typeof data === 'string') data = JSON.parse(data);
	dispatch(index.user(data));
}

// 请求userEdit页面的信息
index.async.getUserEdit = async (dispatch, uid) => {
	let response = await postData(userEdit, {uid});
	let data = response.data;
	if (typeof data === 'string') data = JSON.parse(data);
	dispatch(index.update_userEdit(data));
}


export default index;