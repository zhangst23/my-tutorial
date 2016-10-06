// Reducers and the Store

// As we discussed before, reducers are simply functions responsible for transforming and returning the store of our application. Of course, we don't yet have a store set up, let alone any actions to send data to our reducers. So, for now, we're going to return dummy data like we initially did with state in part one.

// For now, let's have our GifsReducer simply return a hard-coded list of gifs:
import { REQUEST_GIFS } from '../actions';

const initialState = {
	data: []
};

export default function gifs(state = initialState, action){
	switch (action.type){
		case REQUEST_GIFS:
			return {
				...state, data: action.payload.body.data
			};
		default:
			return state;

	}
}





















