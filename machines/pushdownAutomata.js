function delta(q, s, t, stack){
    for (let i = 0; i < t.length; i++) {
        let transitionStates = t[i].split(',')
        let transition = transitionStates[1].split(';')
        //verifica o estado atual
        if (transitionStates[0].includes(q)) {
            //verifica o simbolo lido
            if (transition[0].includes(s) ) {
                if (!transition[1].includes('_')) {
                    let position = stack.indexOf(transition[1]);
                    stack.splice(position, 1);
                }
                if (!transition[2].includes('_')) {
                    stack.push(transition[2])
                }
                console.log('q: '+ q + ' s: '+ s + ' t:' + transition)
                return transitionStates[2]
            }
        }
    }
    return -1;
}


function program(q, w, t, stack){

    console.log('-----------')
    if (q == -1 || w.length == 0)
        return delta(q, '_', t, stack);
    return program(delta(q, w[0], t, stack), w.substring(1), t, stack);
}

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
    console.log(state)
    console.log(stack)
    console.log("-----FIM-----")
    for (let i = 0; i < final.length; i++) {
        if(final[i].includes(state) && stack.length == 0)
            return 'A'
    }
    return 'R'
}
