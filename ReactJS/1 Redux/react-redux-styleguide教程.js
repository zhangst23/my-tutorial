// react-redux-styleguide教程.js

// 1.0 Action creators
// actions/something.js
export function doSomething(){
	return {
		type: 'DO_SOMETHING',
		payload: { foo: 'bar' },
		meta: { baz: 'qux' }
	};
}

// 2.0 Reducers
// useing redux-actions

// reduxers/something.js
import { HandleActions } from 'redex-actions';
import { Todo } from '../constants/actionTypes';

const initialState = {};

export default handleActions({
	[Todo.add]:addTodo
}, initialState);

export function addTodo(state, action){
	return { ...state, todo: action.payload.todo };
}

##########

//  通过combineReducers将多个reducer合并成一个rootReducer

// 创建两个 reducer: count year
function count (state, action){
	state = state | {count: 1}
	switch (action.type){
		default:
			return state;
	}
}

function year (state, action){
	state = state || {year: 2015}
	switch (action.type){
		default:
			return state;
	}
}

// 将多个reducer合并成一个
var combineReducers = require('./').combineReducers;
var rootReducer = combineReducers({
	count: count,
	year: year,
});

// 创建store
var createStore = require('./').createStore;
var store = createStore(rootReducer);

var util = require('util');
console.log(util.inspect(store));














