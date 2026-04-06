"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./IncidentForm.module.css";

import { createIncident, editIncident } from "@/lib/api/incident";
import { validateRequired } from "@/lib/common/formFunctions";

export default function IncidentForm({ form_data, data }) {

  const formRef = useRef(null);
  const router = useRouter();

  const { clients, technicians } = form_data;

  const requiredFields = [
    "title",
    "description",
    "category",
    "priority",
    "client_id"
  ];

  const getFormValues = () => {
    if (!formRef.current) return {};

    const e = formRef.current.elements;

    return {
      title: e.namedItem("title")?.value.trim(),
      description: e.namedItem("description")?.value.trim(),
      category: e.namedItem("category")?.value.trim(),
      priority: e.namedItem("priority")?.value,
      client_id: e.namedItem("client_id")?.value,
      technician_id: e.namedItem("technician_id")?.value || null,
    };
  };

  /* =============================
     CREATE
  ============================= */
  const handleCreate = async () => {
    const incidentData = getFormValues();

    const { ok, missing } = validateRequired(
      incidentData,
      requiredFields
    );

    if (!ok) {
      alert(`Falta el campo obligatorio: ${missing}`);
      return;
    }

    await createIncident(incidentData);

    alert("Incidente creado correctamente");
    router.push("/incidents"); // adjust if needed
  };

  /* =============================
     UPDATE
  ============================= */
  const handleUpdate = async () => {
    const incidentData = getFormValues();

    const hasChanges = Object.keys(incidentData).some(key => {
      return (incidentData[key] ?? "") !== (data[key] ?? "");
    });

    if (!hasChanges) {
      alert("No se detectaron cambios en el formulario.");
      return;
    }

    const { ok, missing } = validateRequired(
      incidentData,
      requiredFields
    );

    if (!ok) {
      alert(`Falta el campo obligatorio: ${missing}`);
      return;
    }

    await editIncident(data.public_id, incidentData);

    alert("Incidente actualizado correctamente");
    router.push("/incidents");
  };

  return (
    <div className={styles.global_form}>
      <form ref={formRef} className={styles.form}>

        {/* Title */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Título</legend>
            <input
              name="title"
              type="text"
              defaultValue={data?.title ?? ""}
              placeholder="Ej. Error 500 en servidor principal"
            />
          </fieldset>
        </div>

        {/* Description */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Descripción</legend>
            <textarea
              name="description"
              defaultValue={data?.description ?? ""}
              placeholder="Describe el problema, cuándo ocurrió y qué comportamiento presenta..."
            />
          </fieldset>
        </div>

        {/* Category */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Categoría</legend>
            <input
              name="category"
              type="text"
              defaultValue={data?.category ?? ""}
              placeholder="Ej. hardware, software, red"
            />
          </fieldset>
        </div>

        {/* Priority */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Prioridad</legend>
            <select
              name="priority"
              defaultValue={data?.priority ?? "low"}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="critical">Crítica</option>
            </select>
          </fieldset>
        </div>

        {/* Client */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Cliente</legend>
            <select
              name="client_id"
              defaultValue={data?.client_id?.toString() ?? ""}
              required
            >
              <option value="">Selecciona un cliente</option>
              {clients?.map(client => (
                <option key={client.public_id} value={client.public_id}>
                  {client.name}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        {/* Technician */}
        <div className={styles.input_row}>
          <fieldset className={styles.input_field}>
            <legend>Técnico (opcional)</legend>
            <select
              name="technician_id"
              defaultValue={data?.technician_id?.toString() ?? ""}
            >
              <option value="">Sin asignar</option>
              {technicians?.map(tech => (
                <option key={tech.public_id} value={tech.public_id}>
                  {tech.name}
                </option>
              ))}
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
          <h4>{data ? "Actualizar" : "Crear Incidente"}</h4>
        </button>
      </div>
    </div>
  );
}