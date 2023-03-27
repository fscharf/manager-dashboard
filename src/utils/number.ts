export const formatPercent = (value: number) => {
  if (!value) return
  return `${value.toString().replaceAll('.', ',')}%`
}
