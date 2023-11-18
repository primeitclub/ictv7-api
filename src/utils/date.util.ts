async function calculateExpirationDate(): Promise<Date> {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 60);
  return expirationDate;
}

export default calculateExpirationDate;
