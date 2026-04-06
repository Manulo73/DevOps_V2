"use client";

import { ActionsCell } from "@/components/global-components/Table Components/ActionsCell";

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
        cell: ({ row }) => <ActionsCell row={row} />,
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
