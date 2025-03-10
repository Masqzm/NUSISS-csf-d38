const hello = (name) => {
    return `Hello ${name}`
}

console.info(hello('fred'))

const mkHello = (name) => {
    return (n = 0) => {   
        let s = `Hello ${name}`

        for(let i = 0; i < n; i++)
            s += ` | Hello ${name}`
        // name is a free variable

        return s
    }
}

const greetFred = mkHello('Fred')       // value of greetFred = fn.
const greetBarney = mkHello('Barney')

console.info('fred: ', greetFred)
console.info('greet fred: ', greetFred())

console.info('barney: ', greetBarney)
console.info('greet barney: ', greetBarney(3))
