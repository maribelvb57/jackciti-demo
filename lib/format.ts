export function formatClp(value: number): string {
  const roundedValue = Math.round(value)
  const sign = roundedValue < 0 ? "-" : ""
  const absoluteValue = Math.abs(roundedValue)
  const formattedNumber = absoluteValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return `${sign}$${formattedNumber}`
}
