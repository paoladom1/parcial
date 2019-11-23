var Enfermedad = require("../models/enfermedad");
var debug = require("debug")("parcialFinal: enfermedad_controller");

module.exports.getOne = (req, res, next) => {
    debug("Search Enfermedad", req.params);
    Enfermedad.findOne({
        nombre: req.params.nombre
    })
        .then(enfermedad => {
            if (enfermedad) return res.status(200).json(enfermedad);
            else return res.status(400).json(null);
        })
        .catch(err => {
            next(err);
        });
};

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 5,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("List", { size: perPage, page, sortby: sortProperty, sort });

    Enfermedad.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort })
        .then(enfermedades => {
            return res.status(200).json(enfermedades);
        })
        .catch(err => {
            next(err);
        });
};

module.exports.createEnfermedad = (req, res, next) => {
    debug("Nueva Enfermedad", { body: req.body });

    Enfermedad.findOne({
        name: req.body.nombre
    })
        .then(enfermedadEncontrada => {
            if (enfermedadEncontrada) {
                debug("Enfermedad duplicada");
                throw new Error(`Enfermedad duplicada ${req.body.nombre}`);
            } else {
                let newEnfermedad = new Enfermedad({
                    nombre: req.body.nombre,
                    sintomas: req.body.sintomas,
                    esMortal: req.body.esMortal,
                    causas: req.body.causas
                });
                return newEnfermedad.save();
            }
        })
        .then(enfermedad => {
            return res
                .header("Location", "/enfermedad/", +enfermedad.nombre)
                .status(201)
                .json({
                    enfermedad: enfermedad.nombre
                });
        })
        .catch(err => {
            next(err);
        });
};

module.exports.update = (req, res, next) => {
    debug("Update enfermedad", {
        enfermedad: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Enfermedad.findOneAndUpdate(
        {
            nombre: req.params.nombre
        },
        update,
        {
            new: true
        }
    )
        .then(updated => {
            if (updated) return res.status(200).json(updated);
            else return res.status(400).json(null);
        })
        .catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {
    debug("Delete enfermedad", {
        nombre: req.params.nombre
    });

    Enfermedad.findOneAndDelete({ nombre: req.params.nombre })
        .then(data => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        })
        .catch(err => {
            next(err);
        });
};