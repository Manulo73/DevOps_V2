const api_base = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE = `${api_base}/clients`;

/* ==============================
   GET ALL CLIENTS
============================== */
export async function fetchClients() {
  try {
    const response = await fetch(`${API_BASE}/get-table`);

    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}