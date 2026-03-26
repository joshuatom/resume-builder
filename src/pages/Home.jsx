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

    const res = await fetch("/api/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await res.json();

    setResume(result.text);
    setLoading(false);
  };

  return (
    <div>
      <h1>AI Resume Builder</h1>

      <Form onGenerate={handleGenerate} />

      {loading ? <Loader /> : <ResumePreview content={resume} />}
    </div>
  );
}