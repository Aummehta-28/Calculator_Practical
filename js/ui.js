import { evaluate, isValid } from "./evaluator.js";
import { saveHistory,renderHistory } from "./calcHistory.js";

export const FUNCTIONS = ["sin","cos","tan","ln","log","sqrt","abs"];

export function handleButtonClick(event, display) {

    if (event.target.tagName !== "BUTTON") return;

    if (event.target.id === "angle-mode") return;

    const buttonValue = event.target.dataset.value || event.target.textContent;

    if (buttonValue === "AC") {
        display.textContent = "";
        return;
    }

    if (buttonValue === "DEL") {
        display.textContent = display.textContent.slice(0, -1);
        return;
    }

    if (buttonValue === "=") {
        return handleEvaluation(display);
    }

    if (buttonValue === "1/x") {
        return handleReciprocal(display);
    }

    if (FUNCTIONS.includes(buttonValue)) {
        display.textContent += buttonValue + "(";
    } else {
      
        display.textContent += buttonValue;
    }
}


function handleEvaluation(display) {
    try {
        const expression = display.textContent;
        const error = isValid(expression);

        if (error) {
            display.textContent = error;
            return;
        }


        const result = evaluate(expression);

        if (!Number.isFinite(result) || isNaN(result)) {
            display.textContent = "Math Error";
            return;
        }

        display.textContent = result;
        saveHistory(expression, result);
        renderHistory();
    } catch (error) {

        console.log("Evaluation error:", error);
        display.textContent = "Calculation Error";
    }
}

function handleReciprocal(display) {
    const error = isValid(display.textContent);

    if (error) {
        display.textContent = error;
        return;
    }


    const result = evaluate(display.textContent);
    display.textContent = 1 / result;

}