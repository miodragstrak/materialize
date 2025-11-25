"use client";

import { useState } from "react";
import MaterializeFrame from "../components/MaterializeFrame";
import DkgAgentEmbed from "../components/DkgAgentEmbed";
import extractQRFromImage from "../components/utils/extractQRFromImage";

export default function VerifyPage() {
  const [ual, setUal] = useState("");
  const [claimedLocation, setClaimedLocation] = useState("");
  const [verifyPrompt, setVerifyPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleUploadImage(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ualFromQR = await extractQRFromImage(file);

    if (ualFromQR) setUal(ualFromQR);
    else alert("No QR code detected.");
  }

  function generateVerifyPrompt() {
    if (!ual || !claimedLocation) {
      alert("UAL and Claimed Location are required.");
      return;
    }

    const timestamp = new Date().toISOString();

    const prompt = `
You are the DKG Agent performing authenticity verification.

STEP 1 — Retrieve installation KA:
Fetch the Knowledge Asset with UAL:
  ${ual}
Extract field:
  installationLocation
Call this value: VERIFIED_LOCATION
Identify the @id of the KA containing this value and call it PREVIOUS_KA.

STEP 2 — Compare installationLocation vs claimed location:
claimedLocation: "${claimedLocation}"
verifiedLocation: VERIFIED_LOCATION

authentic = true  IF claimedLocation === VERIFIED_LOCATION  
authentic = false IF different

STEP 3 — Create NEW Verification KA:

{
  "@context": "http://schema.org/",
  "@id": "urn:verification:${ual}:attempt:${timestamp}",
  "@type": "VerificationEvent",
  "ualChecked": "${ual}",
  "claimedLocation": "${claimedLocation}",
  "verifiedLocation": "VERIFIED_LOCATION",
  "authentic": "<true_or_false>",
  "timestamp": "${timestamp}",
  "description": "Verification attempt for installed Materialize-manufactured part.",
  "previous": {
    "@id": "PREVIOUS_KA"
  }
}

STEP 4 — Publish the Verification KA to the DKG.
Return:
authenticity result (true/false)
verifiedLocation
full KA JSON
new published UAL for this verification
    `.trim();

    setVerifyPrompt(prompt);
    setCopied(false);
  }

  function copyPrompt() {
    navigator.clipboard.writeText(verifyPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <MaterializeFrame>
      <h1 className="page-title">Materialize — Verify Product Authenticity</h1>

      {/* 2-column layout */}
      <div className="two-column">
        
        {/* LEFT — QR Upload */}
        <div className="card">
          <h2>Upload QR Code</h2>
          <p>Extract the UAL from the QR image.</p>

          <input type="file" accept="image/*" onChange={handleUploadImage} />

          <input
            placeholder="UAL will appear here…"
            value={ual}
            onChange={(e) => setUal(e.target.value)}
          />
        </div>

        {/* RIGHT — Claimed Location */}
        <div className="card">
          <h2>Claimed Location</h2>

          <input
            placeholder="Where the part is CLAIMED to be installed"
            value={claimedLocation}
            onChange={(e) => setClaimedLocation(e.target.value)}
          />

          <button onClick={generateVerifyPrompt}>Generate Verify Prompt</button>
        </div>
      </div>

      {/* Prompt Output */}
      <div className="card" style={{ marginTop: "32px" }}>
        <h2>Verification Prompt for DKG Agent</h2>

        <textarea
          value={verifyPrompt}
          readOnly
          style={{
            width: "100%",
            height: "240px",
            padding: "12px",
            background: "var(--card-bg)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        ></textarea>

        <button
          onClick={copyPrompt}
          style={{
            marginTop: "12px",
            background: copied ? "#7CFC00" : "var(--accent)",
          }}
        >
          {copied ? "Copied!" : "Copy Prompt"}
        </button>
      </div>

      {/* Embedded DKG Agent */}
      <DkgAgentEmbed />
    </MaterializeFrame>
  );
}