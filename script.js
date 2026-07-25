/* =========================================
   KOLLINS CALCULATOR + KOLLINS AI
========================================= */


/* =========================================
   NUMBER FORMATTING
========================================= */

function formatNumber(value) {

  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return "Error";
  }

  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 10
  }).format(value);

}


/* Format numbers while typing */

function formatExpression(expression) {

  if (!expression) {
    return "0";
  }

  return expression.replace(
    /(^|[+\-*/%])(\d+(?:\.\d+)?)/g,
    function (match, operator, number) {

      const parts = number.split(".");

      const integerPart =
        Number(parts[0]).toLocaleString("en-GB");


      if (parts.length > 1) {

        return (
          operator +
          integerPart +
          "." +
          parts[1]
        );

      }


      return operator + integerPart;

    }
  );

}


/* Remove commas before calculation */

function removeCommas(expression) {

  return expression.replace(/,/g, "");

}



/* =========================================
   AI / CALCULATOR SCREEN SWITCHING
========================================= */

const calculatorApp =
  document.getElementById(
    "calculator-app"
  );


const aiApp =
  document.getElementById(
    "ai-app"
  );


const openAIButton =
  document.getElementById(
    "open-ai"
  );


const backToCalculatorButton =
  document.getElementById(
    "back-to-calculator"
  );


/* Open AI */

if (
  openAIButton &&
  calculatorApp &&
  aiApp
) {

  openAIButton.addEventListener(
    "click",
    function () {

      calculatorApp.hidden = true;

      aiApp.hidden = false;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* Return to Calculator */

if (
  backToCalculatorButton &&
  calculatorApp &&
  aiApp
) {

  backToCalculatorButton.addEventListener(
    "click",
    function () {

      aiApp.hidden = true;

      calculatorApp.hidden = false;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}



/* =========================================
   MODE SWITCHING
========================================= */

const modeButtons =
  document.querySelectorAll(
    ".mode-button"
  );


const calculatorModes =
  document.querySelectorAll(
    ".calculator-mode"
  );


modeButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      const selectedMode =
        button.dataset.mode;


      modeButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      calculatorModes.forEach(mode => {

        mode.classList.remove(
          "active-mode"
        );

      });


      button.classList.add(
        "active"
      );


      const selectedSection =
        document.getElementById(
          `${selectedMode}-mode`
        );


      if (selectedSection) {

        selectedSection.classList.add(
          "active-mode"
        );

      }

    }
  );

});



/* =========================================
   BASIC CALCULATOR
========================================= */

let basicExpression = "";


const basicExpressionDisplay =
  document.getElementById(
    "basic-expression"
  );


const basicResultDisplay =
  document.getElementById(
    "basic-result"
  );


function updateBasicDisplay() {

  if (!basicExpressionDisplay) {
    return;
  }

  basicExpressionDisplay.textContent =
    formatExpression(
      basicExpression
    );

}


function addToBasicExpression(value) {

  basicExpression += value;

  updateBasicDisplay();

}


function clearBasicCalculator() {

  basicExpression = "";

  if (basicExpressionDisplay) {

    basicExpressionDisplay.textContent =
      "0";

  }

  if (basicResultDisplay) {

    basicResultDisplay.textContent =
      "0";

  }

}


function deleteBasicCharacter() {

  basicExpression =
    basicExpression.slice(
      0,
      -1
    );

  updateBasicDisplay();

}


function calculateBasic() {

  if (!basicExpression) {
    return;
  }


  try {

    const safeExpression =
      removeCommas(
        basicExpression
      )
      .replace(
        /×/g,
        "*"
      )
      .replace(
        /÷/g,
        "/"
      );


    const result =
      Function(
        `"use strict"; return (${safeExpression})`
      )();


    if (
      typeof result === "number" &&
      Number.isFinite(result)
    ) {

      if (basicResultDisplay) {

        basicResultDisplay.textContent =
          formatNumber(result);

      }

    } else {

      if (basicResultDisplay) {

        basicResultDisplay.textContent =
          "Error";

      }

    }

  } catch (error) {

    if (basicResultDisplay) {

      basicResultDisplay.textContent =
        "Error";

    }

  }

}


/* Basic Number Buttons */

document
  .querySelectorAll(
    "#basic-mode [data-value]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        addToBasicExpression(
          button.dataset.value
        );

      }
    );

  });


/* Basic Clear */

const basicClearButton =
  document.querySelector(
    "#basic-mode [data-action='clear']"
  );


if (basicClearButton) {

  basicClearButton.addEventListener(
    "click",
    clearBasicCalculator
  );

}


/* Basic Delete */

const basicDeleteButton =
  document.querySelector(
    "#basic-mode [data-action='delete']"
  );


if (basicDeleteButton) {

  basicDeleteButton.addEventListener(
    "click",
    deleteBasicCharacter
  );

}


/* Basic Equals */

const basicCalculateButton =
  document.querySelector(
    "#basic-mode [data-action='calculate']"
  );


