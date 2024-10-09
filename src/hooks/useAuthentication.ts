import { Users } from "../constants/User";

export const useAuthentication = () => {
  const login = (data: { email: string; password: string }) => {
    const res = Users;
    if (data.email === res.email && data.password === res.senha) {
      alert("Login efetuado com sucesso");
      localStorage.setItem("cookie", "true");
      window.location.reload();
    } else {
      alert("Email ou senha inválidos");
    }
  };
  return { login };
};
