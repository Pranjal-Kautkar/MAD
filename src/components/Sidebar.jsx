// Sidebar.jsx - Navigation drawer for all 8 Practicals
import React from 'react';
import {
  CloudSun,
  Calculator,
  CheckSquare,
  Camera,
  ShoppingCart,
  SearchCheck,
  UserCheck,
  GraduationCap,
  Database,
  HelpCircle,
  Smartphone,
  ChevronRight,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { PRACTICALS } from '../data/practicalData';

const PRACTICAL_ICONS = {
  1: CloudSun,
  2: Calculator,
  3: CheckSquare,
  4: Camera,
  5: ShoppingCart,
  6: SearchCheck,
  7: UserCheck,
  8: GraduationCap
};

export default function Sidebar({
  activePracticalId,
  onSelectPractical,
  onOpenSupabase,
  onOpenTroubleshoot,
  isOpen,
  onClose
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-mobile-backdrop" onClick={onClose} />}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand header */}
        <div className="sidebar-brand">
          <div className="brand-logo-glow">
            <Smartphone size={24} className="brand-icon" />
          </div>
          <div>
            <h1 className="brand-title">React Native</h1>
            <p className="brand-subtitle">Expo SDK 54 Practical Record</p>
          </div>
        </div>

        {/* Practicals Nav List */}
        <div className="sidebar-nav-container">
          <div className="nav-group-header">
            <span>Eight Practicals (Record Book)</span>
            <span className="practical-count">8 Total</span>
          </div>

          <nav className="practical-nav-list">
            {PRACTICALS.map((prac) => {
              const IconComp = PRACTICAL_ICONS[prac.id] || Sparkles;
              const isActive = prac.id === activePracticalId;

              return (
                <button
                  key={prac.id}
                  type="button"
                  className={`practical-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    onSelectPractical(prac.id);
                    if (onClose) onClose();
                  }}
                >
                  <div className="nav-item-left">
                    <span className="prac-num-badge">P{prac.id}</span>
                    <div className="prac-meta">
                      <span className="prac-name">{prac.title}</span>
                      <span className="prac-category">{prac.category}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="nav-arrow" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools & Helper Actions */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="footer-action-btn supabase-btn"
            onClick={onOpenSupabase}
          >
            <Database size={16} />
            <span>Supabase Config</span>
          </button>

          <button
            type="button"
            className="footer-action-btn help-btn"
            onClick={onOpenTroubleshoot}
          >
            <HelpCircle size={16} />
            <span>Troubleshooting</span>
          </button>

          <div className="sidebar-lab-info">
            <div className="info-dot"></div>
            <span>Expo SDK 54 • Node.js v18+</span>
          </div>
        </div>
      </aside>
    </>
  );
}
