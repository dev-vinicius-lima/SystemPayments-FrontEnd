import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Payment } from "../../types/Payments";
import { useFetchPayments } from "../../hooks/useFetchPayments";

const AddPaymentForm = () => {
  const { register, handleSubmit } = useForm<Payment>();
  const { calculateSalaryTotal, sendPaymentData, createPayment } =
    useFetchPayments();
  const onSubmit = async (data: Payment) => {
    const salaryTotal = calculateSalaryTotal(data);
    const payment = createPayment(data, salaryTotal);
    await sendPaymentData(payment as Payment).then(() => {
      window.location.reload();
    });
  };
  //   const calculateSalaryTotal =
  //     Number(data.salary) -
  //     Number(data.advanceMoney) -
  //     Number(data.cardLoan) -
  //     Number(data.discounts) +
  //     Number(data.overTime);
  //   const payment = {
  //     nameEmployee: data.nameEmployee,
  //     salary: data.salary.toString(),
  //     store: data.store,
  //     datePayment: data.datePayment,
  //     overTime: data.overTime,
  //     advanceMoney: data.advanceMoney,
  //     cardLoan: data.cardLoan,
  //     discounts: data.discounts,
  //     salaryTotal: calculateSalaryTotal.toString(),
  //   };

  //   fetch("http://localhost:3333/payments", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payment),
  //   });
  // };
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Adicionar Novo Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Loja" {...register("store")} />
          <Input
            placeholder="Nome do Funcionário"
            {...register("nameEmployee")}
          />
          <Input
            type="number"
            placeholder="Salario Bruto"
            {...register("salary")}
          />
          <Input
            type="date"
            placeholder="Data do Pagamento"
            {...register("datePayment")}
          />
          <Input
            type="number"
            placeholder="Desconto INSS"
            {...register("discounts")}
          />
          <Input
            type="number"
            placeholder="Desconto FGTS"
            {...register("discounts")}
          />
          <Input
            type="number"
            placeholder="Desconto Cartão"
            {...register("cardLoan")}
          />
          <Input
            type="number"
            placeholder="Desconto Adiantamento"
            {...register("advanceMoney")}
          />
          <Input
            type="number"
            placeholder="Valor das Horas Extras"
            {...register("overTime")}
          />
        </div>
        <Button className="w-full mt-4 button" onClick={handleSubmit(onSubmit)}>
          <PlusIcon className="w-4 h-4 mr-2" /> Adicionar Pagamento
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddPaymentForm;
