export const dynamic = 'force-dynamic';

import { buildTitle } from "@/lib/metadata/metadata";
import { formatDate, formatUserStyles } from "@/lib/metadata/format";

import styles from "./Technician.module.css";

import Table from "@/components/global-components/Table";
import TitleCard from "@/components/global-components/TitleCard";
import InfoCard from "@/components/global-components/InfoCard";

import { technician_columns } from "@/lib/constants/columns";

import { fetchTechnicians } from "@/lib/api/technician";
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
  }));
}

export default async function LicenseAssignmentsPage() {
  const info_text = "Un <strong>técnico</strong> es aquel que resuelve los incidentes";
  const type = "technician";
  
  const data = await fetchTechnicians();

  const clean_data = cleanData(data);

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

        <Table data={ clean_data } columns={ technician_columns } type={ type }></Table>
      </div> 
    </>
  );
};