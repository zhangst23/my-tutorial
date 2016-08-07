import * as types from './actionTypes';

export function usereadability(){
	return {
		type: types.useReadability
	};
}

export function dontUseReadability(){
	return {
		type: types.dontUsereadability
	};
}