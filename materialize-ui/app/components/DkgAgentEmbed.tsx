export default function DkgAgentEmbed() {
  return (
    <div className="card" style={{ marginTop: "32px" }}>
      <h2>DKG Agent</h2>

      <div
        style={{
          width: "100%",
          height: "550px",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          marginTop: "16px",
        }}
      >
        <iframe
          src="http://localhost:9200/chat"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
