export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await fetch("https://api.groq.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "groq-text-1", // use your Groq model
        prompt,
        max_output_tokens: 500, // adjust as needed
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Groq API error:", text);
      return res.status(500).json({ error: "Groq API failed" });
    }

    const data = await response.json();
    const text = data.output?.[0]?.content || ""; // structure depends on Groq API

    res.status(200).json({ text });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to generate resume" });
  }
}