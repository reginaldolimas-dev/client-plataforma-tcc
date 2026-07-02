import { Button } from "antd";

export default function ButtonCore({cor, children, tipo, icone, carregando, ...props}) {
  return (
    <Button type={tipo} color={cor} icon={icone} loading={carregando} {...props}>{children}</Button>
  )
}