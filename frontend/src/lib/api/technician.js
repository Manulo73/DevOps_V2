// const api_base = process.env.NEXT_PUBLIC_API_BASE ?? "http://host.docker.internal:3001/api";
const api_base = process.env.NEXT_PUBLIC_API_BASE ?? "http://192.168.49.2:3001/api";
const API_BASE = `${api_base}/technician`;

/* ==============================
   GET ALL TECHNICIANS
============================== */
export async function fetchTechnicians() {
  try {
    const response = await fetch(`${API_BASE}/get-table`);

    if (!response.ok) {
      throw new Error("Failed to fetch technicians");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching technicians:", error);
    throw error;
  }
}

export async function fetchTechnicianFormData(params) {
  
}

export async function fetchTechnicianData(params) {
  
}

export async function createTechnician(params) {
  
}

export async function editTechnician(params) {
  
}