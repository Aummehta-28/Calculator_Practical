/**
 * Saves History , Display History , Clear History.
 * Error Handling if error occurs in performing operations.
 */
const historyList = document.querySelector(".list");


export function saveHistory(expression, result) {

    try {

        const history = JSON.parse(localStorage.getItem("History")) || [];

        history.push({
            expression: expression,
            result: result
        });

        localStorage.setItem("History", JSON.stringify(history));
    } catch (error) {

        console.log("Save history error:", error);
    }

}
export function renderHistory() {
    try {
        const history = JSON.parse(localStorage.getItem("History")) || [];
        historyList.innerHTML = "";

        history.forEach(item => {
            const div = document.createElement("div");
            div.className = "list-item";
            div.textContent = `${item.expression} = ${item.result}`;
            historyList.appendChild(div);

        });
    } catch (error) {
        console.log("Render History Error ", error)
    }

}
export function clearHistory() {

    localStorage.setItem("History", JSON.stringify([]));
    renderHistory();
}
