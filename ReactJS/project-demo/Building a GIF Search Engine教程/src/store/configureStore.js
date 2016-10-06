import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState){
	const store = createStore(
		rootReducer,
		initialState,
		compose (
			// applyMiddleware(ReduxPromise),
			applyMiddleware(reduxThunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}




// Here, we're using Redux's createStore function to—you guessed it—create our store. Notice that we're passing in the rootReducer we created before so that we can update the state tree of our application.

// We are also adding some code to allow the Redux Dev Tools Chrome extension to access our store. If you chose not to install this extension, having this extra code won't hurt anything, but feel free to remove that line.

// Finally, there's some boilerplate code to make Webpack's hot module replacement play nice with reducers, but you don't have to worry too much about that right now.









