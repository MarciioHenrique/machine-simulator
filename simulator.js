const fs = require('fs')
const arq = '/input.txt'
const path = __dirname + `${arq}`

let input = ""

function leArquivo(caminho) {
    fs.readFile(caminho,'utf-8', (error, data) => {
        if(error) 
            console.log('erro na leitura: '+error.message)
        else
            input = data.split("\r\n");
            console.log(input);
    })
}

leArquivo(path)