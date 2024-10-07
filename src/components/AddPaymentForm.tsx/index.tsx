import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useFetchPayments } from "../../hooks/useFetchPayments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Payment } from "../../types/Payments";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FormField, { User } from "../FormField.tsx";

const AddPaymentForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Payment>({
  resolver: zodResolver(User),
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
          <FormField label="Loja" placeholder="Nome da loja" type="text" register={register("store")} error={errors.store?.message}/>

          <FormField label="Funcionário" placeholder="Nome do Funcionário" type="text" register={register("nameEmployee")} error={errors.nameEmployee?.message}/>
        
          <FormField label="Salário" placeholder="Salário" type="number" register={register("salary")} error={errors.salary?.message}/>

          <FormField label="Data" placeholder="Data" type="date" register={register("datePayment")} error={errors.datePayment?.message}/>

          <FormField label="Desconto INSS / FGTs" placeholder="Desconsto INSS / FGTs" type="number" register={register("discounts")} error={errors.overTime?.message}/>

          <FormField label="Emprestimo em Cartão" placeholder="Emprestimo em Cartão" type="number" register={register("cardLoan")} error={errors.cardLoan?.message}/>

          <FormField label="Dinheiro Antecipado" placeholder="Dinheiro Antecipado" type="number" register={register("advanceMoney")} error={errors.advanceMoney?.message}/>

          
          <FormField label="Bonificação" placeholder="Bonificação" type="number" register={register("bonification")} error={errors.bonification?.message}/>

          <FormField label="Horas Extras" placeholder="Horas Extras" type="number" register={register("overTime")} error={errors.overTime?.message}/>
        </div>
        <Button className="w-full mt-4 button" onClick={handleSubmit(onSubmit)}>
          <PlusIcon className="w-4 h-4 mr-2" /> Adicionar Pagamento
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddPaymentForm;


