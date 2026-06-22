import {FiltroCollapse} from "@/components/FiltroCollapse.jsx";
import {Tabela} from "@/components/Tabela.jsx";
import {Fragment} from "react";
import {Col, Row} from "antd";

function CustomerPage() {

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
    return <Fragment>
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <FiltroCollapse campos={CAMPOS} />
            </Col>
            <Col span={24}>
                <Tabela />
            </Col>
        </Row>
    </Fragment>
}
export default CustomerPage;