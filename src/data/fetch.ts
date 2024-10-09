import { Payment } from "../types/Payments";

export const fetchData = async () => {
  const response = await fetch(
    "https://systempayments.onrender.com/payments" as string
  );
  const data = await response.json();
  return data.payments as Payment[];
};
