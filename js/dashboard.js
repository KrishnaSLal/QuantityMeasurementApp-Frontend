const typeCards = document.querySelectorAll(".type");
const actionButtons = document.querySelectorAll(".actions button");
const operatorButtons = document.querySelectorAll(".operators button");

const unit1Select = document.getElementById("unit1");
const unit2Select = document.getElementById("unit2");
const resultUnitSelect = document.getElementById("resultUnit");

const valueInputs = document.querySelectorAll(".values input");
const resultValue = document.getElementById("resultValue");
const selectedOp = document.getElementById("selectedOp");
const operatorSection = document.getElementById("operatorSection");

let selectedType = "length";
let selectedAction = "arithmetic";
let selectedOperator = "+";

function populateUnits(type) {
    const units = measurementData[type].units;

    unit1Select.innerHTML = "";
    unit2Select.innerHTML = "";
    resultUnitSelect.innerHTML = "";

    units.forEach(unit => {
        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        unit1Select.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        unit2Select.appendChild(option2);

        const option3 = document.createElement("option");
        option3.value = unit;
        option3.textContent = unit;
        resultUnitSelect.appendChild(option3);
    });

    resultUnitSelect.value = unit1Select.value;
}

function calculateResult() {
    const value1 = parseFloat(valueInputs[0].value);
    const value2 = parseFloat(valueInputs[1].value);
    const unit1 = unit1Select.value;
    const unit2 = unit2Select.value;
    const resultUnit = resultUnitSelect.value;

    if (isNaN(value1) || isNaN(value2)) {
        resultValue.textContent = "0";
        return;
    }

    try {
        if (selectedAction === "comparison") {
            resultValue.textContent = compareValues(selectedType, value1, unit1, value2, unit2);
        } else if (selectedAction === "conversion") {
            const converted = convertValue(selectedType, value1, unit1, resultUnit);
            resultValue.textContent = Number(converted.toFixed(4));
        } else {
            const result = arithmeticValues(selectedType, value1, unit1, value2, unit2, selectedOperator);
            resultValue.textContent = Number(result.toFixed(4));
            resultUnitSelect.value = unit1;
        }
    } catch (err) {
        resultValue.textContent = err.message;
    }
}

typeCards.forEach(card => {
    card.addEventListener("click", () => {
        typeCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        selectedType = card.dataset.type;
        populateUnits(selectedType);
        calculateResult();
    });
});

actionButtons.forEach(button => {
    button.addEventListener("click", () => {
        actionButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const text = button.textContent.toLowerCase();

        if (text.includes("comparison")) {
            selectedAction = "comparison";
            operatorSection.style.display = "none";
        } else if (text.includes("conversion")) {
            selectedAction = "conversion";
            operatorSection.style.display = "none";
        } else {
            selectedAction = "arithmetic";
            operatorSection.style.display = "block";
        }

        calculateResult();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedOperator = button.dataset.op;
        selectedOp.textContent = selectedOperator;
        calculateResult();
    });
});

[valueInputs[0], valueInputs[1], unit1Select, unit2Select, resultUnitSelect].forEach(el => {
    el.addEventListener("input", calculateResult);
    el.addEventListener("change", calculateResult);
});

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        alert("Please login first");
        window.location.href = "auth.html";
        return;
    }

    populateUnits(selectedType);
    calculateResult();
});