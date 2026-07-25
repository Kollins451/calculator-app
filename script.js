/* =========================================
   KOLLINS CALCULATOR
   Main JavaScript
========================================= */


/* =========================================
   NUMBER FORMATTING
========================================= */

function formatNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Error";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 10
  }).format(value);
}


/* =========================================
   MODE SWITCHING
========================================= */

const modeButtons = document.querySelectorAll(".mode-button");
const calculatorModes = document.querySelectorAll(".calculator-mode");

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedMode = button.dataset.mode;

    modeButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    calculatorModes.forEach(mode => {
      mode.classList.remove("active-mode");
    });

    button.classList.add("active");

    const selectedSection =
      document.getElementById(`${selectedMode}-mode`);

    if (selectedSection) {
      selectedSection.classList.add("active-mode");
    }
  });
});


/* =========================================
   BASIC CALCULATOR
========================================= */

let basicExpression = "";

const basicExpressionDisplay =
  document.getElementById("basic-expression");

const basicResultDisplay =
  document.getElementById("basic-result");


function updateBasicDisplay() {
  basicExpressionDisplay.textContent =
    basicExpression || "0";
}


function addToBasicExpression(value) {
  basicExpression += value;
  updateBasicDisplay();
}


function clearBasicCalculator() {
  basicExpression = "";

  basicExpressionDisplay.textContent = "0";
  basicResultDisplay.textContent = "0";
}


function deleteBasicCharacter() {
  basicExpression =
    basicExpression.slice(0, -1);

  updateBasicDisplay();
}


function calculateBasic() {
  if (!basicExpression) {
    return;
  }

  try {
    const safeExpression =
      basicExpression
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

    const result =
      Function(`"use strict"; return (${safeExpression})`)();

    if (
      typeof result === "number" &&
      Number.isFinite(result)
    ) {
      basicResultDisplay.textContent =
        formatNumber(result);
    } else {
      basicResultDisplay.textContent = "Error";
    }

  } catch (error) {
    basicResultDisplay.textContent = "Error";
  }
}


/* Basic Calculator Buttons */

document
  .querySelectorAll("#basic-mode [data-value]")
  .forEach(button => {
    button.addEventListener("click", () => {
      addToBasicExpression(
        button.dataset.value
      );
    });
  });


document
  .querySelector("#basic-mode [data-action='clear']")
  .addEventListener(
    "click",
    clearBasicCalculator
  );


document
  .querySelector("#basic-mode [data-action='delete']")
  .addEventListener(
    "click",
    deleteBasicCharacter
  );


document
  .querySelector("#basic-mode [data-action='calculate']")
  .addEventListener(
    "click",
    calculateBasic
  );


/* =========================================
   SCIENTIFIC CALCULATOR
========================================= */

let scientificExpression = "";

const scientificExpressionDisplay =
  document.getElementById(
    "scientific-expression"
  );

const scientificResultDisplay =
  document.getElementById(
    "scientific-result"
  );


function updateScientificDisplay() {
  scientificExpressionDisplay.textContent =
    scientificExpression || "0";
}


function addToScientificExpression(value) {
  scientificExpression += value;
  updateScientificDisplay();
}


function clearScientificCalculator() {
  scientificExpression = "";

  scientificExpressionDisplay.textContent =
    "0";

  scientificResultDisplay.textContent =
    "0";
}


function deleteScientificCharacter() {
  scientificExpression =
    scientificExpression.slice(0, -1);

  updateScientificDisplay();
}


function calculateScientific() {
  if (!scientificExpression) {
    return;
  }

  try {
    let expression =
      scientificExpression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI");

    expression =
      expression.replace(
        /(\d+(\.\d+)?)²/g,
        "($1 ** 2)"
      );

    const result =
      Function(
        `"use strict"; return (${expression})`
      )();

    if (
      typeof result === "number" &&
      Number.isFinite(result)
    ) {
      scientificResultDisplay.textContent =
        formatNumber(result);
    } else {
      scientificResultDisplay.textContent =
        "Error";
    }

  } catch (error) {
    scientificResultDisplay.textContent =
      "Error";
  }
}


