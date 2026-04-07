import { buildTitle } from "@/lib/metadata/metadata";

import styles from "../Clients.module.css";

import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { directions } from "@/lib/constants/directions";
import GlobalForm from "@/components/global-components/GlobalForm";

export function generateMetadata() {
    return {
        title: buildTitle("Edit Client"),
    };
}

export default async function EditClientsPage({ params }) {

    const { client_id } = await params;
    const info_text = "Edita la información sobre el cliente";

    return (
        <>
            <div className={styles.incidents}>
                <TitleCard
                title="Editar un Incidente"
                direction={{
                    Clientes: `${ directions.Client }`,
                    Editar_Cliente: `${ directions.Client_create }`,
                }}
                />

                <InfoCard text={info_text}></InfoCard>

                <GlobalForm type="client" id={ client_id }></GlobalForm>
            </div> 
        </>
    );
}