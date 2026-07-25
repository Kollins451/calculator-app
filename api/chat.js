export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    // Check that the user sent a message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    // Check that the API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "AI API key is not configured."
      });
    }

    // Send the user's question to OpenAI
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "You are Kollins AI, a helpful AI assistant built into a calculator app. Answer the user's questions clearly and accurately. You can help with mathematics, science, technology, coding, general knowledge, and everyday questions. When explaining mathematics, show the steps clearly. Be friendly and concise."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // Handle an OpenAI API error
    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        error: data?.error?.message || "The AI service returned an error."
      });
    }

    // Get the AI's answer
    const answer =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, I couldn't generate an answer.";

    return res.status(200).json({
      answer
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong while connecting to Kollins AI."
    });
  }
}