/* Scientific Number Buttons */

document
  .querySelectorAll(
    "#scientific-mode [data-value]"
  )
  .forEach(button => {
    button.addEventListener("click", () => {
      addToScientificExpression(
        button.dataset.value
      );
    });
  });


/* Scientific Functions */

document
  .querySelectorAll(
    "#scientific-mode [data-scientific]"
  )
  .forEach(button => {
    button.addEventListener("click", () => {

      const functionName =
        button.dataset.scientific;

      if (functionName === "pi") {
        addToScientificExpression("π");
      }

      else if (functionName === "sqrt") {
        addToScientificExpression("Math.sqrt(");
      }

      else if (functionName === "sin") {
        addToScientificExpression("Math.sin(");
      }

      else if (functionName === "cos") {
        addToScientificExpression("Math.cos(");
      }

      else if (functionName === "tan") {
        addToScientificExpression("Math.tan(");
      }

      else if (functionName === "log") {
        addToScientificExpression("Math.log10(");
      }

      else if (functionName === "square") {
        addToScientificExpression("**2");
      }

      else if (functionName === "power") {
        addToScientificExpression("**");
      }

    });
  });


document
  .querySelector(
    "#scientific-mode [data-action='scientific-clear']"
  )
  .addEventListener(
    "click",
    clearScientificCalculator
  );


document
  .querySelector(
    "#scientific-mode [data-action='scientific-delete']"
  )
  .addEventListener(
    "click",
    deleteScientificCharacter
  );


document
  .querySelector(
    "#scientific-mode [data-action='scientific-calculate']"
  )
  .addEventListener(
    "click",
    calculateScientific
  );


/* =========================================
   CONVERTER TABS
========================================= */

const converterTabs =
  document.querySelectorAll(
    ".converter-tab"
  );

const converterPanels =
  document.querySelectorAll(
    ".converter-panel"
  );


converterTabs.forEach(tab => {
  tab.addEventListener("click", () => {

    const selectedConverter =
      tab.dataset.converter;

    converterTabs.forEach(item => {
      item.classList.remove("active");
    });

    converterPanels.forEach(panel => {
      panel.classList.remove(
        "active-panel"
      );
    });

    tab.classList.add("active");

    const selectedPanel =
      document.getElementById(
        `${selectedConverter}-converter`
      );

    if (selectedPanel) {
      selectedPanel.classList.add(
        "active-panel"
      );
    }

  });
});


/* =========================================
   LENGTH CONVERTER
========================================= */

const lengthToMetres = {
  metre: 1,
  kilometre: 1000,
  centimetre: 0.01,
  mile: 1609.344,
  foot: 0.3048,
  inch: 0.0254
};


document
  .getElementById("convert-length")
  .addEventListener("click", () => {

    const value =
      parseFloat(
        document.getElementById(
          "length-value"
        ).value
      );

    const from =
      document.getElementById(
        "length-from"
      ).value;

    const to =
      document.getElementById(
        "length-to"
      ).value;

    const resultDisplay =
      document.getElementById(
        "length-result"
      );


    if (Number.isNaN(value)) {
      resultDisplay.textContent =
        "Please enter a valid number.";

      return;
    }


    const metres =
      value *
      lengthToMetres[from];


    const result =
      metres /
      lengthToMetres[to];


    resultDisplay.textContent =
      `${formatNumber(value)} ${from} = ${formatNumber(result)} ${to}`;

  });


/* =========================================
   WEIGHT CONVERTER
========================================= */

const weightToKilograms = {
  kilogram: 1,
  gram: 0.001,
  pound: 0.45359237,
  ounce: 0.028349523125
};


