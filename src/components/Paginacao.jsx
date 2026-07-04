import { Pagination } from "antd";

export function Paginacao({ paginacao, aoMudarPagina }) {
  return (
    <div style={{ display: "flex", justifyContent: "right", marginTop: "16px" }}>
      <Pagination
        showSizeChanger
        pageSize={Number(paginacao?.size) || 10}
        total={Number(paginacao?.total) || 0}
        current={Number(paginacao?.currentPage) || 1}
        onChange={aoMudarPagina}
      />
    </div>
  );
}
