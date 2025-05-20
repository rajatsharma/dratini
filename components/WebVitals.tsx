import { useReportWebVitals } from "next/web-vitals";

export default async function WebVitals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return null;
}
