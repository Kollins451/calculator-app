/* =========================================
   KOLLINS AI
========================================= */

const aiInput = document.getElementById("ai-input");
const aiSendButton = document.getElementById("ai-send");
const aiMessages = document.getElementById("ai-messages");


function addAIMessage(message, sender) {

  if (!aiMessages) {
    return;
  }

  const messageElement =
    document.createElement("div");

  messageElement.className =
    `ai-message ${sender}`;

  messageElement.textContent =
    message;

  aiMessages.appendChild(
    messageElement
  );

  aiMessages.scrollTop =
    aiMessages.scrollHeight;
}


async function sendAIMessage() {

  if (!aiInput) {
    return;
  }

  const message =
    aiInput.value.trim();

  if (!message) {
    return;
  }


  /* Show user's message */

  addAIMessage(
    message,
    "user"
  );


  /* Clear input */

  aiInput.value = "";


  /* Show loading message */

  addAIMessage(
    "Kollins AI is thinking...",
    "ai"
  );


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

          body: JSON.stringify({
            message: message
          })
        }
      );


    const data =
      await response.json();


    /* Remove loading message */

    const messages =
      aiMessages.querySelectorAll(
        ".ai-message.ai"
      );

    const lastMessage =
      messages[messages.length - 1];


    if (lastMessage &&
        lastMessage.textContent ===
        "Kollins AI is thinking...") {

      lastMessage.remove();

    }


    /* Display AI response */

    if (!response.ok) {

      addAIMessage(
        data.error ||
        "Sorry, something went wrong.",
        "ai"
      );

      return;

    }


    addAIMessage(
      data.answer ||
      "Sorry, I couldn't generate a response.",
      "ai"
    );


  } catch (error) {

    console.error(
      "Kollins AI Error:",
      error
    );


    /* Remove loading message */

    const messages =
      aiMessages.querySelectorAll(
        ".ai-message.ai"
      );

    const lastMessage =
      messages[messages.length - 1];


    if (lastMessage &&
        lastMessage.textContent ===
        "Kollins AI is thinking...") {

      lastMessage.remove();

    }


    addAIMessage(
      "Unable to connect to Kollins AI. Please check your internet connection and try again.",
      "ai"
    );

  }

}


/* AI Send Button */

if (aiSendButton) {

  aiSendButton.addEventListener(
    "click",
    sendAIMessage
  );

}


/* AI Enter Key */

if (aiInput) {

  aiInput.addEventListener(
    "keydown",
    event => {

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
