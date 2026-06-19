import { Card, Statistic } from 'antd';

function CardEstatistica({ titulo, valor, prefixo, sufixo, icone, cor }) {
  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: '8px' }}>
      <Statistic
        title={titulo}
        value={valor}
        prefix={icone ? <span style={{ marginRight: 8 }}>{icone}</span> : prefixo}
        suffix={sufixo}
        valueStyle={{ color: cor || '#2f54eb', fontWeight: 'bold' }}
      />
    </Card>
  );
}

export default CardEstatistica;
