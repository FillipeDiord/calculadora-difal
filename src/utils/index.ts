export function formatCurrencyInput(value: string): string {
  const rawValue = value.replace(/\D/g, "").replace(/^0+/, "");

  return rawValue
    ? new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(parseFloat(rawValue) / 100)
    : "";
}
