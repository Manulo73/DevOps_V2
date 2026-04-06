import Link from "next/link";

import styles from "./TitleCard.module.css";

export default function TitleCard({ title, direction }) {
  return (
    <div className={styles.title_container}>
      <h1>{title}</h1>
      <hr />
      <h2>
        {Object.entries(direction).map(([label, path], index) => (
          <span key={label}>
            <Link href={path} className={styles.link}>
              ○ {label.replaceAll("_", " ")}
            </Link>
            {index < Object.keys(direction).length - 1 && " "}
          </span>
        ))}
      </h2>
    </div>
  );
}