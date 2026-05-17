function SearchBar({ value, onChange, onClear, resultsCount }) {
  return (
    <div className="search-section">
      <label className="search-label">BUSCAR JUGADORES</label>
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Escribe un nombre o club..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button className="clear-btn" onClick={onClear}>✕</button>
        )}
      </div>
      {value && (
        <p className="results-count">Mostrando {resultsCount} resultado{resultsCount !== 1 ? "s" : ""}</p>
      )}
    </div>
  );
}

export default SearchBar;
