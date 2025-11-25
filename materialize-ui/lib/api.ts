const API = "http://localhost:9200";

export async function publishPoM(data: any) {
  const response = await fetch(`${API}/mtrlz/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updatePoM(data: any) {
  const response = await fetch(`${API}/mtrlz/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function verifyPoM(data: any) {
  const response = await fetch(`${API}/mtrlz/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
