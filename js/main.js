 /*
 * Main entry point of the calculator application.
 *
 * Responsibilities of this file:
 * 1. Import required modules (UI handlers, history management).
 * 2. Select important DOM elements from the page.
 * 3. Attach event listeners to UI elements.
 * 4. Initialize the application (render previous calculation history).
 *
 * This file acts as the controller that connects the UI with the application logic.
 */

import { handleButtonClick } from "./ui.js";
import { clearHistory,renderHistory } from "./calcHistory.js";
import { getAngleMode,setAngleMode } from "./mathUtils.js";


const display = document.querySelector('#display')
const button = document.querySelector('.buttons')

const clearHistoryBtn = document.querySelector(".clear-history")
const angleModeBtn = document.querySelector("#angle-mode");


button.addEventListener("click", (e) => handleButtonClick(e, display));

clearHistoryBtn.addEventListener("click", clearHistory);

angleModeBtn.addEventListener("click", () => {

    let newMode = getAngleMode();
    if(newMode==="DEG"){
        newMode = "RAD";
    }else{
        newMode="DEG";
    }

    setAngleMode(newMode);

    angleModeBtn.textContent = newMode;
});
renderHistory();
