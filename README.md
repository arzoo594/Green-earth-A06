1.var is function-scoped, hoisted with undefined, and can be redeclared and reassigned.
let is block-scoped, hoisted but not initialized (using it before declaration causes an error), cannot be redeclared in the same scope, but can be reassigned.
const is block-scoped, hoisted but not initialized, cannot be redeclared or reassigned; for objects/arrays, the reference is fixed but their content can change.

2.forEach() iterates over an array and executes a function on each element but does not return a new array; it’s used for side-effects like logging or modifying external variables.
map() iterates over an array, applies a function to each element, and returns a new array with the transformed values without changing the original array.
filter() iterates over an array, applies a condition function, and returns a new array containing only elements that satisfy the condition, leaving the original array unchanged.

3.Arrow functions are a shorter syntax for writing functions in JavaScript, 
introduced in ES6. They use the => symbol and do not have their own this,
meaning they inherit this from the surrounding scope (lexical this).
Arrow functions are especially useful for callbacks, array methods,
and concise function expressions.

4.Destructuring assignment allows you to unpack values from arrays or objects into individual variables in a concise way. 
It reduces the need to access properties or elements one by one.

5.Template literals are string literals enclosed in backticks (` `) that allow embedded expressions,
multi-line strings, and easier string formatting.
They provide a more readable and concise way to include variables or expressions directly inside strings.
