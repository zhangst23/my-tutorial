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


















