import { useState } from "react";

export default function Form({ onGenerate }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [education, setEducation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ name, skills, projects, education });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ width: "100%", margin: "5px 0", padding: "10px" }}
      />
      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        required
        style={{ width: "100%", margin: "5px 0", padding: "10px" }}
      />
      <input
        type="text"
        placeholder="Projects"
        value={projects}
        onChange={(e) => setProjects(e.target.value)}
        required
        style={{ width: "100%", margin: "5px 0", padding: "10px" }}
      />
      <input
        type="text"
        placeholder="Education"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        required
        style={{ width: "100%", margin: "5px 0", padding: "10px" }}
      />
      <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
        Generate Resume
      </button>
    </form>
  );
}