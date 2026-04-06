import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Sistema de Gestión de Incidentes de TI por</p>
      <Image 
        src="/images/logo.png" 
        alt="Logo" 
        width={20} 
        height={20}
        className={styles.logo} 
      />
      <p>Incidentes 73 | Versión 0.1</p>
    </footer>
  );
}