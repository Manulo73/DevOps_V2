import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { StatusModal } from "./StatusModal";
import styles from "./ActionsCell.module.css";

export const ActionsCell = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const incidentId = row.original.public_id;

  return (
    <div className={styles.btn}>
      {/* Button (same icon) */}
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
          {/* Go to edit page */}
          <Link className={styles.link} href={`/incidents/${incidentId}`}>
            <div className={styles.cell}>
              Editar incidente
            </div>
          </Link>

          {/* Open modal */}
          <div
            className={styles.cell}
            onClick={() => {
              setShowModal(true);
              setOpen(false);
            }}
          >
            Cambiar estado
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <StatusModal
          incidentId={incidentId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};