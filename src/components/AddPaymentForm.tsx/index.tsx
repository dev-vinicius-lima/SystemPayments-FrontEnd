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
      salary: 0,
      store: "",
      datePayment: "",
      bonification: 0,
      overTime: 0,
      advanceMoney: 0,
      cardLoan: 0,
      discounts: 0,
    },
  });
  const { sendPaymentData, createPayment } = useFetchPayments();
  const onSubmit = async (data: Payment) => {
    const payment = createPayment(data);
    await sendPaymentData(payment as Payment).then(() => {
      window.location.reload();
    });
  };

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
              type="number"
              placeholder="Salario Bruto"
              {...register("salary")}
              className="mb-2"
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
