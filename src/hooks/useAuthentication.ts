import { Users } from "../constants/User";

export const useAuthentication = () => {
  const login = (data: { email: string; password: string }) => {
    console.log("chegou a data do login", data);

    const res = Users;
    console.log("chegou aqui no  res", res);
    if (data.email === res.email && data.password === res.senha) {
      alert("Login efetuado com sucesso");
      localStorage.setItem("login", "true");
      window.location.reload();
    } else {
      alert("Email ou senha inválidos");
    }
  };
  return { login };
};
