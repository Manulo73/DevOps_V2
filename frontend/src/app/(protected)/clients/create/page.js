export const dynamic = 'force-dynamic';

import { buildTitle } from "@/lib/metadata/metadata";

import styles from "../Clients.module.css";

import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { directions } from "@/lib/constants/directions";
import GlobalForm from "@/components/global-components/GlobalForm";

export function generateMetadata() {
    return {
        title: buildTitle("Add Client"),
    };
}

export default function CreateIncidentsPage() {

    const info_text = "Completa el formulario para añadir un nuevo cliente.";

    return (
        <>
            <div className={styles.incidents}>
                <TitleCard
                title="Añade un Cliente"
                direction={{
                    Clientes: `${ directions.Client }`,
                    Añadir_Cliente: `${ directions.Client_create }`,
                }}
                />

                <InfoCard text={info_text}></InfoCard>

                <GlobalForm type="client"></GlobalForm>
            </div> 
        </>
    );
}