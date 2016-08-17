// import lightStore from '../../stores/light'
// import {changeGreen, changeYellow, changeRed} from '../../actions/light'

// let store = lightStore();

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

// store.dispatch(changeGreen());
// store.dispatch(changeYellow());
// store.dispatch(changeRed());



import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import Light from './index'

var color = 'red';

render(
	<div id="traffic">
		<Light color={color}/>
	</div>,
	document.getElementById('demo')
)














