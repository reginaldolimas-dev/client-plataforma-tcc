import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { Tabela } from "@/components/Tabela.jsx";
import { Button, Col, Row } from "antd";
import { Pagina } from "@/components/Layout/Pagina.jsx";
import { CustomerModal } from "@/pages/customer/components/CustomerModal.jsx";
import { useState } from "react";

function CustomerPage() {
    const [isModalVisible, setModalVisible] = useState(false);

    function aoFechar() {
        setModalVisible(false);
    }

    const CAMPOS = [
        {
            key: 'nome',
            label: 'Nome',
            tipo: 'input',
            obrigatorio: true,
            propriedades: { placeholder: 'Digite seu nome' },
        },
        {
            key: 'idade',
            label: 'Idade',
            tipo: 'input',
            propriedades: { type: 'number' },
        }
        ]
    return <Pagina titulo="Pesquisa de Clientes" acoes={<Button onClick={setModalVisible} type={"primary"}>Novo Cliente</Button>}>
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <FiltroCollapse campos={CAMPOS} />
            </Col>
            <Col span={24}>
                <Tabela />
            </Col>
        </Row>
        <CustomerModal visivel={isModalVisible} aoFechar={aoFechar} />
    </Pagina>
}
export default CustomerPage;