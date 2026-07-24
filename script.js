const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

function calculate() {
  try {
    let expression = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    display.value = eval(expression);
    currentInput = display.value;
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}

// Button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    }

    else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    }

    else if (value === "=") {
      calculate();
    }

    else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    (key >= "0" && key <= "9") ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "."
  ) {
    let value = key
      .replace("*", "×")
      .replace("/", "÷")
      .replace("-", "−");

    currentInput += value;
    display.value = currentInput;
  }

  else if (key === "Enter") {
    calculate();
  }

  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }

  else if (key === "Escape") {
    currentInput = "";
    display.value = "";
  }
});