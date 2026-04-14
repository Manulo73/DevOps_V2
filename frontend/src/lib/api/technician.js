const api_base = process.env.NEXT_PUBLIC_API_BASE ?? "http://192.168.49.2:3001/api";
const API_BASE = `${api_base}/technician`;

/* ==============================
    GET ALL TECHNICIANS
============================== */
export async function fetchTechnicians() {
  try {
    const response = await fetch(`${API_BASE}/get-table`);
    if (!response.ok) throw new Error("Failed to fetch technicians");
    return await response.json();
  } catch (error) {
    console.error("Error fetching technicians:", error);
    throw error;
  }
}

/* ==============================
    GET SINGLE TECHNICIAN (For Editing)
============================== */
export async function fetchTechnicianData(public_id) {
  try {
    const response = await fetch(`${API_BASE}/${public_id}`);
    if (!response.ok) throw new Error("Failed to fetch technician data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching technician:", error);
    throw error;
  }
}

/* ==============================
    CREATE TECHNICIAN
============================== */
export async function createTechnician(technicianData) {
  try {
    const response = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...technicianData,
        role: "technician", // Hardcoded since this is the technician service
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create technician");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating technician:", error);
    throw error;
  }
}

/* ==============================
    EDIT TECHNICIAN
============================== */
export async function editTechnician(public_id, technicianData) {
  try {
    const response = await fetch(`${API_BASE}/update/${public_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(technicianData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update technician");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating technician:", error);
    throw error;
  }
}

/* ==============================
    DELETE TECHNICIAN
============================== */
export async function deleteTechnician(public_id) {
  try {
    const response = await fetch(`${API_BASE}/delete/${public_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete technician");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting technician:", error);
    throw error;
  }
}