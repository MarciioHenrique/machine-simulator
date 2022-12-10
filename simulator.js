import { FiniteAutomata } from './machines/finiteAutomata.js'
import { pushdownAutomata } from './machines/pushdownAutomata.js';
import { turingMachine } from './machines/turingMachine.js';
import * as fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url)) //pega o diretorio
const [arqSpecs, arqInput] = process.argv.splice(2) //pega as informações do terminal
const pathInput = __dirname + `/${arqInput}`
const pathSpecs = __dirname + `/specs/${arqSpecs}`

let input = ""
let specs = ""
let type = ""

//pega a entrada
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

//pega as especificações
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

//escreve a saída do programa
function writeOutput(data, input) {
    fs.writeFile('output.txt', data + '; ' + input + '\n', {flag: 'a'}, (error) => {
        if (error)
            console.log(error)
    })
}

//define qual maquina será utilizada
async function program() {
    await readInput(pathInput)
    await readSpecs(pathSpecs)
    
    switch (type) {
        case "F":
            for (let i = 0; i < input.length; i++) {
                writeOutput(FiniteAutomata(input[i], specs), input[i])
            }
            console.log("Output finalizado")
            break;
        case "P":
            for (let i = 0; i < input.length; i++) {
                writeOutput(pushdownAutomata(input[i], specs), input[i])
            }
            console.log("Output finalizado")
            break;
        case "T":
            for (let i = 0; i < input.length; i++) {
                writeOutput(turingMachine(input[i], specs), input[i])
            }
            console.log("Output finalizado")
            break;
        default:
            console.log("Erro")
            break;
    }
}

program()