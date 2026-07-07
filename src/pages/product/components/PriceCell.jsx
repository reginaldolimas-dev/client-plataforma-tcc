import { Popover } from "antd";
import { useRef } from "react";
import ButtonCore from "@/components/core/ButtonCore.jsx";

export function PriceCell({ price, conversions }) {
  const buttonRef = useRef(null);
  const currencyConfig = {
    BRL: { locale: "pt-BR", currency: "BRL", flag: "🇧🇷" },
    USD: { locale: "en-US", currency: "USD", flag: "🇺🇸" },
    EUR: { locale: "de-DE", currency: "EUR", flag: "🇪🇺" },
    GBP: { locale: "en-GB", currency: "GBP", flag: "🇬🇧" },
    CNY: { locale: "zh-CN", currency: "CNY", flag: "🇨🇳" },
  };

  function formatCurrency(value, code) {
    const cfg = currencyConfig[code] || { locale: "pt-BR", currency: "BRL" };
    return new Intl.NumberFormat(cfg.locale, {
      style: "currency",
      currency: cfg.currency,
    }).format(value);
  }

  const content = (
    <div>
      {Object.entries(conversions).map(([code, val]) => (
        <div
          key={code}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            padding: "4px 0",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <span>
            {currencyConfig[code]?.flag} {code}
          </span>
          <strong>{formatCurrency(val, code)}</strong>
        </div>
      ))}
    </div>
  );

  return (
    <Popover content={content} title="Preço em outras moedas" trigger="hover">
      <div ref={buttonRef}>
        <ButtonCore type="link" style={{ padding: 0, fontWeight: 500 }}>
          {formatCurrency(price, "BRL")}
        </ButtonCore>
      </div>
    </Popover>
  );
}
