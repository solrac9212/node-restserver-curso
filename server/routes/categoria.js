const express = require('express');
const _ = require('underscore');

let { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

let app = express();
let Categoria = require('../models/categoria');


//mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({}, 'descripcion usuario')
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias

            });


        });
});


//mostrar una categoria por id

app.get('/categoria/:id', verificaToken, (req, res) => {
    // Categoria.findById(....);

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});


//crear nueva categoria

app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria


    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario.id
    });

    categoria.save((err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriadb
        });
    });
});

app.put('/categoria/:id', (req, res) => {
    //actualizar nombre de la categoria

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriadb
        });
    });
});


app.delete('/categoria/:id', [verificaToken, verificaAdminRol], (req, res) => {

    // solo un administrador puede borrar categorias

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id  no encontrado'
                }
            });
        };
        res.json({
            ok: true,
            message: 'categoria borrada'

        });
    });
});
module.exports = app;