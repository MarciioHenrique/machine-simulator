function delta(q, s, t){
    for (let i = 0; i < t.length; i++) {
        let transition = t[i].split(',')
        if (transition[0].includes(q)) {
            if (transition[1].includes(s)) {
                return transition[2]
            }
        }
    }
    return -1;
}

function program(q, w, t){
    if (q == -1 || w.length == 0)
        return q;
    return program(delta(q, w[0], t), w.substring(1), t);
}

export function FiniteAutomata(input, specs) {
    let tape = input
    let initial = specs[1]
    let final = specs[2].split(',')
    let transitions = []
    for (let i = 3; i < specs.length; i++) {
        transitions.push(specs[i]) 
    }
    let state = program(initial, tape, transitions);
    for (let i = 0; i < final.length; i++) {
        if(final[i].includes(state))
            return 'A'
    }
    return 'R'
}