if (basicCalculateButton) {

  basicCalculateButton.addEventListener(
    "click",
    calculateBasic
  );

}



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

  if (!scientificExpressionDisplay) {
    return;
  }

  scientificExpressionDisplay.textContent =
    formatExpression(
      scientificExpression
    );

}


function addToScientificExpression(value) {

  scientificExpression += value;

  updateScientificDisplay();

}


function clearScientificCalculator() {

  scientificExpression = "";

  if (scientificExpressionDisplay) {

    scientificExpressionDisplay.textContent =
      "0";

  }

  if (scientificResultDisplay) {

    scientificResultDisplay.textContent =
      "0";

  }

}


function deleteScientificCharacter() {

  scientificExpression =
    scientificExpression.slice(
      0,
      -1
    );

  updateScientificDisplay();

}


function calculateScientific() {

  if (!scientificExpression) {
    return;
  }


  try {

    let expression =
      removeCommas(
        scientificExpression
      )
      .replace(
        /×/g,
        "*"
      )
      .replace(
        /÷/g,
        "/"
      )
      .replace(
        /π/g,
        "Math.PI"
      );


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

      if (scientificResultDisplay) {

        scientificResultDisplay.textContent =
          formatNumber(result);

      }

    } else {

      if (scientificResultDisplay) {

        scientificResultDisplay.textContent =
          "Error";

      }

    }

  } catch (error) {

    if (scientificResultDisplay) {

      scientificResultDisplay.textContent =
        "Error";

    }

  }

}


/* Scientific Number Buttons */

document
  .querySelectorAll(
    "#scientific-mode [data-value]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        addToScientificExpression(
          button.dataset.value
        );

      }
    );

  });


/* Scientific Functions */

document
  .querySelectorAll(
    "#scientific-mode [data-scientific]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const functionName =
          button.dataset.scientific;


        if (
          functionName === "pi"
        ) {

          addToScientificExpression(
            "π"
          );

        }


        else if (
          functionName === "sqrt"
        ) {

          addToScientificExpression(
            "Math.sqrt("
          );

        }


        else if (
          functionName === "sin"
        ) {

          addToScientificExpression(
            "Math.sin("
          );

        }


        else if (
          functionName === "cos"
        ) {

          addToScientificExpression(
            "Math.cos("
          );

        }


        else if (
          functionName === "tan"
        ) {

          addToScientificExpression(
            "Math.tan("
          );

        }


        else if (
          functionName === "log"
        ) {

          addToScientificExpression(
            "Math.log10("
          );

        }


        else if (
          functionName === "square"
        ) {

          addToScientificExpression(
            "**2"
          );

        }


        else if (
          functionName === "power"
        ) {

          addToScientificExpression(
            "**"
          );

        }

      }
    );

  });


/* Scientific Clear */

const scientificClearButton =
  document.querySelector(
    "#scientific-mode [data-action='scientific-clear']"
  );


if (scientificClearButton) {

  scientificClearButton.addEventListener(
    "click",
    clearScientificCalculator
  );

}


/* Scientific Delete */

const scientificDeleteButton =
  document.querySelector(
    "#scientific-mode [data-action='scientific-delete']"
  );


if (scientificDeleteButton) {

  scientificDeleteButton.addEventListener(
    "click",
    deleteScientificCharacter
  );

}


/* Scientific Equals */

const scientificCalculateButton =
  document.querySelector(
    "#scientific-mode [data-action='scientific-calculate']"
  );


if (scientificCalculateButton) {

  scientificCalculateButton.addEventListener(
    "click",
    calculateScientific
  );

}



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

  tab.addEventListener(
    "click",
    function () {

      const selectedConverter =
        tab.dataset.converter;


      converterTabs.forEach(item => {

        item.classList.remove(
          "active"
        );

      });


      converterPanels.forEach(panel => {

        panel.classList.remove(
          "active-panel"
        );

      });


      tab.classList.add(
        "active"
      );


      const selectedPanel =
        document.getElementById(
          `${selectedConverter}-converter`
        );


      if (selectedPanel) {

        selectedPanel.classList.add(
          "active-panel"
        );

      }

    }
  );

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


const lengthConvertButton =
  document.getElementById(
    "convert-length"
  );


if (lengthConvertButton) {

  lengthConvertButton.addEventListener(
    "click",
    function () {

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

    }
  );

}



/* =========================================
   WEIGHT CONVERTER
========================================= */

const weightToKilograms = {

  kilogram: 1,

  gram: 0.001,

  pound: 0.45359237,

  ounce: 0.028349523125

};


const weightConvertButton =
  document.getElementById(
    "convert-weight"
  );


if (weightConvertButton) {

  weightConvertButton.addEventListener(
    "click",
    function () {

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

    }
  );

}



/* =========================================
   TEMPERATURE CONVERTER
========================================= */

