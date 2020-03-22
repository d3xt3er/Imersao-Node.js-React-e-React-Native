const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Usuarios');
const Usuarios = mongoose.model('usuarios');

require('./models/Sobre');
const Sobre = mongoose.model('sobre');

require('./models/Contatos');
const Contato = mongoose.model('contatos');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header("Acces-Control-Allow-Origin", 'GET, PUT, POST, DELETE');
    app.use(cors());
    next();
})

mongoose.connect('mongodb+srv://Paulo:34984c27@cluster0-6ha0s.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
 console.log('Conexão com MongoDB realizada com sucesso');
}).catch((erro) => {
 console.log('Erro: Conexão com MongoDB não realizado com sucesso' + erro);
})

app.get("/usuarios", (req, res) => {
    Usuarios.find({}).then((usuarios) => { 
        return res.json(usuarios);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "nenhum usuario encontrado!"
        })
    })
});

app.get("/usuarios/:id", (req, res) => {
    Usuarios.findOne({ _id: req.params.id }).then((usuario) => {
        return res.json(usuario);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuário encontrado"
        })
    })
})

app.post("/usuarios", (req, res) => {
    Usuarios.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: usuario não cadastrado"
        })

        return res.json({
            error: false,
            message: "Usuario cadastrado com sucesso"
        })
    })
})

app.put("/usuarios/:id", (req, res) => {
    Usuarios.updateOne({ _id: req.params.id }, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Usuario não editado com sucesso!"
        })

        return res.json({
            error: false,
            message: "Usuario editado com sucesso!"
        })
    })
})

app.delete("/usuarios/:id", (req, res) => {
    Usuarios.deleteOne({ _id:req.params.id }, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: usuario não apagado!"
        })

        return res.json({
            error: false,
            message: "Usuario apagado com sucesso!"
        })

    })
})

// CRUD SOBRE \\
app.get("/sobre", (req, res) => {
    Sobre.findOne({}).then((sobre) => {
        return res.json(sobre);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro sobre encontrado"
        })
    })
})

app.post("/sobre", (req, res) => {
    Sobre.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo da página sobre não cadastrado com sucesso!"
        })

        return res.json({
            error: false,
            message: "Conteúdo da página sobre cadastrado com sucesso!"
        })
    })
})

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});