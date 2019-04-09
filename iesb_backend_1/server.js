const express = require('express')
const app = express()
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let todos = []
let idTodo = 0;

app.get('/todos', (req, res) => {
    res.status(200).send(todos)
});

app.get('/todo/:byId', (req, res) => {
    const todo = todos.find(user => user.id == req.params.byId);
    todo ?
        res.status(200).send(todo) : res.status(403).send(`Todo com o Id:${req.params.byId} não foi encontrado`);
});

app.post('/todo', (req, res) => {
    const { nome, apelido, idade, todo } = req.body
    nome && idade ?
        idade < 18 ?
            res.status(401).send(`O Todo ${nome} não possui idade correta para se cadastrar`) : (todos.push({ id: idTodo++, nome, apelido, idade, todo }),
                res.status(201).send(`O Todo ${nome} foi criado com sucesso`)) : res.status(403).send(`Nome e Idade não podem ser nulos`);
});

app.put('/todo/:byId', (req, res) => {
    const inicialUser = todos;
    let { body } = req;
    todos = todos.map(user => user.id == req.params.byId ? { id: user.id, ...body } : user);

    inicialUser != todos ?
        (todo = { ...body },
            res.status(200).send(`Todo do id: ${req.params.byId} para o nome: ${body.nome}`)) : res.status(403).send(`Todo com o Id:${req.params.byId} não foi encontrado`);
});


app.delete('/todo/:byId', (req, res) => {
    const inicialUser = todos.length;
    todos = todos.filter(user => user.id != req.params.byId);

    inicialUser != todos.length ?
        res.status(200).send('Todo removido com sucesso') : res.status(404).send(`Todo com o Id:${req.params.byId} não foi encontrado`);
});


app.listen(3000, () => console.log('Back-end na porta 3002'));