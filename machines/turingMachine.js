let tape = []

//faz as transições
function delta(q, s, t, tape){
    //percorre as transições
    for (let i = 0; i < t.length; i++) {
        let transition = t[i].split(',')
        //verifica o estado atual
        if (transition[0].includes(q)) {
            //verifica o simbolo lido e retorna
            if (transition[1].includes(s)) {
                tape[q].push(transition[2])
                if(transition[3].includes('D'))
                    return q+1
                if(transitior[3].includes('E'))
                    return q-1
            }
        }
    }
    return -1;
}

//verifica se ainda tem entrada para ler ou se está em um estado válido, caso não tenha mais entrada, faz a ultima transição
function program(q, w, t, tape){
    if (q == -1 || w.length == 0)
        return q;
    return program(delta(q, w[0], t, tape), w.substring(1), t, tape)
}

//inicializa as variáveis e retorna A/R para o simulador
export function turingMachine(input, specs) {
    let word = input
    let initial = specs[1]
    let final = specs[2].split(',')


    let transitions = []
    for (let i = 3; i < specs.length; i++) {
        transitions.push(specs[i]) 
    }

    let state = program(initial, word, transitions, tape);
    for (let i = 0; i < final.length; i++) {
        if(final[i].includes(state))
            return 'A'
    }
    return 'R'
}
