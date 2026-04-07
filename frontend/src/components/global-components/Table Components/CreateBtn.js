import { directions } from "@/lib/constants/directions";
import Link from "next/link";
import styles from "./CreateBtn.module.css";

export default function CreateBtn({ type }) {

    let url = "";
    let word = "";

    switch ( type ) {
        case "incidents": 
            url = directions.Incidents_create
            word = "Incidente"
            break;
        case "client": 
            url = directions.Client_create
            word = "Cliente"
            break;
        case "technician": 
            url = directions.Technician_create
            word = "Técnico"
            break;
    }
    
    return (
        <>
            <Link className={styles.link} href={ url }>
                <button className={styles.create_btn}>
                    <h4>Nuevo {word}</h4>
                </button>
            </Link>
        </>
    );
}