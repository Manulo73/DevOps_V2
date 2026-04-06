import styles from "./VisibilityFilter.module.css";

export default function VisibilityFilter({ table }) {
    return (
        <>
            <div className={styles.columnToggleContainer}>
                <details>
                    <summary className={styles.summary}>
                        {/* Columnas */}
                    </summary>
                    <div className={styles.toggleList}>
                        {table.getAllLeafColumns().map((column) => (
                            <label key={column.id} className={styles.toggleItem}>
                            <input
                                type="checkbox"
                                checked={column.getIsVisible()}
                                onChange={() => column.toggleVisibility()}
                            />
                            {column.columnDef.header}
                            </label>
                        ))}
                    </div>
                </details>
            </div>
        </>
    );
}