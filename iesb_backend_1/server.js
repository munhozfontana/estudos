const express = require('express')
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const porta = 3000
const tempoDeLogin = null;
const palavraChave = `I'am a heppy developer`
let todos = []
let usuarios = [
    {
        login: 'usuario',
        senha: 'usuario'
    },
    {
        login: 'usuario1',
        senha: 'usuario1'
    }
]


let idTodo = 0;

gerarJWT = (usuario) => {
    return jwt.sign({
        usuario
    }, palavraChave, { expiresIn: 60 });
}

checkUser = (req, res, next) => {
    const { headers, url } = req;
    var token = headers['x-access-token'];
    if (url == `/login`) {
        next();
    } else {
        if (!token) return res.status(401).send({ auth: false, message: 'Token não encontrado' })
        jwt.verify(token, palavraChave, function (err, decoded) {
            if (decoded) {
                this.tempoDeLogin =  ((new Date().getTime() + 1) / 1000 - decoded.exp) * -1 
                console.log(`req 1`);
            }


        });
        next();
    }
}

app.use(checkUser);

app.post('/login', ({ body }, res) => {
    let usuarioEncontrado = usuarios.find(usuario => body.login == usuario.login && body.senha == usuario.senha);
    let userJWT = gerarJWT(usuarioEncontrado);

    usuarioEncontrado ?
        res.status(200).send({ token: gerarJWT(usuarioEncontrado), auth: true }) :
        res.status(401).send("login ou senha estão incorretos")
})

app.get('/todos', (req, res) => {
    console.log(`req 2`);
    
    res.status(200).send({todos, teste : this.tempoDeLogin})
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
})


app.listen(porta, () => console.log(`Back-end na porta ${porta}`)); 
