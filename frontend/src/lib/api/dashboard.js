const api_base = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE = `${api_base}/dashboard`;

/* =============================
   Top Incidents
============================= */
export async function fetchTopIncidents() {
  try {
    const response = await fetch(`${API_BASE}/get-top-incidents`);

    if (!response.ok) {
      throw new Error("Failed to fetch incidents");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching incidents:", error);
    throw error;
  }
}

/* =============================
   Unassigned Incidents
============================= */
export async function fetchTopUnassignedIncidents() {
  try {
    const response = await fetch(`${API_BASE}/get-top-unassigned-incidents`);

    if (!response.ok) {
      throw new Error("Failed to fetch unassigned incidents");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching unassigned incidents:", error);
    throw error;
  }
}

/* =============================
   Recently Resolved Incidents
============================= */
export async function fetchRecentDoneIncidents() {
  try {
    const response = await fetch(`${API_BASE}/get-recent-done-incidents`);

    if (!response.ok) {
      throw new Error("Failed to fetch resolved incidents");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching resolved incidents:", error);
    throw error;
  }
}