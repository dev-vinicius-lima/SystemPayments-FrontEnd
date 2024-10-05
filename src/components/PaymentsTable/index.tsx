import { Pencil1Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useFetchPayments } from "../../hooks/useFetchPayments";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const PaymentsTable = () => {
  const { payments } = useFetchPayments();

  const handleDelete = async ({ id }: { id: string }) => {
    const filteredPayments = payments?.filter((payment) => payment.id !== id);

    if (filteredPayments) {
      const response = await fetch(`http://localhost:3333/payments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredPayments),
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o pagamento");
      }

      alert("Pagamento deletado com sucesso");
      window.location.reload();
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamentos por Funcionário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Detalhes</TableHead>
                {payments.map((employee) => (
                  <TableHead
                    key={employee.nameEmployee}
                    className="text-center whitespace-nowrap"
                  >
                    {employee.nameEmployee}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                "Loja",
                "Salário Bruto",
                "Data",
                "INSS / FGTs",
                "Cartão",
                "Adiantamento",
                "Horas Extras",
                "Bonicações / salário familia",
                "Salário Total",
                "Ações",
              ].map((detail) => (
                <TableRow key={detail}>
                  <TableCell className="font-medium">{detail}</TableCell>
                  {payments.map((employee) => {
                    const payment = payments.find(
                      (p) => p.nameEmployee === employee.nameEmployee
                    );
                    if (!payment)
                      return <TableCell key={employee.datePayment} />;

                    let cellContent;
                    switch (detail) {
                      case "Loja":
                        cellContent = payment.store;
                        break;
                      case "Salário Bruto":
                        cellContent = `R$ ${payment.salary}`;
                        break;
                      case "Data":
                        {
                          const date = new Date(payment.datePayment);
                          cellContent = date.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          });
                          break;
                        }
                        break;
                      case "INSS / FGTs": {
                        cellContent = `- R$ ${payment.discounts}`;
                        break;
                      }

                      case "Cartão":
                        cellContent = `- R$ ${payment.cardLoan}`;
                        break;
                      case "Adiantamento":
                        cellContent = `- R$ ${payment.advanceMoney}`;
                        break;
                      case "Horas Extras": {
                        cellContent = `+ R$ ${payment.overTime}`;
                        break;
                      }

                      case "Bonicações / salário familia": {
                        cellContent = `- R$ ${payment.bonification}`;
                        break;
                      }

                      case "Salário Total": {
                        cellContent = `R$ ${payment.salaryTotal}`;
                        break;
                      }
                      case "Ações":
                        cellContent = (
                          <div className="flex justify-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Pencil1Icon className="w-4 h-4" color="blue" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleDelete({ id: payment.id as string })
                              }
                            >
                              <TrashIcon className="w-4 h-4" color="red" />
                            </Button>
                          </div>
                        );
                        break;
                      default:
                        cellContent = payment.salary;
                    }
                    return (
                      <TableCell
                        key={employee.salaryTotal}
                        className="text-center"
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsTable;
