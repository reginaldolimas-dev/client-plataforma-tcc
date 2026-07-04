import { customerApi } from "@/services/apiFactory.js";

async function login(credenciais) {
  try {
    const response = await customerApi.post("/auth/login", credenciais);
    return response.data;
  } catch (error) {
    console.warn("API offline. Usando login de demonstração (mock) para fins de homologação.");
    throw error;
  }
}

async function logout() {
  try {
    await customerApi.post("/auth/logout");
  } catch (error) {
    console.warn("Não foi possível registrar o logout na API, limpando estado local.");
  }
}

const authService = { login, logout };

export default authService;
