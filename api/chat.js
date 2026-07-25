export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    // Get the user's message
    const { message } = req.body || {};

    // Make sure a message was provided
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    // Check that the OpenAI API key exists
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing.");

      return res.status(500).json({
        error: "OpenAI API key is not configured on the server."
      });
    }

    // Send the request to OpenAI
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model: "gpt-4o-mini",

          instructions:
            "You are Kollins AI, a helpful AI assistant built into the Kollins Calculator app. Answer questions clearly and accurately. You can help with mathematics, science, technology, coding, general knowledge, writing, and everyday questions. When explaining mathematics, show the steps clearly. Be friendly, helpful, and concise.",

          input: message
        })
      }
    );

    // Convert OpenAI's response to JSON
    const data = await openAIResponse.json();

    // If OpenAI returned an error
    if (!openAIResponse.ok) {
      console.error(
        "OpenAI API error:",
        JSON.stringify(data, null, 2)
      );

      return res.status(openAIResponse.status).json({
        error:
          data?.error?.message ||
          "OpenAI returned an error."
      });
    }

    // Get the generated AI response
    const answer =
      data?.output_text ||
      data?.output
        ?.flatMap(item => item.content || [])
        ?.find(item => item.type === "output_text")
        ?.text;

    // Make sure we actually received an answer
    if (!answer) {
      console.error(
        "No answer found in OpenAI response:",
        JSON.stringify(data, null, 2)
      );

      return res.status(500).json({
        error: "OpenAI did not return a valid response."
      });
    }

    // Send the AI answer back to your website
    return res.status(200).json({
      reply: answer
    });

  } catch (error) {
    console.error(
      "Kollins AI backend error:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong while connecting to Kollins AI."
    });
  }
}
