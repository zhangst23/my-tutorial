// Redux-YouTube-教程.js

import { createStore } from "redux";

const reducer = function(state, action){
	if (action.type === "INC") {
		return state+1;
	}
	if (action.type === "DEC") {
		return state+1;
	}
	return state;
}

const store = createStore(reducer, 0);

store.subscribe(() => {
	console.log("store changed", store.getState())
})

store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "DEC", payload: 1000})


// 修改后
import { combinReducers, createStore } from "redux";

const userReducer = (state={}, action) => {
	switch(action.type){
		case "CHANGE_NAME": {
			state = {...state, name: action.payload}
			break;
		}
		case "CHANGE_AGE": {
			state.age = {...state, age: action.payload}
			break;
		}
	}
	return state;
};


const tweetsReducer = (state=[], action) => {
	return state;
};

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetsReducer,
})

const store = createStore(reducers);

store.subscribe(() => {

})








































