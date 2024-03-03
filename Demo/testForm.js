import { Ornement } from "../Ornement.js";

document.getElementById("ornamentForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission

    const textareaValue = document.getElementById("Ornement").value;
    const resultDiv = document.getElementById("result");

    // Call the Ornement function and display the result
    resultDiv.innerHTML = Ornement(textareaValue);
});