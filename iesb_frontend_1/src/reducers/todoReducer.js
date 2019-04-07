import { LIST_ALL_TODO } from '../actions';

export default function todoReducer(state = null, action) {
	switch (action.type) {
		case LIST_ALL_TODO:
			return action.todo;
		default:
			return state;
	}
}