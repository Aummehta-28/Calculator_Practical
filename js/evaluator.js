/**
 * Evaluates a mathematical expression string using two stacks :-
 * (valueStack and operatorStack) 
 * 
 * Supports:
 * - Basic operators: + - * / % ^
 * - Functions: sin, cos, tan, etc.
 * - Constants: π, e
 * - Factorial (!)
 * - Parentheses
 * - Implicit multiplication like 2(3+4) or 3sin(30)
 * - Validation For input.
 */

import { applyFunction, applyOperator, precedence, factorial } from "./mathUtils.js";
import { FUNCTIONS } from "./ui.js";

export function evaluate(expression) {
    const valueStack = [];
    const operatorStack = [];

    let currentNumber = "";
    let i = 0;

    while (i < expression.length) {

        let char = expression[i];
        currentNumber = "";
        // Handle unary minus before parentheses or functions
        // Example: -(3+4)  or  -sin(30)

        if (char == "-" && (i == 0 || "+-*/(^".includes(expression[i - 1])) && ((expression[i + 1] === "(") || FUNCTIONS.some(fn => expression.startsWith(fn, i + 1)))) {

            valueStack.push(-1);
            operatorStack.push("*");
            i++;
            continue;
        }


        // Parse numbers (including decimals and negative numbers)
        if (!isNaN(char) || char === "." || ((char === "-") && (i == 0 || "+-*/(^".includes(expression[i - 1])))) {

            // Solves for cases : (-3)3 
            if (expression[i - 1] === ")") {
                operatorStack.push("*");
            }
            
            // Handles negative numbers
            if (char === '-' && expression[i + 1] != "(") {
                currentNumber += char;
                console.log(currentNumber);
                i++;
            }
            // Process until Number or Dot found
            while (!isNaN(expression[i]) || expression[i] === ".") {
                currentNumber += expression[i];
                i++;
                console.log(currentNumber);
            }

            valueStack.push(parseFloat(currentNumber));
            continue;
        }

        // Detect functions like sin, cos, tan, sqrt etc.
        const funName = FUNCTIONS.find(fn => expression.startsWith(fn, i))
        if (funName) {

            // Handle implicit multiplication like 2sin(30) 
            if (valueStack.length >= 1 && (!isNaN(expression[i - 1]) || expression[i - 1] == ")")) {
                operatorStack.push("*");
            }

            operatorStack.push(funName);

            i += funName.length;

            continue;

        }

        if (char == "π") {

            if (valueStack.length >= 1 && (!isNaN(expression[i - 1]) || expression[i - 1] == ")")) {
                operatorStack.push("*");
            }
            valueStack.push(Math.PI);
            i++;
            continue;
        }

        if (char == "e") {

            if (valueStack.length >= 1 && (!isNaN(expression[i - 1]) || expression[i - 1] == ")")) {
                operatorStack.push("*");
            }

            valueStack.push(Math.E);
            i++;
            continue;

        }
        if (char === "!") {
            const value = valueStack.pop();

            valueStack.push(factorial(value));

            i++;
            continue;
        }

        if (char === "(") {
            if (valueStack.length >= 1 && (!isNaN(expression[i - 1]) || expression[i - 1] == ")")) {
                operatorStack.push("*");
            }

            operatorStack.push(char);

            i++;
            continue;
        }

        // Process stack until matching "(" is found
        if (char === ")") {
            while (operatorStack.length && operatorStack.at(-1) !== "(") {
                processStack(valueStack, operatorStack);
            }
            operatorStack.pop();

            if (operatorStack.length && FUNCTIONS.includes(operatorStack.at(-1))) {
                let value = valueStack.pop();
                let func = operatorStack.pop();

                valueStack.push(applyFunction(value, func));
            }
            i++;
            continue;
        }
        if ("+-*/%^".includes(char)) {
            // Check precedence of last character in Operator Stack , if higher then proceed to Stack else push to operator Stack
            while (
                operatorStack.length &&
                ((precedence(operatorStack.at(-1)) > precedence(char)) ||
                    (precedence(operatorStack.at(-1)) === precedence(char) && char !== "^")
                )
            ) {
                processStack(valueStack, operatorStack);
            }
            operatorStack.push(char);
            i++;
        }
    }
    while (operatorStack.length) {
        processStack(valueStack, operatorStack);
    }

    return valueStack.pop();

}


function processStack(valueStack, operatorStack) {
    const b = valueStack.pop();
    const a = valueStack.pop();

    const operator = operatorStack.pop();

    const result = applyOperator(a, b, operator);

    valueStack.push(result);
}

/**
 * Validates the input expression before evaluation.
 * Checks for:
 * - invalid starting/ending operators
 * - invalid operator sequences
 * - multiple decimals
 * - unbalanced parentheses
 */
export function isValid(expression) {
    if (/^[+*/%!]/.test(expression)) return "Cannot start with operator";

    if (expression === "") return "Empty expression";

    if (/[+\-*/.]$/.test(expression)) return "Cannot end with operator";

    if (/[+*/]{2,}/.test(expression)) return "Invalid operator sequence";

    if (/\d*\.\d*\./.test(expression)) return "Multiple decimals in number";

    let count = 0;

    for (const ch of expression) {

        if (ch === "(") count++;

        if (ch === ")") count--;

        if (count < 0) return "Invalid order of parentheses";
    }

    if (count !== 0) return "Unbalanced parentheses";
    return null;
}