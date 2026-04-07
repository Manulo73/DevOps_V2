"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Technician.module.css";

import {
  createTechnician,
  editTechnician,
} from "@/lib/api/technician";

import { validateRequired } from "@/lib/common/formFunctions";

export default function TechnicianForm({ data }) {

  const formRef = useRef(null);
  const router = useRouter();

  const requiredFields = [
    "full_name",
    "email",
  ];

  const getFormValues = () => {
    if (!formRef.current) return {};

    const e = formRef.current.elements;

    return {
      full_name: e.namedItem("full_name")?.value.trim(),
      email: e.namedItem("email")?.value.trim(),
      is_active: e.namedItem("is_active")?.value === "true",
    };
  };

  /* =============================
     CREATE
  ============================= */
  const handleCreate = async () => {
    const technicianData = getFormValues();

    const { ok, missing } = validateRequired(
      technicianData,
      requiredFields
    );

    if (!ok) {
      alert(`Falta el campo obligatorio: ${missing}`);
      return;
    }

    await createTechnician(technicianData);

    alert("Técnico creado correctamente");
    router.push("/technicians");
  };

  /* =============================
     UPDATE
  ============================= */
  const handleUpdate = async () => {
    const technicianData = getFormValues();

    const hasChanges = Object.keys(technicianData).some(key => {
      return (technicianData[key] ?? "") !== (data[key] ?? "");
    });

    if (!hasChanges) {
      alert("No se detectaron cambios en el formulario.");
      return;
    }

    const { ok, missing } = validateRequired(
      technicianData,
      requiredFields
    );

    if (!ok) {
      alert(`Falta el campo obligatorio: ${missing}`);
      return;
    }

    await editTechnician(data.public_id, technicianData);

    alert("Técnico actualizado correctamente");
    router.push("/technicians");
  };

  return (
    <div className={styles.global_form}>
      <form ref={formRef} className={styles.form}>

        {/* Full Name */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Nombre completo</legend>
            <input
              name="full_name"
              type="text"
              defaultValue={data?.full_name ?? ""}
              placeholder="Ej. Juan Pérez"
            />
          </fieldset>
        </div>

        {/* Email */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Correo</legend>
            <input
              name="email"
              type="email"
              defaultValue={data?.email ?? ""}
              placeholder="ejemplo@correo.com"
            />
          </fieldset>
        </div>

        {/* Active */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Estado</legend>
            <select
              name="is_active"
              defaultValue={
                data?.is_active === false ? "false" : "true"
              }
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </fieldset>
        </div>

      </form>

      <div className={styles.btn_container}>
        <button
          className={styles.create_btn}
          type="button"
          onClick={data ? handleUpdate : handleCreate}
        >
          <h4>{data ? "Actualizar" : "Crear Técnico"}</h4>
        </button>
      </div>
    </div>
  );
}