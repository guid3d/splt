import { isValidIBAN, electronicFormatIBAN } from "ibantools";

export function validateIban(raw: string): string | null {
  const normalized = electronicFormatIBAN(raw.replace(/\s/g, "").toUpperCase());
  if (!normalized || !isValidIBAN(normalized)) {
    return "Invalid IBAN";
  }
  return null;
}
