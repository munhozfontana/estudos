
export const GET_TODO = 'GET_TODO';
export const getTodo = todo => ({
	type: GET_TODO,
	todo
});

export const LIST_ALL_TODO = 'LIST_ALL_TODO';
export const listarAllTodo = todo => ({
	type: LIST_ALL_TODO,
	todo
});

export const INSERT_TODO= 'INSERT_TODO';
export const insertTodo = todo => ({
	type: INSERT_TODO,
	todo
});

export const UPDATE_TODO= 'UPDATE_TODO';
export const updateTodo = todo => ({
	type: UPDATE_TODO,
	todo
});

export const DELETE_TODO= 'DELETE_TODO';
export const deleteTodo = todo => ({
	type: DELETE_TODO,
	todo
});
