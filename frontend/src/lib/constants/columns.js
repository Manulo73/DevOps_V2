"use client";

import { ActionsCell } from "@/components/global-components/Table Components/ActionsCell";
import styles from "@/lib/metadata/format.module.css";

export const incidents_columns = [
    { header: "ID", accessorKey: "public_id" },
    { header: "Título", accessorKey: "title" },
    { header: "Descripción", accessorKey: "description" },
    { header: "Categoría", accessorKey: "category" },
    {
        header: "Prioridad",
        accessorKey: "priority",
        cell: info => info.getValue(),
    },
    { header: "Estado", accessorKey: "status", cell: info => info.getValue() },
    { header: "Cliente", accessorKey: "client_name" },
    { header: "Técnico", accessorKey: "technician_name" },
    {
        header: "Creado",
        accessorKey: "created_at",
        cell: info =>
        new Date(info.getValue()).toLocaleString(),
    },
    {
        header: "Resuelto",
        accessorKey: "resolved_at",
        cell: info =>
        info.getValue()
            ? new Date(info.getValue()).toLocaleString()
            : "—",
    },
    {
        header: "",
        id: "edit",
        cell: ({ row }) => <ActionsCell row={row} type={"incidents"} />,
  },
];

const formatLabel = (text) =>
  text.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());

export const technician_columns = [
  { header: "ID", accessorKey: "public_id" },
  { header: "Nombre", accessorKey: "full_name" },
  { header: "Correo", accessorKey: "email" },

  {
    header: "Rol",
    accessorKey: "role",
    cell: info => {
      const role = info.getValue();

      const roleStyles = {
        client: styles.role_client,
        technician: styles.role_technician,
        admin: styles.role_admin,
      };

      return (
        <span className={roleStyles[role]}>
          {formatLabel(role)}
        </span>
      );
    },
  },

  {
    header: "Activo",
    accessorKey: "is_active",
    cell: info => (info.getValue() ? "Sí" : "No"),
  },

  {
    header: "Creado",
    accessorKey: "created_at",
    cell: info =>
      new Date(info.getValue()).toLocaleString(),
  },

  {
    header: "",
    id: "edit",
    cell: ({ row }) => <ActionsCell row={row} type={"technician"} />,
  },
];

export const client_columns = [
    { header: "ID", accessorKey: "public_id" },
    { header: "Nombre", accessorKey: "full_name" },
    { header: "Correo", accessorKey: "email" },
    {
        header: "Activo",
        accessorKey: "is_active",
        cell: info => (info.getValue() ? "Sí" : "No"),
    },
    {
        header: "Creado",
        accessorKey: "created_at",
        cell: info =>
        new Date(info.getValue()).toLocaleString(),
    },
    {
        header: "",
        id: "edit",
        cell: ({ row }) => <ActionsCell row={row} type={"client"} />,
    },
];

export const incidents_dashboard_columns = [
    { header: "ID", accessorKey: "public_id" },
    { header: "Título", accessorKey: "title" },
    { header: "Categoría", accessorKey: "category" },
    {
        header: "Prioridad",
        accessorKey: "priority",
        cell: info => info.getValue(),
    },
    { header: "Estado", accessorKey: "status", cell: info => info.getValue() },
    { header: "Cliente", accessorKey: "client_name" },
    { header: "Técnico", accessorKey: "technician_name" },
    {
        header: "Creado",
        accessorKey: "created_at",
        cell: info =>
        new Date(info.getValue()).toLocaleString(),
    },
    {
        header: "Resuelto",
        accessorKey: "resolved_at",
        cell: info =>
        info.getValue()
            ? new Date(info.getValue()).toLocaleString()
            : "—",
    },
];

export const incidents_unassigned_dashboard_columns = [
    { header: "ID", accessorKey: "public_id" },
    { header: "Título", accessorKey: "title" },
    { header: "Categoría", accessorKey: "category" },
    {
        header: "Prioridad",
        accessorKey: "priority",
        cell: info => info.getValue(),
    },
    { header: "Estado", accessorKey: "status", cell: info => info.getValue() },
    { header: "Cliente", accessorKey: "client_name" },
];
