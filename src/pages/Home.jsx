import { useState } from "react";
import Form from "../components/Form";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";

export default function Home() {
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (data) => {
    setLoading(true);

    const prompt = `
Create a professional ATS resume:

Name: ${data.name}
Skills: ${data.skills}
Projects: ${data.projects}
Education: ${data.education}
`;

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("API request failed");

      const result = await res.json();
      console.log("API result:", result);

      // Make sure to get the text from result
      setResume(result.text || "No content returned from AI.");
    } catch (err) {
      console.error("Error generating resume:", err);
      setResume("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>AI Resume Builder</h1>
      <Form onGenerate={handleGenerate} />
      {loading ? <Loader /> : <ResumePreview content={resume} />}
    </div>
  );
}