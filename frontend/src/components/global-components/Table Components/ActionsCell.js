import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Added for refreshing the table

import { StatusModal } from "./StatusModal";
import { deleteTechnician } from "@/lib/api/technician"; // Import the delete function
import styles from "./ActionsCell.module.css";

export const ActionsCell = ({ row, type }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const id = row.original.public_id;
  const isIncident = type === "incidents";

  let word = "";
  switch (type) {
    case "incidents": word = "Incidente"; break;
    case "client": word = "Cliente"; break;
    case "technician": word = "Técnico"; break;
  }

  /* =============================
      DELETE HANDLER
  ============================= */
  const handleDelete = async () => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar este ${word}? Esta acción no se puede deshacer.`);
    
    if (!confirmed) return;

    try {
      if (type === "technician") {
        await deleteTechnician(id);
        alert(`${word} eliminado correctamente.`);
        setOpen(false);
        router.refresh(); // This refreshes the Server Component (page.js) to show updated data
      } else {
        console.log(`Eliminación para ${type} no implementada aún.`);
      }
    } catch (error) {
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  return (
    <div className={styles.btn}>
      <button onClick={() => setOpen(!open)}>
        <Image src="/icon/edit-3.svg" alt="Opciones" width={20} height={20} />
      </button>

      {open && (
        <div className={styles.dropdown_menu}>
          <Link className={styles.link} href={`/${type}/${id}`}>
            <div className={styles.cell}>Editar {word}</div>
          </Link>

          {isIncident && (
            <div
              className={styles.cell}
              onClick={() => {
                setShowModal(true);
                setOpen(false);
              }}
            >
              Cambiar estado
            </div>
          )}

          {!isIncident && (
            <div className={styles.cell} onClick={handleDelete}>
              Eliminar {word}
            </div>
          )}
        </div>
      )}

      {isIncident && showModal && (
        <StatusModal
          incidentId={id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};