import { SET_ARTICLE_LIST } from '../actions'
export default function articleList(state=[],action){
	switch(action.type){
		case SET_ARTICLE_LIST:{
			return action.article;
		}
		default:{
			return state;
		}
	}
}