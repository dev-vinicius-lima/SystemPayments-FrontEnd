import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const authentication = useAuthentication();
  const { login } = authentication;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, password } = data as { email: string; password: string };
    console.log(data);
    login({ email, password });
  };
  return (
    <>
      <h1 className="px-4 py-4 my-10 text-2xl font-bold text-center bg-white rounded-lg shadow-lg">
        Gerenciamento de Pagamentos
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 px-6 bg-gray-100 rounded-lg shadow-lg w-80 lg:w-[500px] h-80 lg:h-96">
        <h1 className="mb-6 text-2xl font-bold">Seja Bem Vinda!</h1>
        <h2 className="mb-6 text-xl font-bold ">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full gap-6"
        >
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-10 px-2 mb-4 bg-slate-200"
              required
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full h-10 px-2 bg-slate-200"
              required
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="h-10 bg-[#D7B36A] hover:bg-[#d7b36ae0] transition-all w-[60%] rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
