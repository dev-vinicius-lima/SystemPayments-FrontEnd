import { useEffect, useState } from "react";
import { fetchData } from "../data/fetch";
import { Payment } from "../types/Payments";

export const useFetchPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        setPayments(await fetchData());
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os pagamentos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return { payments, isLoading, error };
};
