import { ModalCore } from "@/components/ModalCore.jsx";
import { Formulario } from "@/components/Formulario/Formulario.jsx";
import { message } from "antd";
import { CUSTOMER_CAMPOS_MODAL } from "@/pages/customer/constants/customerConstants.jsx";
import customerService from "@/services/customerService.js";
import { useState } from "react";

export function CustomerModal({ visivel, aoFechar, aoSucesso }) {

  const [carregando, setCarregando] = useState(false);


  async function aoEnviar (valores){
    try {
      setCarregando(true);
      const resposta = await customerService.criar(valores);
      message.success('Cliente cadastrado com sucesso!');
      if (aoSucesso) {
        aoSucesso();
      }
      aoFechar();
    } catch (e) {
      console.error("Erro ao salvar cliente", e);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ModalCore titulo="Novo Cliente" visible={visivel} onClose={aoFechar} exibirFooter={null}>
      <Formulario campos={CUSTOMER_CAMPOS_MODAL} aoEnviar={aoEnviar} carregando={carregando} />
    </ModalCore>
  );
}