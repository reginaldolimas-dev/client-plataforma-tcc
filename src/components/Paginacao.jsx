import { Pagination } from "antd";

export function Paginacao({ paginacao, aoMudarPagina }) {
  return (
    <div style={{ display: "flex", justifyContent: "right", marginTop: "16px" }}>
      <Pagination
        showSizeChanger
        pageSize={Number(paginacao?.size)}
        total={Number(paginacao?.total)}
        current={Number(paginacao?.currentPage)}
        onChange={aoMudarPagina}
      />
    </div>
  );
}
