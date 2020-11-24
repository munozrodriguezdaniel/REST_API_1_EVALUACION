import {Request, Response, Router } from 'express'
import { Monoplaza, Monoplazas } from '../models/monoplaza'
import { db } from '../database/database'

class MonoplazaRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private listarMonoplazas = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            const query = await Monoplazas.find()
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        await db.desconectarBD()
    }

    private crearMonoplaza = async (req: Request, res: Response) => {
        const { modelo, combustible, neumatico, n_vueltas, pitstop, modo_carrera, p_carga, fecha_ult_mod, vuelta_actual } = req.body
        await db.conectarBD()
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
        }
        const oSchema = new Monoplazas(dSchema)
        await oSchema.save()
        .then( (doc) => {
            res.json(doc)
        })
        .catch( (err: any) => {
            res.send('Error: '+ err)
        })
        await db.desconectarBD()
    }

    private infGeneral = async (req: Request, res: Response) => {
        const { modelo1 } = req.params
        await db.conectarBD()
        await Monoplazas.findOne(
            {
                _modelo: modelo1 
            },
            (error:any, datos:any)=>{
                if (error) res.json(error)
                else {
                    if (datos==null) res.json('No hay existe ese modelo')
                    else {
                        let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                        res.json(m2.mostrarMonoplaza())
                    }
                }
            }
        )
        await db.desconectarBD()
    }

    private modNeumaticos = async (req: Request, res: Response) => {
        const { neumatico, n_vueltas, fecha_ult_mod, vuelta_actual } = req.body
        const { modelo2 } = req.params
        await db.conectarBD()
        await Monoplazas.findOneAndUpdate(
                {
                    _modelo: modelo2
                },
                {
                    _modelo: modelo2,
                    _neumatico: neumatico,
                    _n_vueltas: parseInt(n_vueltas),
                    _fecha_ult_mod: new Date(fecha_ult_mod),
                    _vuelta_actual: parseInt(vuelta_actual)
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        res.json({"Error":"No existe: "+modelo2})
                    } else {
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }    

    private modCarga = async (req: Request, res: Response) => {
        const { p_carga, fecha_ult_mod, vuelta_actual } = req.body
        const { modelo2 } = req.params
        await db.conectarBD()
        await Monoplazas.findOneAndUpdate(
                {
                    _modelo: modelo2
                },
                {
                    _modelo: modelo2,
                    _p_carga:parseInt(p_carga),
                    _fecha_ult_mod: new Date(fecha_ult_mod),
                    _vuelta_actual: parseInt(vuelta_actual)
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        res.json({"Error":"No existe: "+modelo2})
                    } else {
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

    private modModoCarrera = async (req: Request, res: Response) => {
        const { modo_carrera, fecha_ult_mod, vuelta_actual } = req.body
        const { modelo2 } = req.params
        await db.conectarBD()
        await Monoplazas.findOneAndUpdate(
                {
                    _modelo: modelo2
                },
                {
                    _modelo: modelo2,
                    _modo_carrera:parseInt(modo_carrera),
                    _fecha_ult_mod: new Date(fecha_ult_mod),
                    _vuelta_actual: parseInt(vuelta_actual)
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        res.json({"Error":"No existe: "+modelo2})
                    } else {
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }
    
    private infCombustible = async (req: Request, res: Response) => {
        const { modelo1 } = req.params
        await db.conectarBD()
        await Monoplazas.findOne(
            {
                _modelo: modelo1 
            },
            (error:any, datos:any)=>{
                if (error) res.json(error)
                else {
                    if (datos==null) res.json('No hay existe ese modelo')
                    else {
                        let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                        res.json(m2.mostrarCombustible())
                    }
                }
            }
        )
        await db.desconectarBD()
    }

    private infNeumatico = async (req: Request, res: Response) => {
        const { modelo1 } = req.params
        await db.conectarBD()
        await Monoplazas.findOne(
            {
                _modelo: modelo1 
            },
            (error:any, datos:any)=>{
                if (error) res.json(error)
                else {
                    if (datos==null) res.json('No hay existe ese modelo')
                    else {
                        let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                        res.json(m2.mostrarNeumaticos())
                    }
                }
            }
        )
        await db.desconectarBD()
    }

    private infCAerodinamica = async (req: Request, res: Response) => {
        const { modelo1 } = req.params
        await db.conectarBD()
        await Monoplazas.findOne(
            {
                _modelo: modelo1 
            },
            (error:any, datos:any)=>{
                if (error) res.json(error)
                else {
                    if (datos==null) res.json('No hay existe ese modelo')
                    else {
                        let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                        res.json(m2.mostrarCAerodinamica())
                    }
                }
            }
        )
        await db.desconectarBD()
    }

    private infUltimaMod = async (req: Request, res: Response) => {
        const { modelo1 } = req.params
        await db.conectarBD()
        await Monoplazas.findOne(
            {
                _modelo: modelo1 
            },
            (error:any, datos:any)=>{
                if (error) res.json(error)
                else {
                    if (datos==null) res.json('No hay existe ese modelo')
                    else {
                        let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                        res.json(m2.mostrarFechaMod())
                    }
                }
            }
        )
        await db.desconectarBD()
    }

    private borrarMonoplaza = async (req: Request, res: Response) => {
        const { modelo1 } = req.params
        await db.conectarBD()
        await Monoplazas.findOneAndDelete(
            { _modelo: modelo1 }, 
            (err: any, doc) => {
                if(err) res.json(err)
                else{
                    if (doc == null) res.json(`No encontrado`+modelo1)
                    else res.json('Borrado correcto: '+ doc)
                }
            })
        await db.desconectarBD()
    }

     misRutas(){
        this._router.get('/', this.listarMonoplazas)
        this._router.post('/crearMonoplaza', this.crearMonoplaza)
        this._router.get('/infGeneral/:modelo1', this.infGeneral)
        this._router.post('/modNeumaticos/:modelo2', this.modNeumaticos)
        this._router.post('/modCarga/:modelo2', this.modCarga)
        this._router.post('/modModoCarrera/:modelo2', this.modModoCarrera)
        this._router.get('/infCombustible/:modelo1', this.infCombustible)
        this._router.get('/infNeumatico/:modelo1', this.infNeumatico)
        this._router.get('/infCAerodinamica/:modelo1', this.infCAerodinamica)
        this._router.get('/infUltimaMod/:modelo1', this.infUltimaMod)
        this._router.get('/borrarMonoplaza/:modelo1', this.borrarMonoplaza)
        
    }
}

const obj = new MonoplazaRoutes()
obj.misRutas()
export const monoplazaRoutes = obj.router