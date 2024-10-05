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

  const calculateSalaryTotal = (payment: Payment) => {
    return (
      Number(payment.salary) -
      Number(payment.advanceMoney) -
      Number(payment.cardLoan) -
      Number(payment.discounts) +
      Number(payment.overTime) +
      Number(payment.bonification)
    );
  };

  const createPayment = (data: Payment, salaryTotal: number) => {
    return {
      nameEmployee: data.nameEmployee,
      salary: data.salary,
      store: data.store,
      datePayment: data.datePayment,
      bonification: data.bonification,
      overTime: data.overTime,
      advanceMoney: data.advanceMoney,
      cardLoan: data.cardLoan,
      discounts: data.discounts,
      salaryTotal: salaryTotal.toString(),
    };
  };

  const sendPaymentData = async (payment: Payment) => {
    try {
      const response = await fetch("http://localhost:3333/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment as Payment),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar os dados do pagamento");
      } else {
        alert("Pagamento registrado com sucesso");
      }
    } catch (error) {
      console.log("Erro ao enviar os dados do pagamento", error);
    }
  };

  return {
    payments,
    isLoading,
    error,
    calculateSalaryTotal,
    createPayment,
    sendPaymentData,
  };
};
