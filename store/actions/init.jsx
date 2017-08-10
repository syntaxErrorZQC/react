const init = {};
init.userEdit = {
	userInfo: {
		pic: 'user.gif',
		nickname: '',
		sex: 1,
		birthday: '1990-01-01',
		emotion: 1,
		city: '北京 北京市',
		hobby: '',
		sign: ''
	},
	hobbyContent: ['男人', '女人', '旅游', '游戏', '学习', '歌曲', '美食', '购物']
}
init.user = {
	data: {
		anchor_level:0,
		city:'未tianxie',
		fans:null,
		follow:null,
		id:50,
		identity:null,
		income:null,
		isanchor:0,
		job:null,
		name:null,
		picture: "user.gif",
		sex:1,
		sign:null,
		uid:58,
		user_level:0,
		nav: [
			{
				name: '排行榜',
				href: '/'
			},
			{
				name: '等级',
				href: '/'
			},
			{
				name: '关注',
				href: '/'
			},
			{
				name: '粉丝',
				href: '/'
			}
		],
		userinfo_one:[
			{
				icoClass: '',
				name: '',
				href: ''
			}
		],
		userinfo_two:[
			{
				icoClass: '',
				name: '',
				href: ''
			}
		]
	}
}
init.room = {
	user: {
		nickname: '',
		addr: '',
		picture: 'public/img/anchor_1.jpeg',
		count: 139
	},
	liwu: '-212px',
	hint: {
		isshow: false,
		hint: '您的账号余额已不足, 请前往充值...',
		href: '/room',
		color: '#E7292E',
		btnText: '前往充值',
	}
	// liwu: '40px'
}
init.userCheck = {
	title: {className: 'left', value: '实名认证'},
	input: [
		{head: '真实姓名' ,type: 'text', holder: '请输入您的真实姓名'},
		{head: '验证码' ,type: 'text', holder: '请输入手机验证码'},
		{head: '身份证号', type: 'text', holder: '请输入您的身份证号码'}
	],
	button: [
		{
			className: 'submit',
			value: '提交'
		}
	]
}

init.history = {
	title: {className: 'left', value: '观看历史'},
	username: '齐振林',
	time: '2017-07-02',
	picture: 'user.gif',
	sex: 1,
	user_level: 350,
	sign: '这家伙很懒, 什么都没有留下'
}

init.topup = {
	nickname: '罗伊策',
	level: '3',
	gold: '1000',
	weixin: '1234213',
	bili: '10'
}
export default init;