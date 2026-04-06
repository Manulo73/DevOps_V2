import { buildTitle } from "@/lib/metadata/metadata";
import { formatDate, formatIncidentStyles } from "@/lib/metadata/format";

import styles from "./Clients.module.css";

import Table from "@/components/global-components/Table";
import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { incidents_columns } from "@/lib/constants/columns";

import { fetchIncidents } from "@/lib/api/incident";
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
    resolved_at: formatDate(item.resolved_at),
  }));
}

export default async function LicenseAssignmentsPage() {
  const info_text = "Un <strong>cliente</strong> es aquel que nos reporta los incidentes.";
  const type = "client";
  
  const data = await fetchIncidents();

  const clean_data = cleanData(data);
  const clean_styled_data = formatIncidentStyles(data);

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

        <Table data={ clean_styled_data } columns={ incidents_columns } type={ type }></Table>
      </div> 
    </>
  );
};