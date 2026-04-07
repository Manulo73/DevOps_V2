import {
  fetchIncidentFormData,
  fetchIncidentData,
} from "@/lib/api/incident";

import {
  fetchTechnicianFormData,
  fetchTechnicianData,
} from "@/lib/api/technician";

import IncidentForm from "../incidents/IncidentForm";
import TechnicianForm from "../technician/TechnicianForm";

export default async function GlobalForm({ type, id }) {

  // =============================
  // INCIDENTS
  // =============================
  if (type === "incidents") {
    const form_data = await fetchIncidentFormData();

    if (id) {
      const data = await fetchIncidentData(id);
      return (
        <IncidentForm form_data={form_data} data={data} />
      );
    }

    return <IncidentForm form_data={form_data} />;
  }

  // =============================
  // TECHNICIANS
  // =============================
  if (type === "technician") {
    const form_data = await fetchTechnicianFormData();

    if (id) {
      const data = await fetchTechnicianData(id);
      return (
        <TechnicianForm form_data={form_data} data={data} />
      );
    }

    return <TechnicianForm form_data={form_data} />;
  }

  return null;
}