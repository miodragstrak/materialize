"use client";

import { useState } from "react";
import MaterializeFrame from "../components/MaterializeFrame";
import DkgAgentEmbed from "../components/DkgAgentEmbed";
import extractQRFromImage from "../components/utils/extractQRFromImage";

export default function VerifyPage() {
  const [ual, setUal] = useState("");
  const [claimedLocation, setClaimedLocation] = useState("");
  const [verifyPrompt, setVerifyPrompt] = useState("");

  async function handleUploadImage(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ualFromQR = await extractQRFromImage(file);

    if (ualFromQR) {
      setUal(ualFromQR);
    } else {
      alert("No QR code detected in the image.");
    }
  }

  function generateVerifyPrompt() {
    if (!ual || !claimedLocation) {
      alert("UAL and Claimed Location are required.");
      return;
    }

    const prompt = `
You are the DKG Agent validating Authenticity.
Retrieve the Knowledge Asset with this UAL:

UAL: ${ual}

From the KA, extract the property:
"installationLocation"

Then generate a NEW KA:

### Verification KA Schema ###
{
  "@context": "http://schema.org/",
  "@id": "urn:verification:${ual}:attempt:${Date.now()}",
  "@type": "VerificationEvent",
  "ualChecked": "${ual}",
  "claimedLocation": "${claimedLocation}",
  "verifiedLocation": "<VALUE FROM DKG>",
  "authentic": "<true | false>",
  "description": "Verification attempt for installed part.",
  "previous": { "@id": "<the KA that contains installationLocation>" }
}

Rules:
authentic = true ONLY if claimedLocation == verifiedLocation
If different → fake attempt detected
Return the full generated KA for publishing`;

    setVerifyPrompt(prompt);
  }

  return (
    <MaterializeFrame>
      <h1 className="page-title">Materialize — Verify Product</h1>

      {/* 2-column layout */}
      <div className="two-column">
        {/* LEFT SIDE: QR Upload */}
        <div className="card">
          <h2>Upload QR Code</h2>
          <p>Extract UAL from QR image</p>

          <input type="file" accept="image/*" onChange={handleUploadImage} />

          <input
            placeholder="UAL will appear here…"
            value={ual}
            onChange={(e) => setUal(e.target.value)}
          />
        </div>

        {/* RIGHT SIDE: Claimed Location */}
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
            height: "200px",
            padding: "12px",
            background: "var(--card-bg)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        ></textarea>
      </div>

      {/* DKG Agent embed */}
      <DkgAgentEmbed />
    </MaterializeFrame>
  );
}