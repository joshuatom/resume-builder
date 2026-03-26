export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // 🔥 Best model
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer who creates ATS-friendly resumes.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || "Groq API error",
      });
    }

    // Send result back
    return res.status(200).json({
      text: data.choices[0].message.content,
    });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}