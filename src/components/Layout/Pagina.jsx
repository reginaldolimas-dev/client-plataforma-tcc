import { Card } from "antd";

export function Pagina({titulo, acoes, children}) {
  function PaginaAcoes(){
    return <span>{acoes}</span>
  }

  return (
    <Card title={titulo.toUpperCase()} extra={<PaginaAcoes />}>
      {children}
    </Card>
  )
}
