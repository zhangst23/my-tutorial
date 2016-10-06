// 官方redux教程.js


// Tutorial 03 - simple-reducer.js
import { createStore } from 'redux'

var store_0 = createStore(() => {})

//
var reducer = function(...args){
	console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)




// Tutorial 04 - get-state.js
// How do we retrieve the state from our Redux instance?
import { createStore } from 'redux'

var reducer_0 = function(state, action){
	console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)

console.log('store_0 state after initialization:', store_0.getState())

var reducer_1 = function(state, action){
	console.log('reducer_1 was called with state', state, 'and action', action)
	if (typeof state === 'underfined') {
		return {}
	}
	return state;
}

var store_1 = createStore(reducer_1)

console.log('store_1 state after initialization:', store_1.getState())



// Tutorial 05 - combine-reducers.js


// Tutorial 06 - dispatch-action.js


// Tutorial 07 - dispatch-async-action-1.js


// Tutorial 08 - dispatch-async-action-2.js


// Tutorial 09 - middleware.js


// Tutorial 10 - state-subscriber.js


// Tutorial 11 - Provider-and-connect.js







