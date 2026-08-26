export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

const SERVICE_CODES: Record<string, string> = {
  "cbt-exams": "CBT-01",
  "jamb-registration": "JMB-02",
  "post-utme": "PUT-03",
  "computer-training": "CPT-04",
  "certificate-courses": "CRT-05",
};

export function serviceCode(slug: string): string {
  return SERVICE_CODES[slug] ?? slug.slice(0, 3).toUpperCase() + "-00";
}
