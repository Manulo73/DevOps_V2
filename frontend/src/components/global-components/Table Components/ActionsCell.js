import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { StatusModal } from "./StatusModal";
import styles from "./ActionsCell.module.css";

export const ActionsCell = ({ row, type }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const id = row.original.public_id;
  const isIncident = type === "incidents";

  let word = "";

  switch ( type ) {
    case "incidents": 
        word = "Incidente"
        break;
    case "client": 
        word = "Cliente"
        break;
    case "technician": 
        word = "Técnico"
        break;
  }

  return (
    <div className={styles.btn}>
      {/* Button */}
      <button onClick={() => setOpen(!open)}>
        <Image
          src="/icon/edit-3.svg"
          alt="Opciones"
          width={20}
          height={20}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className={styles.dropdown_menu}>
          {/* Edit */}
          <Link className={styles.link} href={`/${type}/${id}`}>
            <div className={styles.cell}>
              Editar {word}
            </div>
          </Link>

          {/* ONLY for incidents */}
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

          {/* ONLY for clients & technicians */}
          {!isIncident && (
            <div
              className={styles.cell}
              onClick={() => {
                console.log(`Eliminar ${word}`, id);
                setOpen(false);
              }}
            >
              Eliminar {word}
            </div>
          )}
        </div>
      )}

      {/* Modal ONLY for incidents */}
      {isIncident && showModal && (
        <StatusModal
          incidentId={id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};