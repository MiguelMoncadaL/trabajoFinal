import { useMemo } from "react";

function StatsPanel({ players, allPlayers, darkMode, searchHistory, onSelectSearch, onClearHistory }) {
  const stats = useMemo(() => {
    if (players.length === 0) {
      return { total: 0, avgGoals: 0, avgAge: 0, topScorer: null, favoritesCount: 0 };
    }
    const total = players.length;
    const avgGoals = (players.reduce((sum, p) => sum + p.goles, 0) / total).toFixed(1);
    const avgAge = Math.round(players.reduce((sum, p) => sum + p.edad, 0) / total);
    const topScorer = players.reduce((max, p) => (p.goles > max.goles ? p : max), players[0]);
    return { total, avgGoals, avgAge, topScorer };
  }, [players]);

  const favoritesCount = useMemo(() => {
    return players.filter(p => p._isFavorite).length;
  }, [players]);

  return (
    <div className={`stats-panel ${darkMode ? "dark" : ""}`}>
      <div className="stat-card stat-card--highlight">
        <p className="stat-label">JUGADORES EN TABLA</p>
        <p className="stat-number">{stats.total}</p>
        <span className="stat-favorites">Favoritos: {favoritesCount}</span>
      </div>

      <div className="stat-card">
        <p className="stat-label">PROMEDIO DE GOLES</p>
        <p className="stat-value-big">{stats.avgGoals}</p>
        <p className="stat-sub">Total goles: {players.reduce((s, p) => s + p.goles, 0)}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">PROMEDIO DE EDAD</p>
        <p className="stat-value-big">{stats.avgAge} años</p>
        <p className="stat-sub">Total asistencias: {players.reduce((s, p) => s + p.asistencias, 0)}</p>
      </div>

      <div className={`stat-card stat-card--dark ${darkMode ? "dark" : ""}`}>
        <p className="stat-label">MÁXIMO GOLEADOR</p>
        <p className="stat-top-scorer">{stats.topScorer ? stats.topScorer.nombre : "—"}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">
          HISTORIAL DE BÚSQUEDA
          {searchHistory.length > 0 && (
            <button className="clear-history-btn" onClick={onClearHistory}>Limpiar</button>
          )}
        </p>
        {searchHistory.length === 0 ? (
          <p className="stat-sub">Aún no hay búsquedas recientes.</p>
        ) : (
          <div className="history-tags">
            {searchHistory.map((term, i) => (
              <button key={i} className="history-tag" onClick={() => onSelectSearch(term)}>
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsPanel;
