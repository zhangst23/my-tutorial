// Forms and Validation

// Step 15 commit on GitHub

// In order to get authentication working, we're going to need two different forms: one to allow a new user to sign up and one to allow an existing user to login.

// Luckily, there's a package called redux-form that handles most of the heavy lifting for us!

// To install it, run $ npm install --save redux-form in your terminal.

// Setting up redux-form is rather simple. The first thing we need to do is to add the package's built-in reducer to our rootReducer (including it alongside the two reducers we already have for gifs and modals):


import { combineReducers } from 'redux';
import GifsReducer from './gifs';
import ModalReducer from './modal';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: FormReducer,
	gifs: GifsReducer,
	modal: ModalReducer
});

export default rootReducer;


















