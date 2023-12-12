const { json } = require('body-parser')
const fs = require ('fs')

const ruta_archivo = './animalesRefujiados.json'
const administradorAnimales = {
    agregar: (animal) =>{
        let animales = fs.readFileSync (ruta_archivo,'utf-8')
        animales = JSON.parse(animales)
        const lastId = animales[animales.length]
        animales.push(animal)
        fs.writeFileSync(ruta_archivo, JSON.stringify(animales))
        return animales
    },
    listar: () =>{
        const animales = fs.readFileSync(ruta_archivo, 'utf-8')
        return JSON.parse(animales)
    },
    buscar: (id) =>{
        let animalAEncontrar = fs.readFileSync(ruta_archivo, 'utf-8')
        animalAEncontrar = JSON.parse(animalAEncontrar)
        const animalEncontrado = animalAEncontrar.find(animal => animal.id == id)    
        return animalEncontrado
    },
    eliminar: (id) =>{
        let AnimalAEliminar =fs.readFileSync(ruta_archivo, 'utf-8')
        AnimalAEliminar = JSON.parse(AnimalAEliminar)
        const AnimalesFiltrados = AnimalAEliminar.filter( animal => animal.id != id)
        fs.writeFileSync(ruta_archivo, JSON.stringify(AnimalesFiltrados))
        return AnimalesFiltrados
    },
    modificar: (id, animalModificado) =>{
        let animalAModificar = fs.readFileSync (ruta_archivo,'utf-8')
        animalAModificar = JSON.parse(animalAModificar)
        let animalUpdate = animalAModificar.find (animal => animal.id == id)
        animalUpdate = {...animalUpdate, ...animalModificado, id  }
        animalAModificar.filter ( animal => animal.id != id)
        animalAModificar.push (animalUpdate)
        fs.writeFileSync(ruta_archivo, JSON.stringify(animalAModificar))
        return animalUpdate
    }
}

/* const formHTML = document.getElementById("nuevoAnimal")
formHTML.addEventListener("submit", (e) =>{
    e.preventDefault()
    const data = {nombre: formHTML.nombre.value, edad: formHTML.edad.value, sexo: formHTML.sexo.value}
    console.log(data)
    agregar(data)}) */

module.exports = {administradorAnimales};
