import ReactMarkdown from "react-markdown";

export default function ResumePreview({ content }) {
  return (
    <div id="resume">
      <h2>Generated Resume</h2>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}