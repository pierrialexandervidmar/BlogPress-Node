// Importa o módulo Express
const express = require('express');
// Cria uma instância do Express
const app = express();
// Importa o módulo Body Parser para processar dados da requisição
const bodyParser = require('body-parser');
// Importa a conexão com o banco de dados
const connection = require('./database/database');

// Importa os controllers para lidar com rotas relacionadas a categorias e artigos
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

// Importa os modelos de Artigo e Categoria
const Article = require('./articles/Article');
const Category = require('./categories/Category');

// View Engine
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Middleware para interpretar dados da requisição no formato JSON e URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco feita com sucesso!')
    })
    .catch((error) => {
        console.log('Erro de conexão com o banco de dados!')
    })

// Usa as rotas definidas nos controllers para lidar com requisições relacionadas a categorias e artigos
app.use('/', categoriesController);
app.use('/', articlesController);

// Rota para o índice (página inicial)
app.get('/', (req, res) => {
    // Renderiza a view 'index'
    res.render('index');
})

app.listen(8080, () => {
    console.log('Servidor Rodando na porta 8080')
})