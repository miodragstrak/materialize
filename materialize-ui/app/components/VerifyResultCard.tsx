
export default function VerifyResultCard({ status }: { status: "valid" | "fake" }) {
  return (
    <div className={`verify-card ${status}`}>
      <h2>{status === "valid" ? "✔ Authentic Product" : "✖ Fake Product"}</h2>
      <p>
        {status === "valid"
          ? "The product's recorded location matches your current location."
          : "The product's recorded location does NOT match your current location."}
      </p>
    </div>
  );
}
