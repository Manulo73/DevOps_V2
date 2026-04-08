export const dynamic = 'force-dynamic';

import Link from "next/link";
import styles from "./Dashboard.module.css";

import { buildTitle } from "@/lib/metadata/metadata";
import { directions } from "@/lib/constants/directions";
import { incidents_dashboard_columns, incidents_unassigned_dashboard_columns } from "@/lib/constants/columns";

import DashboardTable from "@/components/dashboard/DashboardTable";
import TitleCard from "@/components/global-components/TitleCard";
import { fetchRecentDoneIncidents, fetchTopIncidents, fetchTopUnassignedIncidents } from "@/lib/api/dashboard";

import IncidentForm from "@/components/incidents/IncidentForm";
import { formatIncidentStyles } from "@/lib/metadata/format";

export function generateMetadata() {
  return {
    title: buildTitle("Dashboard"),
  };
}

export default async function DashboardPage() {

  // Server-side fetch
  const incidents = await fetchTopIncidents();
  const styledIncidents = formatIncidentStyles(incidents);

  const unassignedIncidents = await fetchTopUnassignedIncidents();
  const styledUnassignedIncidents = formatIncidentStyles(unassignedIncidents);

  const recentlyClosedIncidents = await fetchRecentDoneIncidents();
  const styledRecentlyClosedIncidents = formatIncidentStyles(recentlyClosedIncidents);

  return (
    <>
      <div className={styles.dashboard}>

        {/* Title Card */}
        <TitleCard
          title="Dashboard"
          direction={{
            Inicio: directions.Dashboard,
          }}
        />

        {/* <hr className={styles.hr}></hr> */}

        <div className={styles.data_container}>

          <div className={styles.tables}>

              {/* Incidentes recientes - Table */}
              <div className={styles.sub_container}>
                <div className={styles.table_container}>
                  <div className={styles.title}>
                    <h2>Incidentes más Recientes</h2>
                    <Link href={directions.Incidents}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.33325 22.6667L22.6666 9.33337" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.33325 9.33337H22.6666V22.6667" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                  <div className={styles.table}>
                    <DashboardTable data={ styledIncidents } columns={ incidents_dashboard_columns } type={ "dashboard" }></DashboardTable>
                  </div>
                </div>
              </div>

              {/* Incidentes Sin Técnico - Table */}
              <div className={styles.sub_container}>

                <div className={styles.table_container}>
                  <div className={styles.title}>
                    <h2>Incidentes sin Asignar</h2>
                    <Link href={directions.Incidents}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.33325 22.6667L22.6666 9.33337" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.33325 9.33337H22.6666V22.6667" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                  <div className={styles.table}>
                    <DashboardTable data={ styledUnassignedIncidents } columns={ incidents_unassigned_dashboard_columns } type={ "dashboard" }></DashboardTable>
                  </div>
                </div>

                <div className={styles.table_container}>
                  <div className={styles.title}>
                    <h2>Incidentes Cerrados Recientemente</h2>
                    <Link href={directions.Incidents}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.33325 22.6667L22.6666 9.33337" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.33325 9.33337H22.6666V22.6667" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                  <div className={styles.table}>
                    <DashboardTable data={ styledRecentlyClosedIncidents } columns={ incidents_dashboard_columns } type={ "dashboard" }></DashboardTable>
                  </div>
                </div>

              </div>

            </div>

          </div>
      </div>
    </>
  );
}
