import { buildTitle } from "@/lib/metadata/metadata";
import { formatDate, formatIncidentStyles } from "@/lib/metadata/format";

import styles from "./Clients.module.css";

import Table from "@/components/global-components/Table";
import TitleCard from "@/components/global-components/TitleCard";
export const dynamic = 'force-dynamic';

import InfoCard from "@/components/global-components/InfoCard";

import { client_columns } from "@/lib/constants/columns";

import { fetchClients } from "@/lib/api/clients";
import { directions } from "@/lib/constants/directions";

export function generateMetadata() {
  return {
    title: buildTitle("Clients"),
  };
}

function cleanData(data) {
  return data.map(item => ({
    ...item,
    created_at: formatDate(item.created_at),
  }));
}

export default async function LicenseAssignmentsPage() {
  const info_text = "Un <strong>cliente</strong> es aquel que nos reporta los incidentes.";
  const type = "client";
  
  const data = await fetchClients();

  return (
    <>
      <div className={ styles.incidents }>
        <TitleCard
          title="Lista de Clientes"
          direction={{
            Clientes: directions.Client,
          }}
        />

        <InfoCard text={ info_text }></InfoCard>

        <Table data={ data } columns={ client_columns } type={ type }></Table>
      </div> 
    </>
  );
};