const fs = require('fs')
const arqInput = '/input.txt'
const pathInput = __dirname + `${arqInput}`
const arqSpecs = '/specs/af_a_ast_b_b_ast.txt'
const pathSpecs = __dirname + `${arqSpecs}`

let input = ""
let specs = ""
let type = ""

function readInput(caminho) {
    return new Promise((resolve, reject) => {
        fs.readFile(caminho,'utf-8', (error, data) => {
            if(error) 
                reject(error)
            else
                input = data.split("\r\n");
                resolve(input) 
        })
    })
}

function readSpecs(caminho) {
    return new Promise((resolve, reject) => {
        fs.readFile(caminho,'utf-8', (error, data) => {
            if(error)
                reject(error)              
            else
                specs = data.split("\r\n");
                type = specs[0] 
                resolve(type)     
        })
    })
}

async function program() {
    await readInput(pathInput)
    await readSpecs(pathSpecs)
    
    switch (type) {
        case "F":
            console.log("Finito")
            break;
        case "P":
            console.log("Pilha")
            break;
        case "T":
            console.log("Turing")
            break;
        default:
            console.log("Erro")
            break;
    }

    
}

program()