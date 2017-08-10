import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import Pages from '#/page';
import store from './store';
import './style/common';
let { Login, Regist, Home, Room, User, UserEdit, 
	UserCheck, UserCheckSuc, StartWebcast, History,
	Topup } = Pages;

const Routes = () => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={Login}></Route>
				<Route path="/regist" component={Regist}></Route>
				<Route path="/home" component={Home}></Route>
				<Route path="/room" component={Room}></Route>
				<Route path="/user" component={User}></Route>
				<Route path="/userEdit" component={UserEdit}></Route>
				<Route path="/userCheck" component={UserCheck}></Route>
				<Route path="/userCheckSuc" component={UserCheckSuc}></Route>
				<Route path="/startWebcast" component={StartWebcast}></Route>
				<Route path="/History" component={History}></Route>
				<Route path="/Topup" component={Topup}></Route>
			</div>
		</Router>
	</Provider>
);

export default Routes;