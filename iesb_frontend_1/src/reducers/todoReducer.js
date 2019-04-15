import { LIST_ALL_TODO, INSERT_TODO } from '../actions';


export default function todoReducer(state = null, action) {
	switch (action.type) {
		case LIST_ALL_TODO:
			
			return action.todo;
		case INSERT_TODO:
			
			return null;
		default:
			return state;
	}
}