import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import loginReducer from './loginReducer';


export default combineReducers({
	todo: todoReducer,
	login: loginReducer
});