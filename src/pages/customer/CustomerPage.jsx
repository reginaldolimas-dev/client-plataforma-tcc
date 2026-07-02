import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { Tabela } from "@/components/Tabela.jsx";
import { Button, Col, Row } from "antd";
import { Pagina } from "@/components/Layout/Pagina.jsx";
import { CustomerModal } from "@/pages/customer/components/CustomerModal.jsx";
import { useState } from "react";
import { CUSTOMER_CAMPOS, CUSTOMER_COLUNAS } from "@/pages/customer/constants/customerConstants.jsx";
import customerService from "@/services/customerService.js";

function CustomerPage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [resultado, setResultado] = useState([]);

    async function aoPesquisar (filtros){
        try {
            setCarregando(true);

            const resposta = await customerService.listar(filtros);

            setResultado(resposta?.content);
        } catch (e) {
            console.error("Erro ao listar clientes", e);
        } finally {
            setCarregando(false);
        }
    };

    function recarregar() {
        aoPesquisar({});
    }

    function aoFechar() {
        setModalVisible(false);
    }

    return (
        <Pagina titulo="Pesquisa de Clientes" acoes={<Button onClick={() => setModalVisible(true)} type={"primary"}>Novo Cliente</Button>}>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <FiltroCollapse 
                        campos={CUSTOMER_CAMPOS}
                        aoPesquisar={aoPesquisar}
                    />
                </Col>
                <Col span={24}>
                    <Tabela dados={resultado} loading={carregando} colunas={CUSTOMER_COLUNAS} />
                </Col>
            </Row>
            <CustomerModal visivel={isModalVisible} aoFechar={aoFechar} aoSucesso={recarregar} />
        </Pagina>
    );
}

export default CustomerPage;