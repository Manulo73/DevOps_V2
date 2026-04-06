// import LicenseAssignmentForm from "./Forms/LicenseAssignmentForm";
// import UserForm from "./Forms/UserForm";
// import SoftwareForm from "./Forms/SoftwareForm";
// import LicensePlanForm from "./Forms/LicensePlanForm";
// import { fetchUserData, fetchUserFormData } from "@/lib/api/users";
// import { fetchFormSelectData, fetchLicenseAssignment } from "@/lib/api/license-assignments";
// import { fetchSoftwareById } from "@/lib/api/software";
// import { fetchLicensePlanById, fetchLicensePlanFormData } from "@/lib/api/license-plans";

import { fetchIncidentFormData, fetchIncidentData } from "@/lib/api/incident";
import IncidentForm from "../incidents/IncidentForm";


export default async function GlobalForm({ type, id }) {
    if (type === "incidents") {
        const form_data = await fetchIncidentFormData();
        if (id) { 
            const data = await fetchIncidentData(id);
            return <IncidentForm form_data={ form_data } data={ data }></IncidentForm>;
        }
        return (
            <>
                <IncidentForm form_data={ form_data } ></IncidentForm>
            </>
        );
    } 
    return;
}