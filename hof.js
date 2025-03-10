// Run CMD: node hof.js 
const add = (x, y) => {
    return x + y
}

const apply = (f, x, y) => {
    return f(x, y)
}

console.info('value of fn.: add = ', add)
console.info('application of fn: add', add(3, 5))
console.info('apply add 5, 4', apply(add, 5, 4))

// Functional composition - functional way of sequential statements
var ans = apply(add, apply(add, 3, 4), apply(add, 10, 12))
console.info('ans = ', ans)

// same as above
let a = apply(add, 3, 4)
let b = apply(add, 10, 12)
let c = apply(add, a, b)
console.info('c = ', c)