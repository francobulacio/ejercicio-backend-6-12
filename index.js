//api con las siguientes rutas listar, agregar , detalle y eliminar y modificar

const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const PORT = 9000
const {administradorAnimales} = require ('./administradorAnimales')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req, res) =>{
    res.send('<h1>hola</h1>')
})

app.listen(PORT, () =>{
    console.log('el servidor funciona')
})

app.get('/api/v1/animalesRefujiados', (req, res) =>{
    const animales = administradorAnimales.listar()
    res.json({
        status: 200, 
        mensaje: 'ok',
        results: animales
    })
})

app.get('/api/v1/animalesRefujiados/:id', (req, res) =>{
    const idParam = req.params.id
    const animalBuscado = administradorAnimales.buscar(idParam)
    console.log(JSON.stringify(animalBuscado))
    res.json({
        status: 200,
        mensaje: "ok",
        results: animalBuscado
    })
})

app.post('/api/v1/animalesRefujiados', (req, res) =>{
    const {nombre, edad, sexo} = req.body
    const animalNuevo = {nombre, edad, sexo}
    const agregarAnimal = administradorAnimales.agregar(animalNuevo)
    console.log(agregarAnimal)
    res.json({
        status: 200,
        mensaje: 'ok',
        results: agregarAnimal
    })
})

app.delete('/api/v1/animalesRefujiados/:id', (req, res) =>{
    const {id} = req.params
    const animalEliminado = administradorAnimales.eliminar(id)
    res.json({
        status: 200,
        mensaje: 'ok',
        results: animalEliminado
    })
})

app.put('/api/v1/animalesRefujiados/:id', (req, res) =>{
    const {id} = req.params
    const animalModificado = {...req.body}
    const animalActualizado = administradorAnimales.modificar(id, animalModificado )
    res.json({
        status: 200,
        mensaje: 'ok',
        results: animalActualizado
    })
})



