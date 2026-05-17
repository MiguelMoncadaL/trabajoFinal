import { useState, useEffect, useMemo } from "react";
import { players as allPlayers } from "./data/players";
import SearchBar from "./components/SearchBar";
import PlayerTable from "./components/PlayerTable";
import Pagination from "./components/Pagination";
import StatsPanel from "./components/StatsPanel";
import Modal from "./components/Modal";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-body", darkMode);
  }, [darkMode]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      setSearchHistory((prev) => {
        const updated = [debouncedSearch, ...prev.filter((s) => s !== debouncedSearch)];
        return updated.slice(0, 5);
      });
    }
  }, [debouncedSearch]);
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const [rowColors, setRowColors] = useState("none");

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        const next = { asc: "desc", desc: "none", none: "asc" }[prev.direction];
        return { key: next === "none" ? null : key, direction: next };
      }
      return { key, direction: "asc" };
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, showOnlyFavorites, sortConfig, itemsPerPage]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (player) => { setSelectedPlayer(player); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedPlayer(null); };

  const filteredPlayers = useMemo(() => {
    let list = [...allPlayers];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((p) =>
        p.nombre.toLowerCase().includes(q) || p.club.toLowerCase().includes(q)
      );
    }
    if (showOnlyFavorites) {
      list = list.filter((p) => favorites.includes(p.id));
    }
    if (sortConfig.key && sortConfig.direction !== "none") {
      list.sort((a, b) => {
        const va = a[sortConfig.key];
        const vb = b[sortConfig.key];
        if (typeof va === "string")
          return sortConfig.direction === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
        return sortConfig.direction === "asc" ? va - vb : vb - va;
      });
    }
    return list;
  }, [debouncedSearch, showOnlyFavorites, favorites, sortConfig]);

  const statsPlayers = useMemo(() => {
    return filteredPlayers.map((p) => ({ ...p, _isFavorite: favorites.includes(p.id) }));
  }, [filteredPlayers, favorites]);

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / itemsPerPage));
  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPlayers.slice(start, start + itemsPerPage);
  }, [filteredPlayers, currentPage, itemsPerPage]);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className={`header ${darkMode ? "dark" : ""}`}>
        <div className="header-content">
          <div>
            <p className="header-subtitle">TOP CLUB SOCCER</p>
            <h1 className="header-title">Dashboard de Jugadores</h1>
            <p className="header-desc">
              Gestiona tus estrellas favoritas, analiza estadísticas y descubre talentos.
            </p>
          </div>
          <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((d) => !d)} />
        </div>
      </header>

      <main className={`main ${darkMode ? "dark" : ""}`}>
        <SearchBar
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          onClear={() => { setSearchTerm(""); setDebouncedSearch(""); }}
          resultsCount={filteredPlayers.length}
        />

        <StatsPanel
          players={statsPlayers}
          darkMode={darkMode}
          searchHistory={searchHistory}
          onSelectSearch={(term) => setSearchTerm(term)}
          onClearHistory={() => { setSearchHistory([]); localStorage.removeItem("searchHistory"); }}
        />

        <div className="row-colors-controls">
          <button className={`color-btn ${rowColors === "pares" ? "active" : ""}`} onClick={() => setRowColors("pares")}>
            Pintar filas pares
          </button>
          <button className={`color-btn ${rowColors === "impares" ? "active" : ""}`} onClick={() => setRowColors("impares")}>
            Pintar filas impares
          </button>
          <button className="color-btn color-btn--clear" onClick={() => setRowColors("none")}>
            Limpiar color
          </button>
          <button className={`color-btn color-btn--fav ${showOnlyFavorites ? "active" : ""}`} onClick={() => setShowOnlyFavorites((s) => !s)}>
            {showOnlyFavorites ? "★ Solo favoritos" : "☆ Mostrar favoritos"}
          </button>
        </div>

        <PlayerTable
          players={paginatedPlayers}
          onRowClick={openModal}
          onSort={handleSort}
          sortConfig={sortConfig}
          darkMode={darkMode}
          rowColors={rowColors}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={filteredPlayers.length}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        player={selectedPlayer}
        darkMode={darkMode}
        isFavorite={selectedPlayer ? favorites.includes(selectedPlayer.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
