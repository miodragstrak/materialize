"use client";

import { useState, ChangeEvent } from "react";
import MaterializeFrame from "../components/MaterializeFrame";
import { extractQRFromImage } from "../components/utils/extractQRFromImage";
import { verifyPoM } from "@/lib/api";
import VerifyResultCard from "../components/VerifyResultCard";

export default function QRPage() {
  const [ual, setUal] = useState("");
  const [claimedLocation, setClaimedLocation] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const qr = await extractQRFromImage(file);
    if (qr) setUal(qr);
  }

  async function handleVerify() {
    const data = await verifyPoM({ ual, claimedLocation });
    setResult(data);
  }

  return (
    <MaterializeFrame>
      <h1 className="page-title">Materialize — Scan QR</h1>

      <div className="two-column">
        {/* LEFT — Upload */}
        <div className="card">
          <h2>Upload or Scan QR</h2>

          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <input placeholder="Or paste UAL…" value={ual} onChange={(e) => setUal(e.target.value)} />
        </div>

        {/* RIGHT — Validation */}
        <div className="card">
          <h2>Verify Location</h2>

          <input
            placeholder="Claimed Location…"
            value={claimedLocation}
            onChange={(e) => setClaimedLocation(e.target.value)}
          />

          <button onClick={handleVerify}>Verify</button>

          {result && (
            <VerifyResultCard
              status={(result && (result.status ?? result.result ?? result)) as "valid" | "fake"}
            />
          )}
        </div>
      </div>
    </MaterializeFrame>
  );
}
