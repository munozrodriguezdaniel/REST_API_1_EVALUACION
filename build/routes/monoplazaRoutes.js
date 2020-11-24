"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monoplazaRoutes = void 0;
const express_1 = require("express");
const monoplaza_1 = require("../models/monoplaza");
const database_1 = require("../database/database");
class MonoplazaRoutes {
    constructor() {
        this.listarMonoplazas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield monoplaza_1.Monoplazas.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.crearMonoplaza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo, combustible, neumatico, n_vueltas, pitstop, modo_carrera, p_carga, fecha_ult_mod, vuelta_actual } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _modelo: modelo,
                _combustible: parseInt(combustible),
                _neumatico: neumatico,
                _n_vueltas: parseInt(n_vueltas),
                _pitstop: pitstop,
                _modo_carrera: parseInt(modo_carrera),
                _p_carga: parseInt(p_carga),
                _fecha_ult_mod: new Date(fecha_ult_mod),
                _vuelta_actual: parseInt(vuelta_actual)
            };
            const oSchema = new monoplaza_1.Monoplazas(dSchema);
            yield oSchema.save()
                .then((doc) => {
                res.json(doc);
            })
                .catch((err) => {
                res.send('Error: ' + err);
            });
            yield database_1.db.desconectarBD();
        });
        this.infGeneral = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo1 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOne({
                _modelo: modelo1
            }, (error, datos) => {
                if (error)
                    res.json(error);
                else {
                    if (datos == null)
                        res.json('No hay existe ese modelo');
                    else {
                        let m2 = new monoplaza_1.Monoplaza(datos._modelo, datos._combustible, datos._neumatico, datos._n_vueltas, datos._pitstop, datos._modo_carrera, datos._p_carga, datos._fecha_ult_mod, datos._vuelta_actual);
                        res.json(m2.mostrarMonoplaza());
                    }
                }
            });
            yield database_1.db.desconectarBD();
        });
        this.modNeumaticos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { neumatico, n_vueltas, fecha_ult_mod, vuelta_actual } = req.body;
            const { modelo2 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOneAndUpdate({
                _modelo: modelo2
            }, {
                _modelo: modelo2,
                _neumatico: neumatico,
                _n_vueltas: parseInt(n_vueltas),
                _fecha_ult_mod: new Date(fecha_ult_mod),
                _vuelta_actual: parseInt(vuelta_actual)
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    res.json({ "Error": "No existe: " + modelo2 });
                }
                else {
                    res.json(docu);
                }
            })
                .catch((err) => {
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this.modCarga = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { p_carga, fecha_ult_mod, vuelta_actual } = req.body;
            const { modelo2 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOneAndUpdate({
                _modelo: modelo2
            }, {
                _modelo: modelo2,
                _p_carga: parseInt(p_carga),
                _fecha_ult_mod: new Date(fecha_ult_mod),
                _vuelta_actual: parseInt(vuelta_actual)
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    res.json({ "Error": "No existe: " + modelo2 });
                }
                else {
                    res.json(docu);
                }
            })
                .catch((err) => {
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this.modModoCarrera = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modo_carrera, fecha_ult_mod, vuelta_actual } = req.body;
            const { modelo2 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOneAndUpdate({
                _modelo: modelo2
            }, {
                _modelo: modelo2,
                _modo_carrera: parseInt(modo_carrera),
                _fecha_ult_mod: new Date(fecha_ult_mod),
                _vuelta_actual: parseInt(vuelta_actual)
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    res.json({ "Error": "No existe: " + modelo2 });
                }
                else {
                    res.json(docu);
                }
            })
                .catch((err) => {
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this.infCombustible = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo1 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOne({
                _modelo: modelo1
            }, (error, datos) => {
                if (error)
                    res.json(error);
                else {
                    if (datos == null)
                        res.json('No hay existe ese modelo');
                    else {
                        let m2 = new monoplaza_1.Monoplaza(datos._modelo, datos._combustible, datos._neumatico, datos._n_vueltas, datos._pitstop, datos._modo_carrera, datos._p_carga, datos._fecha_ult_mod, datos._vuelta_actual);
                        res.json(m2.mostrarCombustible());
                    }
                }
            });
            yield database_1.db.desconectarBD();
        });
        this.infNeumatico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo1 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOne({
                _modelo: modelo1
            }, (error, datos) => {
                if (error)
                    res.json(error);
                else {
                    if (datos == null)
                        res.json('No hay existe ese modelo');
                    else {
                        let m2 = new monoplaza_1.Monoplaza(datos._modelo, datos._combustible, datos._neumatico, datos._n_vueltas, datos._pitstop, datos._modo_carrera, datos._p_carga, datos._fecha_ult_mod, datos._vuelta_actual);
                        res.json(m2.mostrarNeumaticos());
                    }
                }
            });
            yield database_1.db.desconectarBD();
        });
        this.infCAerodinamica = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo1 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOne({
                _modelo: modelo1
            }, (error, datos) => {
                if (error)
                    res.json(error);
                else {
                    if (datos == null)
                        res.json('No hay existe ese modelo');
                    else {
                        let m2 = new monoplaza_1.Monoplaza(datos._modelo, datos._combustible, datos._neumatico, datos._n_vueltas, datos._pitstop, datos._modo_carrera, datos._p_carga, datos._fecha_ult_mod, datos._vuelta_actual);
                        res.json(m2.mostrarCAerodinamica());
                    }
                }
            });
            yield database_1.db.desconectarBD();
        });
        this.infUltimaMod = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo1 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOne({
                _modelo: modelo1
            }, (error, datos) => {
                if (error)
                    res.json(error);
                else {
                    if (datos == null)
                        res.json('No hay existe ese modelo');
                    else {
                        let m2 = new monoplaza_1.Monoplaza(datos._modelo, datos._combustible, datos._neumatico, datos._n_vueltas, datos._pitstop, datos._modo_carrera, datos._p_carga, datos._fecha_ult_mod, datos._vuelta_actual);
                        res.json(m2.mostrarFechaMod());
                    }
                }
            });
            yield database_1.db.desconectarBD();
        });
        this.borrarMonoplaza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo1 } = req.params;
            yield database_1.db.conectarBD();
            yield monoplaza_1.Monoplazas.findOneAndDelete({ _modelo: modelo1 }, (err, doc) => {
                if (err)
                    res.json(err);
                else {
                    if (doc == null)
                        res.json(`No encontrado` + modelo1);
                    else
                        res.json('Borrado correcto: ' + doc);
                }
            });
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.listarMonoplazas);
        this._router.post('/crearMonoplaza', this.crearMonoplaza);
        this._router.get('/infGeneral/:modelo1', this.infGeneral);
        this._router.post('/modNeumaticos/:modelo2', this.modNeumaticos);
        this._router.post('/modCarga/:modelo2', this.modCarga);
        this._router.post('/modModoCarrera/:modelo2', this.modModoCarrera);
        this._router.get('/infCombustible/:modelo1', this.infCombustible);
        this._router.get('/infNeumatico/:modelo1', this.infNeumatico);
        this._router.get('/infCAerodinamica/:modelo1', this.infCAerodinamica);
        this._router.get('/infUltimaMod/:modelo1', this.infUltimaMod);
        this._router.get('/borrarMonoplaza/:modelo1', this.borrarMonoplaza);
    }
}
const obj = new MonoplazaRoutes();
obj.misRutas();
exports.monoplazaRoutes = obj.router;
