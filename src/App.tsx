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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <h1 className="mb-4 text-2xl font-bold">
            Gerenciamento de Pagamentos
          </h1>
          <AddPaymentForm />

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  Total de Pagamentos Brutos:
                </span>
                <span className="text-2xl font-bold">
                  R$
                  {payments
                    .map((payment) => payment.salary)
                    .reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <PaymentsTable />
        </div>
      </div>
    </div>
  );
}
