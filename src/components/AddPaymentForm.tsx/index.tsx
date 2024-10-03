import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const AddPaymentForm = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Adicionar Novo Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Loja" />
          <Input placeholder="Nome do Funcionário" />
          <Input type="number" placeholder="Valor Bruto" />
          <Input type="date" />
          <Input type="number" placeholder="Desconto INSS" />
          <Input type="number" placeholder="Desconto FGTS" />
          <Input type="number" placeholder="Desconto Cartão" />
          <Input type="number" placeholder="Desconto Adiantamento" />
        </div>
        <Button className="w-full mt-4 button">
          <PlusIcon className="w-4 h-4 mr-2" /> Adicionar Pagamento
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddPaymentForm;
