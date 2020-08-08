// Servidor
const express = require('express')
const server = express()

const { pageLanding, pageSuccess, pageStudy, pageTeach, saveProffy } = require('./pages')

//Configurar nunjucks 
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

// Start e Config do Servidor
server
// Receber dados do body
.use(express.urlencoded({ extended: true }))
// Configuração de Arquivos Estáticos
.use(express.static("public"))
// Configuração de Rotas
.get("/", pageLanding)
.get("/success", pageSuccess)
.get("/study", pageStudy)
.get("/teach", pageTeach)
.post("/save-proffy", saveProffy)
.listen(5500)
