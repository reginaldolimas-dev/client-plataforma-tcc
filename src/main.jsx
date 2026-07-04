import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import ptBR from "antd/locale/pt_BR";

dayjs.locale("pt-br");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
