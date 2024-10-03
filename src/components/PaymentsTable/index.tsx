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
                        cellContent = payment.datePayment;
                        break;
                      case "INSS / FGTS":
                        cellContent = `- R$ ${payment.discounts}`;
                        break;

                      case "Cartão":
                        cellContent = `- R$ ${payment.cardLoan}`;
                        break;
                      case "Adiantamento":
                        cellContent = `- R$ ${payment.advanceMoney}`;
                        break;
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
                            <Button variant="ghost" size="icon">
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
