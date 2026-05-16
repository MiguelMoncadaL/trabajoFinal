import PlayerRow from "./PlayerRow";

const COLUMNS = [
  { key: "nombre", label: "JUGADOR" },
  { key: "club", label: "CLUB" },
  { key: "posicion", label: "POSICIÓN" },
  { key: "pais", label: "PAÍS" },
  { key: "edad", label: "EDAD" },
  { key: "goles", label: "GOLES" },
  { key: "asistencias", label: "ASISTENCIAS" },
  { key: "rating", label: "RATING" },
];

function SortIcon({ direction }) {
  if (direction === "asc") return <span className="sort-icon"> ↑</span>;
  if (direction === "desc") return <span className="sort-icon"> ↓</span>;
  return <span className="sort-icon sort-icon--none"> ⇅</span>;
}

function PlayerTable({ players, onRowClick, onSort, sortConfig, darkMode, rowColors, favorites, onToggleFavorite }) {
  const getSortDir = (key) => {
    if (sortConfig.key === key) return sortConfig.direction;
    return "none";
  };

  const getColorClass = (index) => {
    if (rowColors === "pares" && index % 2 === 1) return "row--even";
    if (rowColors === "impares" && index % 2 === 0) return "row--odd";
    return "";
  };

  return (
    <div className={`table-wrapper ${darkMode ? "dark" : ""}`}>
      <table className="players-table">
        <thead>
          <tr className={darkMode ? "dark" : ""}>
            <th>FAV</th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => onSort(col.key)}
                className="sortable-th"
              >
                {col.label}
                <SortIcon direction={getSortDir(col.key)} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-results">No se encontraron jugadores.</td>
            </tr>
          ) : (
            players.map((player, index) => (
              <PlayerRow
                key={player.id}
                player={player}
                index={index}
                onClick={onRowClick}
                isFavorite={favorites.includes(player.id)}
                onToggleFavorite={onToggleFavorite}
                darkMode={darkMode}
                colorClass={getColorClass(index)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerTable;
