import { directions } from "@/lib/constants/directions";
import Link from "next/link";
import styles from "./CreateBtn.module.css";

export default function CreateBtn({ type }) {

    let url = "";

    switch ( type ) {
        case "incidents": url = directions.Incidents_create
            break;
    }
    
    return (
        <>
            <Link className={styles.link} href={ url }>
                <button className={styles.create_btn}>
                    <h4>Nuevo Incidente</h4>
                </button>
            </Link>
        </>
    );
}