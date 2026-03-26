export default function ResumePreview({ content }) {
  if (!content) return <p>No resume generated yet.</p>;

  return (
    <div
      id="resume-preview"
      style={{
        whiteSpace: "pre-line",
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {content}
    </div>
  );
}