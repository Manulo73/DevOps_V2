export const dynamic = 'force-dynamic';

import { buildTitle } from "@/lib/metadata/metadata";

import styles from "../Technician.module.css";

import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { directions } from "@/lib/constants/directions";
import GlobalForm from "@/components/global-components/GlobalForm";

export function generateMetadata() {
    return {
        title: buildTitle("Edit Technician"),
    };
}

export default async function EditTechnicianPage({ params }) {

    const { technician_id } = await params;
    const info_text = "Edita la información del técnico";

    return (
        <>
            <div className={styles.incidents}>
                <TitleCard
                title="Editar un Técnico"
                direction={{
                    Técnicos: `${ directions.Technician }`,
                    Editar_Técnico: `${ directions.Technician_create }`,
                }}
                />

                <InfoCard text={info_text}></InfoCard>

                <GlobalForm type="technician" id={ technician_id }></GlobalForm>
            </div> 
        </>
    );
}