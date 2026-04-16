const api_base = process.env.NEXT_PUBLIC_API_BASE ?? "http://host.docker.internal:3001/api";
// const api_base = process.env.NEXT_PUBLIC_API_BASE ?? "http://192.168.49.2:3001/api";
const API_BASE = `${api_base}/incidents`;

/* ==============================
   GET ALL INCIDENTS
============================== */
export async function fetchIncidents() {
  try {
    const response = await fetch(`${API_BASE}/get-table`);

    if (!response.ok) {
      throw new Error("Failed to fetch incidents");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching incidents:", error);
    throw error;
  }
}

/* ==============================
   CREATE INCIDENT
============================== */
export async function createIncident(incidentData) {
  const res = await fetch(`${API_BASE}/create-incident`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incidentData),
  });

  if (!res.ok) {
    throw new Error("Failed to create incident");
  }

  return res.json();
}

/* ==============================
   GET FORM SELECT DATA
============================== */
export async function fetchIncidentFormData() {
  try {
    const response = await fetch(`${API_BASE}/get-form-prep-data`);

    if (!response.ok) {
      throw new Error("Failed to fetch form data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
}

/* ==============================
   GET SINGLE INCIDENT
============================== */
export async function fetchIncidentData(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch incident");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching incident:", error);
    throw error;
  }
}

/* ==============================
   EDIT INCIDENT
============================== */
export async function editIncident(id, incidentData) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incidentData),
  });

  if (!res.ok) {
    throw new Error("Failed to update incident");
  }

  return res.json();
}

/* ==============================
   UPDATE INCIDENT STATUS
============================== */
export async function updateIncidentStatus(id, status) {
  try {
    const response = await fetch(`${API_BASE}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update incident status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating incident status:", error);
    throw error;
  }
}