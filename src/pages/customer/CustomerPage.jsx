import {FiltroCollapse} from "@/components/FiltroCollapse.jsx";

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
    return <FiltroCollapse campos={CAMPOS} />
}
export default CustomerPage;