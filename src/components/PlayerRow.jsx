function PlayerRow({ player, index, onClick, isFavorite, onToggleFavorite, darkMode, colorClass }) {
  const handleFavClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(player.id);
  };

  return (
    <tr
      className={`player-row ${colorClass} ${darkMode ? "dark" : ""}`}
      onClick={() => onClick(player)}
      style={{ cursor: "pointer" }}
    >
      <td>
        <button
          className={`fav-btn ${isFavorite ? "fav-active" : ""}`}
          onClick={handleFavClick}
          title={isFavorite ? "Quitar favorito" : "Agregar favorito"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </td>
      <td className="player-name">{player.nombre}</td>
      <td>{player.club}</td>
      <td>
        {player.posicion}
      </td>
      <td>{player.pais}</td>
      <td>{player.edad}</td>
      <td className="highlight">{player.goles}</td>
      <td>{player.asistencias}</td>
      <td className="highlight">{player.rating}</td>
    </tr>
  );
}

export default PlayerRow;
