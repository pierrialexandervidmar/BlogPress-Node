// Importa o módulo Express e cria um router para definir rotas
const express = require('express');
const router = express.Router();
// Importa o modelo de Categoria e a biblioteca Slugify para gerar slugs
const Category = require('./Category');
const Slugify = require('slugify');

// Rota para renderizar o formulário de criação de nova categoria
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

// Rota para salvar uma nova categoria
router.post('/categories/save', (req, res) => {
    // Obtém o título da categoria do corpo da requisição
    var title = req.body.title;
    // Verifica se o título foi informado
    if (title != undefined) {
        // Cria uma nova categoria no banco de dados
        Category.create({
            title: title,
            slug: Slugify(title) // Gera um slug a partir do título
        })
            .then(() => res.redirect('/admin/categories')); // Redireciona para a lista de categorias após a criação
    } else {
        // Se o título não foi informado, redireciona de volta para o formulário
        res.redirect('/admin/categories/new');
        alert('Nenhum título informado!');
    }
});

// Rota para a página principal de categorias no painel de administração
router.get('/admin/categories/', (req, res) => {
    // Busca todas as categorias no banco de dados
    Category.findAll().then(Categories => {
        // Renderiza a view 'admin/categories/index' com as categorias recuperadas
        res.render('admin/categories/index', {
            categories: Categories
        });
    });
});

// Rota para excluir uma categoria
router.post('/categories/delete', (req, res) => {
    // Obtém o ID da categoria a ser excluída do corpo da requisição
    var id = req.body.id;

    // Verifica se o ID foi informado e é um número
    if (id != undefined && !isNaN(id)) {
        // Exclui a categoria do banco de dados com base no ID fornecido
        Category.destroy({
            where: {
                id: id
            }
        })
            .then(() => res.redirect('/admin/categories')); // Redireciona para a lista de categorias após a exclusão
    } else {
        // Se o ID não foi informado ou não é um número, redireciona de volta para a lista de categorias
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render('admin/categories/edit', {
                category: category
            });
        } else {
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    })
})

// Exporta o router para ser utilizado em outros arquivos
module.exports = router;