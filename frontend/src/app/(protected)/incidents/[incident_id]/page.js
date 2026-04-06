import { buildTitle } from "@/lib/metadata/metadata";

import styles from "../Incidents.module.css";

import TitleCard from "@/components/Global Components/TitleCard";
import InfoCard from "@/components/Global Components/InfoCard";

import { directions } from "@/lib/constants/directions";
import GlobalForm from "@/components/Global Components/GlobalForm";

export function generateMetadata() {
    return {
        title: buildTitle("Edit Incident"),
    };
}

export default async function EditIncidentsPage({ params }) {

    const { incident_id } = await params;
    const info_text = "Edita la información del incidente";

    return (
        <>
            <div className={styles.incidents}>
                <TitleCard
                title="Editar un Incidente"
                direction={{
                    Incidentes: `${ directions.Incidents }`,
                    Editar_Incidente: `${ directions.Incidents_create }`,
                }}
                />

                <InfoCard text={info_text}></InfoCard>

                <GlobalForm type="incidents" id={ incident_id }></GlobalForm>
            </div> 
        </>
    );
}