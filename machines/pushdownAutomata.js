//faz as transições
function delta(q, s, t, stack){
    //percorre as transições
    for (let i = 0; i < t.length; i++) {
        let transitionStates = t[i].split(',')
        let transition = transitionStates[1].split(';')
        //verifica o estado atual
        if (transitionStates[0].includes(q)) {
            //verifica o simbolo lido e retorna
            if (transition[0].includes(s)) {
                //verifica se vai desempilhar algo
                if (!transition[1].includes('_')) {
                    if (stack.length == 0) 
                        break
                    let position = stack.indexOf(transition[1]);
                    stack.splice(position, 1);
                }
                //verifica se vai empilhar algo
                if (!transition[2].includes('_')) {
                    stack.push(transition[2])
                }
                return transitionStates[2]
            }
        }
    }
    return -1;
}

//verifica se ainda tem entrada para ler ou se está em um estado válido, caso não tenha mais entrada, faz a ultima transição
function program(q, w, t, stack){
    if (q == -1)
        return q
    if (w.length == 0)
        return delta(q, '_', t, stack)
    return program(delta(q, w[0], t, stack), w.substring(1), t, stack)
}

//inicializa as variáveis e retorna A/R para o simulador
export function pushdownAutomata(input, specs) {
    let tape = input
    let initial = specs[1]
    let final = specs[2].split(',')
    let stack = ['Z']

    let transitions = []
    for (let i = 3; i < specs.length; i++) {
        transitions.push(specs[i]) 
    }

    let state = program(initial, tape, transitions, stack);
    for (let i = 0; i < final.length; i++) {
        if(final[i].includes(state) && stack.length == 0)
            return 'A'
    }
    return 'R'
}
