import { useEffect } from "react";

function Modal({ isOpen, onClose, player, darkMode, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !player) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-card ${darkMode ? "dark" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <h2 className="modal-player-name">{player.nombre}</h2>
          <div className="modal-header-row">
            <span className={`badge badge--${player.posicion.toLowerCase().replace("á", "a")}`}>
              {player.posicion}
            </span>
            <button
              className={`fav-btn-modal ${isFavorite ? "fav-active" : ""}`}
              onClick={() => onToggleFavorite(player.id)}
            >
              {isFavorite ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
            </button>
          </div>
        </div>

        <div className="modal-grid">
          <div className="modal-info-block">
            <span className="modal-info-label">Club</span>
            <span className="modal-info-value">{player.club}</span>
          </div>
          <div className="modal-info-block">
            <span className="modal-info-label">País</span>
            <span className="modal-info-value">{player.pais}</span>
          </div>
          <div className="modal-info-block">
            <span className="modal-info-label">Edad</span>
            <span className="modal-info-value">{player.edad} años</span>
          </div>
          <div className="modal-info-block">
            <span className="modal-info-label">Goles</span>
            <span className="modal-info-value">{player.goles}</span>
          </div>
          <div className="modal-info-block">
            <span className="modal-info-label">Asistencias</span>
            <span className="modal-info-value">{player.asistencias}</span>
          </div>
        </div>

        <div className="modal-rating">
          <span className="modal-rating-number">{player.rating}</span>
        </div>

        <button className="modal-btn-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
