const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let usuarios = []
let idUsuario = 0;

app.get('/usuarios', (req, res) => {
    res.status(200).send(usuarios)
});

app.get('/usuario/:byId', (req, res) => {
    const usuario = usuarios.find(user => user.id == req.params.byId);
    usuario ?
        res.status(200).send(usuario) : res.status(403).send(`Usuario com o Id:${req.params.byId} não foi encontrado`);
});

app.post('/usuario', (req, res) => {
    const { nome, sobrenome, idade } = req.body
    nome && idade ?
        idade < 18 ?
            res.status(401).send(`O usuário ${nome} não possui idade correta para se cadastrar`) : (usuarios.push({ id: idUsuario++, nome, sobrenome, idade }),
                res.status(201).send(`O usuário ${nome} foi criado com sucesso`)) : res.status(403).send(`Nome e Idade não podem ser nulos`);
});

app.put('/usuario/:byId', (req, res) => {
    const inicialUser = usuarios;
    let { body } = req;
    usuarios = usuarios.map(user => user.id == req.params.byId ? { id: user.id, ...body } : user);

    inicialUser != usuarios ?
        (usuario = { ...body },
            res.status(200).send(`Usuário do id: ${req.params.byId} para o nome: ${body.nome}`)) : res.status(403).send(`Usuario com o Id:${req.params.byId} não foi encontrado`);
});


app.delete('/usuario/:byId', (req, res) => {
    const inicialUser = usuarios.length;
    usuarios = usuarios.filter(user => user.id != req.params.byId);

    inicialUser != usuarios.length ?
        res.status(200).send('Usuario removido com sucesso') : res.status(404).send(`Usuario com o Id:${req.params.byId} não foi encontrado`);
});


app.listen(3000, () => console.log('Back-end na porta 3000'));