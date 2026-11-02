// Header.jsx - Top navigation and view switcher
import React from 'react';
import {
  Menu,
  Smartphone,
  Maximize2,
  Code2,
  BookOpen,
  Play,
  Sun,
  Moon,
  Database,
  Printer
} from 'lucide-react';

export default function Header({
  activePractical,
  viewMode,
  onToggleViewMode,
  activeTab,
  onSelectTab,
  darkMode,
  onToggleDarkMode,
  onOpenSidebar,
  onOpenSupabase
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={onOpenSidebar}
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-practical-info">
          <div className="header-badge-row">
            <span className="practical-pill">Practical {activePractical?.id}</span>
            <span className="category-pill">{activePractical?.category}</span>
          </div>
          <h2 className="header-title">{activePractical?.title}</h2>
        </div>
      </div>

      {/* Main Tab Controls: App Runner vs Algorithm/Code vs Printable Record */}
      <div className="header-center-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'app' ? 'active' : ''}`}
          onClick={() => onSelectTab('app')}
        >
          <Play size={15} />
          <span>Interactive App</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'record' ? 'active' : ''}`}
          onClick={() => onSelectTab('record')}
        >
          <BookOpen size={15} />
          <span>Algorithm & Code</span>
        </button>
      </div>

      <div className="header-right">
        {/* Phone Frame vs Expanded Toggle (only when in 'app' tab) */}
        {activeTab === 'app' && (
          <button
            type="button"
            className="header-icon-btn view-toggle"
            onClick={onToggleViewMode}
            title={viewMode === 'phone' ? 'Switch to Fullscreen View' : 'Switch to Phone Simulator'}
          >
            {viewMode === 'phone' ? (
              <>
                <Maximize2 size={16} />
                <span className="btn-label">Expanded</span>
              </>
            ) : (
              <>
                <Smartphone size={16} />
                <span className="btn-label">Phone Frame</span>
              </>
            )}
          </button>
        )}

        {/* Theme Toggle */}
        <button
          type="button"
          className="header-icon-btn theme-toggle"
          onClick={onToggleDarkMode}
          title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
