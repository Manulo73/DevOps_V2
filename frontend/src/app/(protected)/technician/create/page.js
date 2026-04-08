export const dynamic = 'force-dynamic';

import { buildTitle } from "@/lib/metadata/metadata";

import styles from "../Technician.module.css";

import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { directions } from "@/lib/constants/directions";
import GlobalForm from "@/components/global-components/GlobalForm";

export function generateMetadata() {
    return {
        title: buildTitle("Add a Technician"),
    };
}

export default function CreateIncidentsPage() {

    const info_text = "Completa el formulario para crear un nuevo técnico";

    return (
        <>
            <div className={styles.incidents}>
                <TitleCard
                title="Crea un Incidente"
                direction={{
                    Técnicos: `${ directions.Incidents }`,
                    Añadir_Técnico: `${ directions.Incidents_create }`,
                }}
                />

                <InfoCard text={info_text}></InfoCard>

                <GlobalForm type="technician"></GlobalForm>
            </div> 
        </>
    );
}