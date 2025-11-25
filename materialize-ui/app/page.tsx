import NavBar from "./components/NavBar";

export default function HomePage() {
  return (
    <div>
      <div style={{ padding: "30px" }}>
        <h1>Materialize Platform</h1>
        <p style={{ color: "#A8A8A8", maxWidth: "600px" }}>
          Track & verify the origin of every fabricated product using
          OriginTrail Decentralized Knowledge Graph and GS1 identifiers.
        </p>

        <div style={{ display: "flex", gap: "20px", marginTop: "25px" }}>
          <a href="/publish" className="materialize-btn">Publish + QR</a>
          <a href="/verify" className="materialize-btn">Verify Product</a>
        </div>
      </div>
    </div>
  );
}
