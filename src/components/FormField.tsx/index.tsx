import { z } from "zod";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

export const User = z.object({
  nameEmployee: z.string().min(3, { message: "Nome Vazio ou muito curto!" }),
  store: z.string().min(3, { message: "Nome da Loja Vazio ou muito curta!" }),
  salary: z.string().min(1, { message: "Salario muito baixo!" }),
  datePayment: z.string().min(10, { message: "Data muito curta!" }),
  bonification: z.string().min(0, { message: "Bonificação muito baixa!" }),
  overTime: z.string().min(0, { message: "Horas extras muito baixa!" }),
  advanceMoney: z
    .string()
    .min(0, { message: "Dinheiro antecipado muito baixo!" }),
  cardLoan: z.string().min(0, { message: "Emprestimo em cartao muito baixo!" }),
  discounts: z.string().min(1, { message: "Descontos Vazio ou muito baixos!" }),
});

interface FormFieldProps {
  label: string;
  placeholder: string;
  type: "text" | "number" | "date";
  register: UseFormRegisterReturn;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  type,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-xs">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