document
  .getElementById("convert-weight")
  .addEventListener("click", () => {

    const value =
      parseFloat(
        document.getElementById(
          "weight-value"
        ).value
      );

    const from =
      document.getElementById(
        "weight-from"
      ).value;

    const to =
      document.getElementById(
        "weight-to"
      ).value;

    const resultDisplay =
      document.getElementById(
        "weight-result"
      );


    if (Number.isNaN(value)) {
      resultDisplay.textContent =
        "Please enter a valid number.";

      return;
    }


    const kilograms =
      value *
      weightToKilograms[from];


    const result =
      kilograms /
      weightToKilograms[to];


    resultDisplay.textContent =
      `${formatNumber(value)} ${from} = ${formatNumber(result)} ${to}`;

  });


/* =========================================
   TEMPERATURE CONVERTER
========================================= */

function convertTemperature(
  value,
  from,
  to
) {

  let celsius;


  if (from === "celsius") {
    celsius = value;
  }

  else if (from === "fahrenheit") {
    celsius =
      (value - 32) * 5 / 9;
  }

  else if (from === "kelvin") {
    celsius =
      value - 273.15;
  }


  if (to === "celsius") {
    return celsius;
  }

  if (to === "fahrenheit") {
    return (
      celsius * 9 / 5
    ) + 32;
  }

  if (to === "kelvin") {
    return celsius + 273.15;
  }

}


document
  .getElementById(
    "convert-temperature"
  )
  .addEventListener(
    "click",
    () => {

      const value =
        parseFloat(
          document.getElementById(
            "temperature-value"
          ).value
        );

      const from =
        document.getElementById(
          "temperature-from"
        ).value;

      const to =
        document.getElementById(
          "temperature-to"
        ).value;

      const resultDisplay =
        document.getElementById(
          "temperature-result"
        );


      if (Number.isNaN(value)) {
        resultDisplay.textContent =
          "Please enter a valid temperature.";

        return;
      }


      const result =
        convertTemperature(
          value,
          from,
          to
        );


      resultDisplay.textContent =
        `${formatNumber(value)}° ${from} = ${formatNumber(result)}° ${to}`;

    }
  );


/* =========================================
   CURRENCY CONVERTER
========================================= */

const currencyRates = {

  NGN: {
    USD: 0.00065,
    GBP: 0.00050,
    EUR: 0.00060,
    NGN: 1
  },

  USD: {
    NGN: 1538,
    GBP: 0.77,
    EUR: 0.92,
    USD: 1
  },

  GBP: {
    NGN: 2000,
    USD: 1.30,
    EUR: 1.19,
    GBP: 1
  },

  EUR: {
    NGN: 1667,
    USD: 1.09,
    GBP: 0.84,
    EUR: 1
  }

};


document
  .getElementById(
    "convert-currency"
  )
  .addEventListener(
    "click",
    () => {

      const amount =
        parseFloat(
          document.getElementById(
            "currency-amount"
          ).value
        );

      const from =
        document.getElementById(
          "from-currency"
        ).value;

      const to =
        document.getElementById(
          "to-currency"
        ).value;

      const resultDisplay =
        document.getElementById(
          "currency-result"
        );


      if (
        Number.isNaN(amount) ||
        amount < 0
      ) {

        resultDisplay.textContent =
          "Please enter a valid amount.";

        return;

      }


      const rate =
        currencyRates[from][to];


      if (!rate) {

        resultDisplay.textContent =
          "Currency conversion is unavailable.";

        return;

      }


      const result =
        amount * rate;


      resultDisplay.textContent =
        `${formatNumber(amount)} ${from} = ${formatNumber(result)} ${to}`;

    }
  );


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
  "keydown",
  event => {

    const key =
      event.key;


    if (
      /^[0-9.]$/.test(key) ||
      ["+", "-", "*", "/", "%"].includes(key)
    ) {

      addToBasicExpression(key);

    }


    if (key === "Enter") {
      calculateBasic();
    }


    if (key === "Backspace") {
      deleteBasicCharacter();
    }


    if (key === "Escape") {
      clearBasicCalculator();
    }

  }
);

    }
  );

}
