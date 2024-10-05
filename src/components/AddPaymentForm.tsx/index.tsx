import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useFetchPayments } from "../../hooks/useFetchPayments";
import { Payment } from "../../types/Payments";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const AddPaymentForm = () => {
  const { register, handleSubmit } = useForm<Payment>({
    defaultValues: {
      nameEmployee: "",
      salary: "",
      store: "",
      datePayment: "",
      bonification: "",
      overTime: "",
      advanceMoney: "",
      cardLoan: "",
      discounts: "",
    },
  });
  const { calculateSalaryTotal, sendPaymentData, createPayment } =
    useFetchPayments();
  const onSubmit = async (data: Payment) => {
    const salaryTotal = calculateSalaryTotal(data);
    const payment = createPayment(data, salaryTotal);
    await sendPaymentData(payment as Payment).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    let value = input.value.replace(/[^0-9.,]/g, "");

    // Remove ponto se existir antes da vírgula
    value = value.replace(/\./g, "").replace(",", ".");

    // Converter para número
    const numericValue = Number(value);

    register(e.currentTarget.name as keyof Payment).onChange(e);

    if (!isNaN(numericValue)) {
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
      }).format(numericValue);

      input.value = formattedValue;
    }
  };

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
          <label className="text-xs">
            Loja
            <Input
              placeholder="Shopping"
              {...register("store")}
              id="loja"
              className="mb-2"
            />
          </label>
          <label className="text-xs">
            Funcionário
            <Input
              placeholder="Nome do Funcionário"
              {...register("nameEmployee")}
              className="mb-2"
            />
          </label>
          <label className="text-xs">
            Salário
            <Input
              type="text"
              placeholder="Salario Bruto"
              {...register("salary")}
              className="mb-2"
              onChange={handleChange}
            />
          </label>

          <label className="text-xs">
            Data
            <Input
              type="date"
              placeholder="Data do Pagamento"
              {...register("datePayment")}
              className="mb-2"
            />
          </label>

          <label className="text-xs">
            Desconto INSS / FGTs
            <Input
              type="number"
              placeholder="Desconto INSS"
              {...register("discounts")}
              className="mb-2"
            />
          </label>

          <label className="text-xs">
            Desconto Cartão
            <Input
              type="number"
              placeholder="Desconto Cartão"
              {...register("cardLoan")}
              className="mb-2"
            />
          </label>

          <label className="text-xs">
            Desconto Adiantamento
            <Input
              type="number"
              placeholder="Desconto Adiantamento"
              {...register("advanceMoney")}
              className="mb-2"
            />
          </label>
          <label className="text-xs">
            Bonificação / Salário Família
            <Input
              type="number"
              placeholder="Bonificação / Salário Família"
              {...register("bonification")}
              className="mb-2"
            />
          </label>

          <label className="text-xs">
            Horas Extras
            <Input
              type="number"
              placeholder="Valor das Horas Extras"
              {...register("overTime")}
              className="mb-2"
            />
          </label>
        </div>
        <Button className="w-full mt-4 button" onClick={handleSubmit(onSubmit)}>
          <PlusIcon className="w-4 h-4 mr-2" /> Adicionar Pagamento
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddPaymentForm;
