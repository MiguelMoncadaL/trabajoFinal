function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, totalItems }) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">
        <label>MOSTRAR</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="per-page-select"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
        <span className="showing-info">
          Mostrando {totalItems === 0 ? 0 : start}-{end} de {totalItems} registros
        </span>
      </div>
      <div className="pagination-controls">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="page-btn">«</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="page-btn">‹</button>
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-btn ${page === currentPage ? "page-btn--active" : ""}`}
          >
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="page-btn">›</button>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className="page-btn">»</button>
      </div>
    </div>
  );
}

export default Pagination;
