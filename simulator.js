import { FiniteAutomata } from './machines/finiteAutomata.js'
import * as fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
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
            for (let i = 0; i < input.length; i++) {
                console.log(FiniteAutomata(input[i], specs))
            }
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