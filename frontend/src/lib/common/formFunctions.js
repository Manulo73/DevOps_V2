// returns { ok: boolean, missing: string | null }
export function validateRequired(planData, requiredFields) {
    for (const field of requiredFields) {
        const val = planData[field];

        // reject only null or undefined
        if (val === null || val === undefined) {    
        return { ok: false, missing: field };
        }

        // strings: reject empty or whitespace-only
        if (typeof val === "string" && val.trim() === "") {
        return { ok: false, missing: field };
        }

        // numbers: reject NaN
        if (typeof val === "number" && Number.isNaN(val)) {
        return { ok: false, missing: field };
        }

        // if you accept numeric fields that may come as strings (e.g. "5"), ensure they coerce:
        // If required field should be numeric and val is a string, check Number(val) is valid
        // (only if you expect strings there). Example:
        // if (["software_id","total_licenses","days_before_reminder","plan_status_id"].includes(field)) {
        //   const n = Number(val);
        //   if (Number.isNaN(n)) return { ok: false, missing: field };
        // }

        // booleans: false is valid, so nothing to do
    }
    return { ok: true, missing: null };
}

export function normalizeValue(value) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return value.slice(0, 10); // convert "2025-11-29T..." → "2025-11-29"
    }
    return value;
}