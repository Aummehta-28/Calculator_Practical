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
