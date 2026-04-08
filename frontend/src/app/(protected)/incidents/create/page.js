export const dynamic = 'force-dynamic';

import { buildTitle } from "@/lib/metadata/metadata";

import styles from "../Incidents.module.css";

import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { directions } from "@/lib/constants/directions";
import GlobalForm from "@/components/global-components/GlobalForm";

export function generateMetadata() {
    return {
        title: buildTitle("Create Incident"),
    };
}

export default function CreateIncidentsPage() {

    const info_text = "Completa el formulario para crear un nuevo incidente";

    return (
        <>
            <div className={styles.incidents}>
                <TitleCard
                title="Crea un Incidente"
                direction={{
                    Incidentes: `${ directions.Incidents }`,
                    Crear_Incidente: `${ directions.Incidents_create }`,
                }}
                />

                <InfoCard text={info_text}></InfoCard>

                <GlobalForm type="incidents"></GlobalForm>
            </div> 
        </>
    );
}