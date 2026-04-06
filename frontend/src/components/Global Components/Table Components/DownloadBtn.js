import styles from "./DownloadBtn.module.css";

export default function DownloadBtn({ table }) {
  return (
    <button
      className={styles.exportBtn}
      onClick={() => {
        // Exclude the "edit" column
        const visibleColumns = table
          .getAllColumns()
          .filter(
            (col) => col.getIsVisible() && col.id !== "edit"
          );

        const headers = visibleColumns.map((col) => col.columnDef.header);

        const rows = table.getRowModel().rows.map((row) =>
          row
            .getVisibleCells()
            .filter((cell) => cell.column.id !== "edit")
            .map((cell) => cell.getValue())
        );

        const csvContent = [
          headers.join(","),
          ...rows.map((r) => r.join(",")),
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "table_data.csv");
        link.click();
      }}
    >
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12.25V19.25H5V12.25H3V19.25C3 20.35 3.9 21.25 5 21.25H19C20.1 21.25 21 20.35 21 19.25V12.25H19ZM13 12.92L15.59 10.34L17 11.75L12 16.75L7 11.75L8.41 10.34L11 12.92V3.25H13V12.92Z"
          fill="white"
        />
      </svg>
    </button>
  );
}