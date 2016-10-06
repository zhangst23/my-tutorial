// Useful helper functions.js
// The following function is an Object comparison function. Usage: check if state or props have change in shouldComponentUpdate
export const isObjectEqual = (obj1, obj2) => {
    if(!isObject(obj1) || !isObject(obj2)) {
        return false;
    }

    if (obj1 === obj2) {
       return true;
    }

   const item1Keys = Object.keys(obj1).sort();
   const item2Keys = Object.keys(obj2).sort();

   if (!isArrayEqual(item1Keys, item2Keys)) {
        return false;
   }
   return item2Keys.every(key => {
       const value = obj1[key];
       const nextValue = obj2[key];

       if (value === nextValue) {
           return true;
       }
       return Array.isArray(value) &&
           Array.isArray(nextValue) &&
           isArrayEqual(value, nextValue);
   });
};

// Create reducer dynamically

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

// Usage:

import {createReducer} from '../../utils';
// Add the following for IE compatability
Object.assign = Object.assign || require('object-assign'); 

const initialState = {
   'count': 0,
   'receiving': false,
   'pages': 0,
   'documents': []
};

export default createReducer(initialState, {
    ['RECEIVED_DOCUMENTS']: (state, payload) => {
        return {
            'count': payload.count,
            'pages': payload.pages,
            'documents': payload.documents,
            'receiving': false
        };
    },
    ['RETRIVING_DOCUMENTS']: (state, payload) => {
        return Object.assign({}, state, {
            'receiving': true
        });
    }
});


// Create constants:
export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}



// Render if:

'use strict';
const isFunction = input => typeof input === 'function';
export default predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;



// Usage: render component if somethingTrue

import renderIf from '../utils/renderif'

export default class RenderIfExample extends Component {

render() {
  var isTrue = true;
    return (
      <div>
        {renderIf(isTrue)(
          <h1>I am being rendered</h1>
        )} 
      </div> /
    );
  }

}



// Change state value dynamically:

export default class SetValueExample extends React.Component {
	constructor() {
		super();
		this.state = {
			myName: '',
		};
	}
	
  	setValue(field, event) {
		var object = {};
		object[field] = event.target.value;
		this.setState(object);
	}
	
	render(){
		return(
			<input value={this.state.myName} onChange={this.setValue.bind(this, 'myName')} />
		);
	}
	
}



