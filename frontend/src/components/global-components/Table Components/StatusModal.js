import { updateIncidentStatus } from "@/lib/api/incident";
import { useState } from "react";

import styles from "./StatusModal.module.css";

export const StatusModal = ({ incidentId, onClose }) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (status == "") alert("Selecciona un estado");

    try {
      const updatedIncident = await updateIncidentStatus(
        incidentId,
        status
      );

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title_div}>
          <h3>Cambiar estado del incidente:</h3>
          <h3 className={styles.incident_id}>#{incidentId}</h3>
        </div>

        <select
          value={status}
          className={styles.select_status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Selecciona estado</option>
          <option value="open">Abierto</option>
          <option value="in_progress">En progreso</option>
          <option value="resolved">Resuelto</option>
          <option value="closed">Cerrado</option>
        </select>

        <div className={styles.btns}>
          <button className={styles.btn_save} onClick={handleSubmit}>Guardar</button>
          <button className={styles.btn_cancel} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};