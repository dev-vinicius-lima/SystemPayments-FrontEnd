import { Payment } from "../types/Payments";

export const fetchData = async () => {
  const response = await fetch("http://localhost:3333/payments" as string);
  const data = await response.json();
  return data.payments as Payment[];
};
