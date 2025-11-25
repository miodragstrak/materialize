# 🟣 Materialize – Decentralized Manufacturing (DeMan) on the OriginTrail DKG
### Fighting Fake Fabrication with AI + Blockchain + Verified Machines

Materialize is a decentralized manufacturing layer that connects digital assets  
(NFTs, 3D models, licenses) with **real-world production**,  
verified and logged on the **OriginTrail Decentralized Knowledge Graph (DKG)**.

We demonstrate how the DKG’s **Agent Layer → Knowledge Layer → Trust Layer**  
can be used to verify the fabrication of a physical object,  
creating “Proof-of-Make” — a new trust primitive for manufacturing.

This repository contains:
- A fork of the DKG Edge Node (with added manufacturing schema)
- A functional UI for selecting NFTs and triggering fabrication
- A working AI Fabrication Agent using MCP
- JSON-LD structured proofs
- Full architecture documentation
- Submission video (5 minutes)
- Demo CNC implementation (“Reverse RWA → Physical Pendant”)

---

# 🌍 1. Problem & Motivation

Modern manufacturing suffers from:

### ❌ Counterfeiting  
Fake industrial components cost global manufacturers **hundreds of billions** yearly  
and compromise safety and reliability.

### ❌ Broken supply chains  
Spare parts arrive late, cost more to ship than to produce locally,  
and are frequently unavailable when needed.

### ❌ Zero transparency  
Consumers and manufacturers cannot trust where objects come from  
or whether the part was produced according to the design.

### ❌ Idle machines  
Millions of 3D printers, CNC machines, and engravers sit under-utilized globally.

### ❌ No unified protocol for machine-verified manufacturing  
There is no standardized way for machines to produce verifiable outputs.

---

# 🟪 2. What Materialize Does

Materialize ties **digital ownership** to **verified physical creation**.

### ✔ Digital asset (e.g., NFT)  
→ becomes a **manufacturing blueprint**

### ✔ Machine produces object  
→ and generates a **machine log**

### ✔ AI Agent builds JSON-LD  
→ and writes **Proof of Make** to the DKG

### ✔ DKG Trust Layer anchors  
→ to Polkadot/NeuroWeb for global verifiability

The result:  
**A real-world object with a verifiable, tamper-proof origin.**

---

# 🏗 3. System Architecture

Materialize uses all 3 layers of the OriginTrail stack.

## **A. Agent Layer (MCP)**
The Fabrication Agent performs:
- NFT metadata retrieval
- Maker (machine) selection
- Manufacturing param generation
- Machine log verification
- Publishing to DKG

📄 Documentation: [`architecture/mcp-agent.md`](architecture/mcp-agent.md)

---

## **B. Knowledge Layer (DKG + JSON-LD)**

📄 Example JSON-LD files: [`examples/`](examples/)

---

## **C. Trust Layer (NeuroWeb / Polkadot)**
The DKG anchors:
- hash of fabrication record  
- hash of machine log  
- timestamp  
into the Polkadot/NeuroWeb network.

📄 Documentation: [`architecture/trust-layer.md`](architecture/trust-layer.md)

---

# 🧱 4. Repository Structure

```
materialize-dkg/
│
├── my_dkg_node/
│   └── dkg-node/               ← forked DKG node (custom schema)
│
├── ui/                         ← Materialize UI (NFT → Maker → Object)
│
├── agents/
│   ├── fabrication-agent.js    ← MCP agent logic
│   └── prompts/
│
├── examples/                   ← JSON-LD fabrications
│
├── architecture/               ← diagrams and docs
│
├── tokenomics/                 ← early protocol economics
│
└── video/                      ← demo video (≤ 5 minutes)
```

---

# 🧩 5. Setup Instructions

## **A. DKG Node**

### Install dependencies:

```
cd my_dkg_node/dkg-node
npm install
```

### Run development node:

```
npm run dev
```

### Start local DKG:

```
npm start
```

This instance includes our **Proof of Make** schema.

---

## **B. Fabrication Agent (MCP)**

### Install:

```
cd agents
npm install
```

### Run agent:

```
node fabrication-agent.js
```

The agent communicates with:
- UI  
- CNC simulator  
- DKG node  

---

## **C. Materialize UI**

### Install:

```
cd ui
npm install
```

### Start:

```
npm run dev
```

---

# 🛠 6. Demo Instructions

### 1. Start DKG node  
(in `my_dkg_node/dkg-node/`)

```
npm start
```

### 2. Start Agent  
(in `agents/`)

```
node fabrication-agent.js
```

### 3. Start UI  
(in `ui/`)

```
npm run dev
```

### 4. Open browser:  
`http://localhost:3000`

### 5. Select an NFT

### 6. Click **Materialize**

### 7. CNC engraves the pendant  
(physical machine or simulation)

### 8. Agent collects machine logs

### 9. Agent publishes JSON-LD  
to local DKG node

### 10. UI displays verifiable DKG URI

---

# 🧾 7. JSON-LD Structured Examples

Examples included:

- `proof-of-make.jsonld`  
- `machine-log.json`  
- `nft-metadata.json`

All located in:  
📁 [`/examples`](examples/)

---

# 🔗 8. x402 Integration (Optional)

Not fully implemented in this prototype,  
but the documentation explains how x402 can be added  
for cross-domain interoperability between manufacturing proofs.

📄 See `architecture/x402.md`

---

# 📊 9. Early Tokenomics (Optional)

Located in:  
📁 `tokenomics/`

Covers:
- Maker node earning model  
- Proof-of-Make transaction fees  
- License royalties  
- Token incentives for DePIN participation  

---

# 👤 10. Team

**Nenad Dimitrovski** — CNC / Open Source Engineer  
**Miodrag Strak** — Product, Strategy & Architecture

---

# 🎥 11. Submission Video  
(found in: `/video/demo.mp4`)

---

# 🔥 12. Summary

Decentralized manufacturing.
Verifiable production.
Fighting Fake Fabrication.

