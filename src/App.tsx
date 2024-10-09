"use client";

import AddPaymentForm from "./components/AddPaymentForm.tsx";
import Login from "./components/Login/index.tsx";
import PaymentsTable from "./components/PaymentsTable/index.tsx";
import { Card, CardContent } from "./components/ui/card";
import { useFetchPayments } from "./hooks/useFetchPayments";
import "./index.css";

export default function EmployeePayments() {
  const { isLoading, error, payments } = useFetchPayments();

  if (isLoading) <p>Carregando...</p>;
  if (error) <p>{error}</p>;

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-center gap-4 ">
        {!localStorage.getItem("login") && (
          <div className="flex flex-col items-center justify-center w-full">
            <Login />
          </div>
        )}
        {localStorage.getItem("login") === "true" && (
          <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center w-full">
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
                            (total, payment) =>
                              total + Number(payment.salaryTotal),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("login");
                  window.location.reload();
                }}
                className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
