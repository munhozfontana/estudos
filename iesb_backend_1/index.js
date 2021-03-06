const express = require('express')
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const porta = 3000
let tempoDeLogin = null;
const palavraChave = `I'am a heppy developer`
let todos = []
let todoModel = {
    "id": null,
    "name": null,
    "review": null,
    "latitude": null,
    "longitude": null,
    "thumbnail": null,
};

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


gerarJWT = (usuario) => {
    return jwt.sign({
        usuario
    }, palavraChave, { expiresIn: 60 });
}

verificarTokenJWT = (req, res, next) => {
    console.log(`ip`, req.ip);
    console.log(`hostname`, req.hostname);

    const { headers, url } = req;
    if (url == `todo/login`) {
        return next();
    }

    var token = headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Token não encontrado' })

    try {
        var jwtDecodificado = jwt.verify(token, palavraChave);

        tempoDeLogin = ((new Date().getTime() + 1) / 1000 - jwtDecodificado.exp) * -1
        next();
    } catch (error) {
        res.status(500).send({ auth: false, message: 'Token inválido' })
    }
}

app.use(verificarTokenJWT);

app.post('todo/login', ({ body }, res) => {
    let usuarioEncontrado = usuarios.find(usuario => body.login == usuario.login && body.senha == usuario.senha);

    usuarioEncontrado ?
        res.status(200).send({ token: gerarJWT(usuarioEncontrado), auth: true }) :
        res.status(401).send({ message: "login ou senha estão incorretos" })
})

app.get('/todos', (req, res) => {
    res.status(200).send({ todos, tempoDeLogin })
});

app.get('/todo/:byId', (req, res) => {
    const todo = todos.find(user => user.id == req.params.byId);
    todo ?
        res.status(200).send(todo) : res.status(403).send(`Todo com o Id:${req.params.byId} não foi encontrado`);
});


app.post('/todo', (req, res) => {
    const { name, id } = req.body
    idImage = uuid()

    var novo = !!todos.find(todo => todo.id == id)

    if (novo) {
        res.status(401).send({ message: `Essa opinião já foi enviada` })
        return
    }

    todos.push({ ...req.body, idImage })
    res.status(201).send({ message: `O Todo ${name} foi criado com sucesso`, id })
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
