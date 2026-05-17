function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button className={`theme-toggle ${darkMode ? "dark" : ""}`} onClick={onToggle}>
      {darkMode ? "☀ Modo claro" : "🌙 Modo oscuro"}
    </button>
  );
}

export default ThemeToggle;
