import styles from "./format.module.css";

export function formatDate(dateString) {
  return dateString ? dateString.split(  "T")[0] : null;
}

export function formatIncidentStyles(incidents) {
  const statusStyles = {
    open: styles.status_open,
    in_progress: styles.status_progress,
    resolved: styles.status_resolved,
    closed: styles.status_closed
  };

  const priorityStyles = {
    low: styles.priority_low,
    medium: styles.priority_medium,
    high: styles.priority_high,
    critical: styles.priority_critical
  };

  const formatLabel = (text) =>
    text.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());

    return incidents.map((incident) => ({
      ...incident,

    status: (
      <span className={statusStyles[incident.status]}>
        {formatLabel(incident.status)}
      </span>
    ),

    priority: (
      <span className={priorityStyles[incident.priority]}>
        {formatLabel(incident.priority)}
      </span>
    )
  }));
}