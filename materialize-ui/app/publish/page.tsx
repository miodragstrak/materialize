"use client";

import { useState } from "react";
import { publishPoM } from "@/lib/api";
import MaterializeFrame from "../components/MaterializeFrame";
import PromptBlock from "../components/PromptBlock";
import DkgAgentEmbed from "../components/DkgAgentEmbed";
import QRCode from "react-qr-code";

export default function PublishPage() {
  const [productId, setProductId] = useState("");
  const [originLocation, setOriginLocation] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [ual, setUal] = useState("");

  async function handlePublish() {
    const res = await publishPoM({ productId, originLocation });
    setUal(res.ual || "");
  }

  return (
    <MaterializeFrame>
      <h1 className="page-title">Publish + Create QR</h1>

      <div className="two-column">
        {/* RIGHT — Create PoM */}
        <div className="card">
          <h2>Create Proof-of-Make</h2>

          <input placeholder="SGTIN…" value={productId} onChange={(e) => setProductId(e.target.value)} />
          <input placeholder="Origin Location…" value={originLocation} onChange={(e) => setOriginLocation(e.target.value)} />
          <input placeholder="Timestamp…" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />

        </div>

        {/* LEFT — QR Generator */}
        <div className="card">
          <h2>Generate QR Code</h2>

          <input placeholder="Paste UAL…" value={ual} onChange={(e) => setUal(e.target.value)} />

          {ual && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <QRCode value={ual} size={200} />
              <button
                style={{ marginTop: "20px" }}
                onClick={() => {
                  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
                  const url = canvas.toDataURL("image/png");
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${productId || "pom"}.png`;
                  a.click();
                }}
              >
                Download QR
              </button>
            </div>
          )}
        </div>
      </div>
      <PromptBlock
  title="Manufacturing KA Prompt"
  onGenerate={() => {
    return (
    `Create a new Knowledge Asset of type MaterializePoMManufacture.

    Use the following data:
    - productId: ${productId}
    - manufacturer: "Materialize CNC Workshop"
    - manufactureLocation:
        name: "${originLocation}"
    - manufactureTimestamp: "${timestamp}"

    This is the first version, so do NOT include a previous field.

    JSON-LD:

   {
     "@context": "https://schema.org",
     "@type": "MaterializePoMManufacture",
     "@id": "urn:mat:product:${productId}:v1",
     "name": "DKG Demo Product",
     "manufacturer": "Materialize CNC Workshop",


     "originLocation": {
       "name": "${originLocation}"
     },
     "manufactureTimestamp": "${timestamp}",
     "description": "Initial Proof-of-Make asset for product ${productId}."
   }

    Publish PUBLIC.
    Return only the UAL.`
        );
      }}
    />

    <DkgAgentEmbed />

    </MaterializeFrame>
    
  );
}
