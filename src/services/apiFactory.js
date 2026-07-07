import axios from "axios";

const SERVICE_URLS = {
  customer: import.meta.env.VITE_CUSTOMER_API_URL || "http://localhost:8081/api",
  product: import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:8082",
  sales: import.meta.env.VITE_SALES_API_URL || "http://localhost:8083",
  quotes: import.meta.env.VITE_QUOTES_API_URL || "http://localhost:8080",
};

function createApi(baseURL) {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const ehRotaLogin = error.config?.url?.includes("/login");
      if (error.response?.status === 401 && !ehRotaLogin) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export const customerApi = createApi(SERVICE_URLS.customer);
export const productApi = createApi(SERVICE_URLS.product);
export const salesApi = createApi(SERVICE_URLS.sales);
export const currencyApi = createApi(SERVICE_URLS.quotes);
