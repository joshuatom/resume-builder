import { useState } from "react";

export default function Form({ onGenerate }) {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    projects: "",
    education: "",
  });

  return (
    <div>
      <input placeholder="Name" onChange={(e)=>setForm({...form, name:e.target.value})}/>
      <textarea placeholder="Skills" onChange={(e)=>setForm({...form, skills:e.target.value})}/>
      <textarea placeholder="Projects" onChange={(e)=>setForm({...form, projects:e.target.value})}/>
      <textarea placeholder="Education" onChange={(e)=>setForm({...form, education:e.target.value})}/>

      <button onClick={()=>onGenerate(form)}>
        Generate Resume
      </button>
    </div>
  );
}