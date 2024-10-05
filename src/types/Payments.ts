export type Payment = {
  id?: string;
  nameEmployee: string;
  salary: string;
  store: string;
  datePayment: string;
  overTime?: string | null;
  bonification?: string | null;
  advanceMoney?: string | null;
  cardLoan?: string | null;
  discounts: string | null;
  salaryTotal: string;
};
