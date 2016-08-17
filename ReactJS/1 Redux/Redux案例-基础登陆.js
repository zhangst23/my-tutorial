// Redux教程1.js


// actions/user.js
'use strict';

import { AlertIOS } from 'react-native';

import * as TYPES from './types';

//fake user data
let testUser = {
	'name' = 'juju',
	'age' = '24',
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460'
};

//for skip user
let skipUser = {
	'name': 'guest',
	'age': 20,
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
};

//login
export function logIn(opt){
	return (dispatch) => {
		dispatch({'type': TYPES_LOGGED_DOING});
		let inner_get = fetch('http://www.baidu.com')
			.then((res)=>{
				dispatch({'type': TYPES_LOGGED_IN, user: testUser});
			}).catch((e)=>{
				AlertIOS.alert(e.message);
				dispatch({'type': TYPES_LOGGED_ERROR, error: e});
			});
	}
}


// skip login
export function skipLogin(){
	return {
		'type': TYPES_LOGGED_IN,
		'user': skipUser,
	}
}


// logout
export function logOut(){
	return {
		'type': TYPES_LOGGED_OUT
	}
}



// reducer/user.js
'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	isLoggedIn: false,
	user: {},
	status: null,
};

export default function user(state=initialState, action){

	switch(action.type){
		case TYPES.LOGGED_DONING:
			return {
				...state,
				status: 'doing'
			};
		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case TYPES_LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};

		case TYPES_LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			}

		default: 
			return state;
	}
}

//reducers/index.js
import { combinReducers } from 'redux';
import userReducer from './user';

export default combineReducers({
	userStore: userReducer,
})



// 实例store
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from '../reducers';

const logger = store => next => action => {
	if (typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return results;
}


let middlewares = [
	logger,
	thunk
];

let createAppStore = applyMiddleware(.../middlewares)(createStore);

export default function configureStore(onComplete: ()=>void){
	const store = autoRehydrate()(createAppStore)(reducers);
	let opt = {
		storage: AsyncStorage,
		transform: [],
	};
	persistStore(store, opt, onComplete);
	return store;
}

// 程序入口index.js
'use strict';

import React, { Component } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/index';

let store = configureStore();

import Root from './root';

export default class App extends Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
			store: configureStore(()=>{this.setState({isLoading: false})})
		}
	}
	render(){
		if (this.state.isLoading) {
			console.log('loading app');
			return null;
		}
		return (
			<Provider store={this.state.store}>
				<Root />
			</Provider> /
		)
	}
}



// root.js

import React, { Component, Navigator }  from 'react-native';
import { connect } from 'react-redux';
import Router from './configs/router';
import { skipLogin, asyncSkipLogin } from './actions/user';

import LoginPage from './pages/login';
import MainPage from './pages/main';

let initialRoute = {
	name: 'login-page',
	page: LoginPage,
}

class Root extends Component {
	constructor(props){
		super(props);
		if (props.isLoggedIn) {
			initialRoute = {
				name: 'main-page',
				page: MainPage
			}
		}
	}

	renderScene({page, name, id, index, props}, navigator){
		this.router = this.router || new Router(navigator);
		if (page) {
			return React.createElement(page, {
				...props,
				ref: view => this[index] = view,
				router: this.router,
				name,
				route: {
					name, id, index
				}
			})
		}
	}

	configureScene(route){
		if (route.sceneConfig) {
			return route.sceneConfig;
		}
		return Navigator.SceneConfigs.FloatFromRight;
	}

	render(){
		return (<Navigator
			ref={view => this.navigator=view}
			initiaRoute={initialRoute}
			configureScene={this.configureScene.bind(this)}
			renderScene={this.renderScene.bind(this)}
			/>); /
	}
}


function select(store){
	return {
		isLoggedIn: store.userStore.isLoggedIn
	}
}

export default connect(select)(Root);


// 程序入口 index.js

'use strict';

import React, { Component } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/index';

let store = configureStore();

import Root from './root';

export default class App extends Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
			store: configureStore(()=>{this.setState({isLoading: false})})
		}
	}
	render(){
		if (this.state.isLoading) {
			console.log('loading app');
			return null;
		}
		reuturn (
			<Provider store={this.state.store}>
				<Root />
			</Provider> /
		)
	}
}





// pages/login.js


'use strict';
import React, {
	Component,
	Text,
	View,
	Platform,
	TextInput,
	Image,
	AlertIOS,
} from 'react-native';

import {connect} from 'react-redux';

import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import {logIn, skipLogin} from '../actions/user';

import commonStyle from '../styles/common';
import loginStyle from '../styles/login';

class LoginPage extends Commponent{
	constructor(props){
		super(props);
		this.state = {
			username: 'sup1',
			password: '123456',
			btnFlag: true,
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if (nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true) {
			thi.refs.modal.close();
			this.toMain();
			return false;
		}
		if (nextProps.status == 'doing') {
			this.refs.modal.open();
			return false;
		}
		if (nextProps.status == 'error' || nextProps.status == 'done') {
			this.refs.modal.close();
			return false;
		}
		return true;
	}

	toMain(){
		const {router} = this.props;
		router.toMain();
	}
	handleLogin(){
		if (!this.state.username || !this.state.password) {
			AlertIOS.alert(
				'username, password?'
			);
			return;
		}
		let opt = {
			'name': this.state.username,
			'password': this.state.password,
		};
		this.props.dispathc(logIn(opt));
	}
	handleRegister(){
		const {dispatch} = this.props;
		dispatch(skipLogin());
	}
	onChangeName(text){
		this.setState({'username': text});
	}
	onChangePswd(text){
		this.setState({'password': text});
	}

	render(){
		return (
			<View>
				<Image>
					<View>
						<View>
							<View>
								<Text></Text>
								<Text></Text>
							</View>
							<View>
								<View>
									<Image></Image>
									<TextInput></TextInput>
								</View>
								<View>
									<View>
										<View>
											<Image></Image>
										</View>
										<View>
											<Text></Text>
										</View>
									</View>
								</View>
							</View>
							<View>
								<View>
									<Text></Text>
								</View>
								<View>
									<Text></Text>
								</View>
							</View>
						</View>
					</View>
				</Image>

				<ModalBox>
					<Spinner></Spinner>
				</ModalBox>

			</View>
		);
	}
}

function select(store){
	return {
		isLoginIn: store.userStore.isLoggedIn,
		user: store.userStore.user,
		status: store.userStore.status,
	}
}












