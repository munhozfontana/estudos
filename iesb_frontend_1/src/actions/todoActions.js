import axios from 'axios';
import utils from '../utils/utils';

const url = 'localhost:3000'


// LISTAR all ---->>>
export const LOGIN = 'LOGIN';
export const loginTodo = login => ({
	type: LOGIN,
	login
});

export const tryLoginTodo = login => dispatch => {
	let config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
	  
	
	return axios.post(``, login, config)
		.then(response => {;
			loginTodo(dispatch(loginTodo( response.data )));
			return response.data;
		}).catch(error => {
			console.log('Login error',error);
			return error;
		});
}

// LISTAR all ----<<<



export const GET_TODO = 'GET_TODO';
export const getTodo = todo => ({
	type: GET_TODO,
	todo
});

// LISTAR all ---->>>
export const LIST_ALL_TODO = 'LIST_ALL_TODO';
export const listarAllTodo = todo => ({
	type: LIST_ALL_TODO,
	todo
});

export const tryListAllTodo = () => dispatch => {
	return axios.get(`${utils.url}/todos`)
		.then(response => {
			listarAllTodo(dispatch(listarAllTodo(response)));
			return response.data;
		}).catch(error => {
			return error;
		});
}

// LISTAR all ----<<<

// INSERT ---->>>
export const INSERT_TODO = 'INSERT_TODO';
export const insertTodo = todo => ({
	type: INSERT_TODO,
	todo
});


export const tryInsertTodo = props => dispatch => {
	return axios.post(`${utils.url}/todo`, props)
		.then(response => {
			insertTodo(dispatch(insertTodo({ response, props })));
			return response.data;
		}).catch(error => {
			return error;
		});
}
// INSERT ----<<<
export const UPDATE_TODO = 'UPDATE_TODO';
export const updateTodo = todo => ({
	type: UPDATE_TODO,
	todo
});


// DELETE ---->>>
export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = todo => ({
	type: DELETE_TODO,
	todo
});

export const tryDeleteTodo = id => dispatch => {
	console.log(`${utils.url}/todo/${id}`);

	return axios.delete(`${utils.url}/todo/${id}`)
		.then(response => {
			deleteTodo(dispatch(deleteTodo(response)));
			return response.data;
		}).catch(error => {
			return error;
		});
}
// DELETE ----<<<
