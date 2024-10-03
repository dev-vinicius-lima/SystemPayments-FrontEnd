"use client";

import AddPaymentForm from "./components/AddPaymentForm.tsx";
import PaymentsTable from "./components/PaymentsTable/index.tsx";
import { Card, CardContent } from "./components/ui/card";
import { useFetchPayments } from "./hooks/useFetchPayments";
import "./index.css";

export default function EmployeePayments() {
  const { isLoading, error, payments } = useFetchPayments();

  if (isLoading) <p>Carregando...</p>;
  if (error) <p>{error}</p>;

  console.log(payments);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">
        Gerenciamento de Pagamentos
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <AddPaymentForm />
        </div>

        <div className="lg:col-span-3">
          <PaymentsTable />
          <Card className="flex items-center justify-center h-20 mt-4 text-center">
            <CardContent className="w-full h-44">
              <div className="flex items-center justify-between w-full h-44 ">
                <span className="text-sm font-semibold md:text-base ">
                  Total de Pagamentos Brutos:
                </span>
                <span className="ml-4 text-2xl font-bold text-green-700">
                  R$
                  {payments
                    .reduce(
                      (total, payment) => total + Number(payment.salaryTotal),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
