"use client";

import React, { useState } from "react";
import { useMemo } from "react";
import styles from "./Table.module.css";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import DownloadBtn from "./Table Components/DownloadBtn";
import CreateBtn from "./Table Components/CreateBtn";
import VisibilityFilter from "./Table Components/VisibilityFilter";

export default function Table({ data, columns, type }) {

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState({});

    
    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter, columnVisibility },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: useMemo(() => getCoreRowModel(), []),
        getSortedRowModel: useMemo(() => getSortedRowModel(), []),
        getFilteredRowModel: useMemo(() => getFilteredRowModel(), []),
        globalFilterFn: "includesString",
    });

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.tableToolbar}>
                    <div className={styles.searchContainer}>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.1292 12.1291H12.4709L12.2375 11.9041C13.0542 10.9541 13.5459 9.72074 13.5459 8.37907C13.5459 5.3874 11.1209 2.9624 8.12919 2.9624C5.13752 2.9624 2.71252 5.3874 2.71252 8.37907C2.71252 11.3707 5.13752 13.7957 8.12919 13.7957C9.47086 13.7957 10.7042 13.3041 11.6542 12.4874L11.8792 12.7207V13.3791L16.0459 17.5374L17.2875 16.2957L13.1292 12.1291ZM8.12919 12.1291C6.05419 12.1291 4.37919 10.4541 4.37919 8.37907C4.37919 6.30407 6.05419 4.62907 8.12919 4.62907C10.2042 4.62907 11.8792 6.30407 11.8792 8.37907C11.8792 10.4541 10.2042 12.1291 8.12919 12.1291Z" fill="white"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.btnContainer}>

                        <VisibilityFilter table={ table }></VisibilityFilter>

                        <DownloadBtn table={ table }></DownloadBtn>

                        <CreateBtn type={ type }></CreateBtn>
                        
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const sortDirection = header.column.getIsSorted();

                                return (
                                <th
                                    key={header.id}
                                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                    className={canSort ? styles.sortable : ""}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {canSort && (
                                    <span className={styles.sortIcon}>
                                        {sortDirection === "asc"
                                        ? " ▲"
                                        : sortDirection === "desc"
                                        ? " ▼"
                                        : " ↕"}
                                    </span>
                                    )}
                                </th>
                                );
                            })}
                            </tr>
                        ))}
                        </thead>

                        <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}