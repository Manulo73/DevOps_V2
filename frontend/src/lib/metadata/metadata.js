export function buildTitle(pageTitle) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Incidentes 73";
  return pageTitle ? `${pageTitle} | ${appName}` : appName;
}