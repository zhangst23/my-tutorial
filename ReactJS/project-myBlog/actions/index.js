import reqwest from 'reqwest'
//pagination
export const LIMIT = 5;
export const SET_MAX_PAGE = 'SET_MAX_PAGE';
export const SET_CUR_PAGE = 'SET_CUR_PAGE';
export const setMaxPage = (maxPage) => {
	return {
		type:SET_MAX_PAGE,
		maxPage
	}
};