function convertTemperature(
  value,
  from,
  to
) {

  let celsius;


  if (
    from === "celsius"
  ) {

    celsius = value;

  }


  else if (
    from === "fahrenheit"
  ) {

    celsius =
      (value - 32) *
      5 / 9;

  }


  else if (
    from === "kelvin"
  ) {

    celsius =
      value - 273.15;

  }


  if (
    to === "celsius"
  ) {

    return celsius;

  }


  if (
    to === "fahrenheit"
  ) {

    return (
      celsius *
      9 / 5
    ) + 32;

  }


  if (
    to === "kelvin"
  ) {

    return (
      celsius +
      273.15
    );

  }

}


const temperatureConvertButton =
  document.getElementById(
    "convert-temperature"
  );


if (temperatureConvertButton) {

  temperatureConvertButton.addEventListener(
    "click",
    function () {

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

}



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


const currencyConvertButton =
  document.getElementById(
    "convert-currency"
  );


if (currencyConvertButton) {

  currencyConvertButton.addEventListener(
    "click",
    function () {

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


      if (
        rate === undefined
      ) {

        resultDisplay.textContent =
          "Currency conversion is unavailable.";

        return;

      }


      const result =
        amount *
        rate;


      resultDisplay.textContent =
        `${formatNumber(amount)} ${from} = ${formatNumber(result)} ${to}`;

    }
  );

}



/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
  "keydown",
  function (event) {

    /* Don't control calculator
       while typing in AI */

    if (
      document.activeElement &&
      document.activeElement.id ===
      "ai-input"
    ) {

      return;

    }


    const key =
      event.key;


    if (
      /^[0-9.]$/.test(key) ||
      [
        "+",
        "-",
        "*",
        "/",
        "%"
      ].includes(key)
    ) {

      addToBasicExpression(
        key
      );

    }


    if (
      key === "Enter"
    ) {

      calculateBasic();

    }


    if (
      key === "Backspace"
    ) {

      deleteBasicCharacter();

    }


    if (
      key === "Escape"
    ) {

      clearBasicCalculator();

    }

  }
);



/* =========================================
   KOLLINS AI
========================================= */

const aiInput =
  document.getElementById(
    "ai-input"
  );


const aiSendButton =
  document.getElementById(
    "ai-send"
  );


const aiChat =
  document.getElementById(
    "ai-chat"
  );


const aiClearButton =
  document.getElementById(
    "ai-clear"
  );



/* Add AI message */

function addAIMessage(
  message
) {

  if (!aiChat) {
    return;
  }


  const messageDiv =
    document.createElement(
      "div"
    );


  messageDiv.className =
    "ai-message";


  messageDiv.innerHTML = `
    <strong>Kollins AI:</strong>
    <p></p>
  `;


  messageDiv
    .querySelector("p")
    .textContent =
    message;


  aiChat.appendChild(
    messageDiv
  );


  aiChat.scrollTop =
    aiChat.scrollHeight;

}



/* Add User Message */

function addUserMessage(
  message
) {

  if (!aiChat) {
    return;
  }


  const messageDiv =
    document.createElement(
      "div"
    );


  messageDiv.className =
    "user-message";


  const paragraph =
    document.createElement(
      "p"
    );


  paragraph.textContent =
    message;


  messageDiv.appendChild(
    paragraph
  );


  aiChat.appendChild(
    messageDiv
  );


  aiChat.scrollTop =
    aiChat.scrollHeight;

}



/* Send AI Message */

async function sendAIMessage() {

  if (
    !aiInput ||
    !aiSendButton ||
    !aiChat
  ) {

    return;

  }


  const message =
    aiInput.value.trim();


  if (!message) {

    return;

  }


  /* Show user message */

  addUserMessage(
    message
  );


  /* Clear input */

  aiInput.value = "";


  /* Disable button */

  aiSendButton.disabled =
    true;


  aiSendButton.textContent =
    "Thinking...";


  try {

    const response =
      await fetch(
        "/api/chat",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              message: message
            })

        }
      );


    const data =
      await response.json();


    if (
      !response.ok
    ) {

      throw new Error(
        data.error ||
        "Something went wrong."
      );

    }


    /* IMPORTANT:
       Your API returns "answer",
       not "reply". */

    addAIMessage(
      data.answer ||
      "I couldn't generate a response."
    );


  } catch (error) {

    addAIMessage(
      "Sorry, I couldn't connect to Kollins AI right now. Please try again."
    );


    console.error(
      "AI Error:",
      error
    );

  }


  /* Enable button */

  aiSendButton.disabled =
    false;


  aiSendButton.textContent =
    "Send";

}



/* Send Button */

if (aiSendButton) {

  aiSendButton.addEventListener(
    "click",
    sendAIMessage
  );

}



/* Enter key for AI */

if (aiInput) {

  aiInput.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendAIMessage();

      }

    }
  );

}



/* =========================================
   CLEAR AI CHAT
========================================= */

if (
  aiClearButton &&
  aiChat
) {

  aiClearButton.addEventListener(
    "click",
    function () {

      aiChat.innerHTML = `

        <div class="ai-message">

          <strong>
            Kollins AI:
          </strong>

          <p>
            Hello! 👋 I'm Kollins AI.
            Ask me a question and I'll do my best
            to help you.
          </p>

        </div>

      `;

    }
  );

}
