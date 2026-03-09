let angleMode = "DEG"

export function getAngleMode() {
    return angleMode;
}

export function setAngleMode(newMode) {
    angleMode = newMode;
}


export function applyOperator(a, b, operator) {
    if (operator === "+") return a + b;

    if (operator === "-") return a - b;

    if (operator === "*") return a * b;

    if (operator === "/") {
        if (b === 0) return "Infinity";
        return a / b;
    }

    if (operator === "%") {
        if (b === 0) return "Modulo by zero not allowed";
        return a % b;
    }

    if (operator === "^") return Math.pow(a, b);
}




export function applyFunction(value, func, angleMode) {

    if (func === "sin") {
        if (angleMode === "DEG") {
            return Math.sin(value * Math.PI / 180);
        }
        return Math.sin(value);
    }

    if (func === "cos") {
        if (angleMode === "DEG") {
            return Math.cos(value * Math.PI / 180);
        }
        return Math.cos(value);
    }

    if (func === "tan") {
        if (angleMode === "DEG") {
            return Math.tan(value * Math.PI / 180);
        }
        return Math.tan(value);
    }

    if (func === "log") {
        if (value <= 0) {
            throw new Error("log of zero or negative number undefined");
        }
        return Math.log10(value);
    }

    if (func === "ln") {
        if (value <= 0) {
            throw new Error("ln of zero or negative number undefined");
        }
        return Math.log(value);
    }

    if (func === "sqrt") {
        if (value < 0) {
            throw new Error("sqrt of negative number undefined");
        }
        return Math.sqrt(value);
    }

    if (func === "abs") return Math.abs(value);
}


export function factorial(n) {

    if (!Number.isInteger(n) || n < 0) return "Invalid factorial";

    let ans = 1;

    for (let i = n; i >= 1; i--) {
        ans *= i;
    }

    return ans;
}


export function precedence(operator) {
    if (operator == "^") return 3;

    if (operator == "*" || operator == "/" || operator == "%") return 2;

    if (operator == "+" || operator == "-") return 1;
}