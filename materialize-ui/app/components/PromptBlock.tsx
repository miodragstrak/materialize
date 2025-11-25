"use client";

import { useState } from "react";

type PromptBlockProps = {
  title?: string;
  onGenerate: () => string;
};

export default function PromptBlock({ title, onGenerate }: PromptBlockProps) {
  const [prompt, setPrompt] = useState<string>("");

  const handleGenerate = () => {
    const p = onGenerate();
    setPrompt(p);
  };

  return (
    <div className="card" style={{ marginTop: "24px" }}>
      <h2>{title}</h2>

      <button onClick={handleGenerate}>Generate Prompt</button>

      <textarea
        value={prompt}
        readOnly
        style={{
          width: "100%",
          height: "180px",
          marginTop: "12px",
          padding: "12px",
          borderRadius: "8px",
          background: "var(--panel)",
          color: "var(--text)",
          border: "1px solid var(--border)",
        }}
      />

      <button
        onClick={() => {
          navigator.clipboard.writeText(prompt);
        }}
        style={{ marginTop: "12px", width: "200px" }}
      >
        Copy Prompt
      </button>
    </div>
  );
}
