import { LOGIN } from '../actions';


export default function loginReducer(state = null, action) {
	switch (action.type) {
		case LOGIN:
			
			return action.login;
		default:
			return state;
	}
}