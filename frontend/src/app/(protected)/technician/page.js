import { buildTitle } from "@/lib/metadata/metadata";
import { formatDate, formatIncidentStyles } from "@/lib/metadata/format";

import styles from "./Technician.module.css";

import Table from "@/components/Global Components/Table";
import TitleCard from "@/components/Global Components/TitleCard";
import InfoCard from "@/components/Global Components/InfoCard";

import { incidents_columns } from "@/lib/constants/columns";

import { fetchIncidents } from "@/lib/api/incident";
import { directions } from "@/lib/constants/directions";

export function generateMetadata() {
  return {
    title: buildTitle("Technician"),
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
  const info_text = "Un <strong>técnico</strong> es aquel que resuelve los incidentes";
  const type = "technician";
  
  const data = await fetchIncidents();

  const clean_data = cleanData(data);
  const clean_styled_data = formatIncidentStyles(data);

  return (
    <>
      <div className={ styles.incidents }>
        <TitleCard
          title="Lista de Técnicos"
          direction={{
            Técnicos: directions.Technician,
          }}
        />

        <InfoCard text={ info_text }></InfoCard>

        <Table data={ clean_styled_data } columns={ incidents_columns } type={ type }></Table>
      </div> 
    </>
  );
};