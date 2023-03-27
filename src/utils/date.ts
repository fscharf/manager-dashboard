export const formatDate = (date: Date | number) => {
  return Intl.DateTimeFormat('pt-BR').format(date)
}
