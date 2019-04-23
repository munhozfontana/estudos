const AWS = require('./AWSProvider');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB();


const init = (callback) => {
    dynamoDB.listTables({}, (err, data) => {
        if (err) {
            callback(err, null);
        } else {


            if (data.TableNames.indexOf('Todo') == -1) {
                dynamoDB.createTable({
                    TableName: 'Todo',
                    AttributeDefinitions: [
                        { AttributeName: 'id', AttributeType: 'S' },
                    ],
                    KeySchema: [
                        { AttributeName: 'id', KeyType: 'HASH' },
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    },
                }, (err, data) => {
                    callback(err, data);
                })
            } else {
                callback(err, { message: 'ok' });
            }

            var params = {

                Limit: 5, // optional (to further limit the number of table names returned per page)
            };
            dynamoDB.listTables(params, function (err, data) {
                if (err) console.log(err) // an error occurred
                else console.log(data);

            });
        }
    });
}


const insert = async (todo, callback) => {
    const { titulo, apelido, idade, descricao } = todo
    const id = todo.id || uuid();

    await
        dynamoDB.putItem({
            TableName: 'Todo',
            Item: {
                "id": { S: id },
                "titulo": { S: todo.titulo },
                "apelido": { S: todo.apelido },
                "idade": { N: `${todo.idade}` },
                "descricao": { S: todo.descricao }
            }
        },
            (err, data) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, {
                        id,
                        titulo: titulo,
                        descricao: descricao,
                        idade: idade,
                        apelido: apelido
                    })
                }
            });
}

const listAll = (callback) => {
    dynamoDB.scan({ TableName: 'Todo' }, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            const list = [];
            data.Items.forEach(item => {
                const todo = {
                    id: item.id.S,
                    titulo: item.titulo.S,
                    descricao: item.descricao.S,
                    idade: item.idade.N,
                    apelido: item.apelido.S,
                }
                list.push(todo);
            });
            
            callback(null, list);
        }
    });
}

const findTodoById = (id, callback) => {
    dynamoDB.getItem({
        TableName: 'Todos',
        Key: {
            "id": { S: id }
        }
    }, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            const item = data.Item;
            var todo = null;
            if (item) {
                todo = {
                    id: item.id.S,
                    title: item.title.S,
                    description: item.description.S,
                    isPriority: item.isPriority.BOOL,
                    isDone: item.isDone.BOOL,
                }
            }
            callback(null, todo)
        }
    });
}


const remove = (id, callback) => {
    dynamoDB.deleteItem({
        TableName: 'Todos',
        Key: {
            "id": { S: id }
        }
    }, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, {
                message: 'deleted'
            });
        }
    })
}

module.exports = { insert, listAll, findTodoById, remove, init }