export type Payment = {
  nameEmployee: string;
  salary: number;
  store: string;
  datePayment: string;
  overTime?: string | null;
  advanceMoney?: string | null;
  cardLoan?: string | null;
  discounts: string | null;
  salaryTotal: number;
};
