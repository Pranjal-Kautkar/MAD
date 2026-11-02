// App.jsx - Main Dashboard hosting all 8 React Native practicals in one web application
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PhoneFrame from './components/PhoneFrame';
import RecordBookView from './components/RecordBookView';
import SupabaseConfigModal from './components/SupabaseConfigModal';
import TroubleshootingModal from './components/TroubleshootingModal';
import Toast from './components/Toast';

import { PRACTICALS } from './data/practicalData';

// Practicals Components
import Practical1Weather from './practicals/Practical1Weather';
import Practical2Calculator from './practicals/Practical2Calculator';
import Practical3Todo from './practicals/Practical3Todo';
import Practical4Camera from './practicals/Practical4Camera';
import Practical5Cart from './practicals/Practical5Cart';
import Practical6LostFound from './practicals/Practical6LostFound';
import Practical7Auth from './practicals/Practical7Auth';
import Practical8Student from './practicals/Practical8Student';

export default function App() {
  const [activePracticalId, setActivePracticalId] = useState(1);
  const [activeTab, setActiveTab] = useState('app'); // 'app' | 'record'
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'expanded'
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isTroubleshootModalOpen, setIsTroubleshootModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  // Sync theme attribute with document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const activePractical =
    PRACTICALS.find((p) => p.id === activePracticalId) || PRACTICALS[0];

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRefreshApp = () => {
    setReloadKey((prev) => prev + 1);
    addToast(`Reloaded ${activePractical.projectName} bundle`, 'info');
  };

  // Render the active practical component
  const renderPracticalComponent = () => {
    const commonProps = {
      key: `${activePracticalId}-${reloadKey}`,
      onToast: addToast,
      onOpenSupabaseModal: () => setIsSupabaseModalOpen(true)
    };

    switch (activePracticalId) {
      case 1:
        return <Practical1Weather {...commonProps} />;
      case 2:
        return <Practical2Calculator {...commonProps} />;
      case 3:
        return <Practical3Todo {...commonProps} />;
      case 4:
        return <Practical4Camera {...commonProps} />;
      case 5:
        return <Practical5Cart {...commonProps} />;
      case 6:
        return <Practical6LostFound {...commonProps} />;
      case 7:
        return <Practical7Auth {...commonProps} />;
      case 8:
        return <Practical8Student {...commonProps} />;
      default:
        return <Practical1Weather {...commonProps} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar with all 8 practicals */}
      <Sidebar
        activePracticalId={activePracticalId}
        onSelectPractical={(id) => {
          setActivePracticalId(id);
          addToast(`Loaded Practical ${id}: ${PRACTICALS.find((p) => p.id === id)?.title}`);
        }}
        onOpenSupabase={() => setIsSupabaseModalOpen(true)}
        onOpenTroubleshoot={() => setIsTroubleshootModalOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main-content-wrapper">
        {/* Top Header */}
        <Header
          activePractical={activePractical}
          viewMode={viewMode}
          onToggleViewMode={() =>
            setViewMode((prev) => (prev === 'phone' ? 'expanded' : 'phone'))
          }
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenSupabase={() => setIsSupabaseModalOpen(true)}
        />

        {/* Main Stage Content */}
        <main className="stage-container">
          {activeTab === 'app' ? (
            viewMode === 'phone' ? (
              <PhoneFrame
                activePractical={activePractical}
                onRefresh={handleRefreshApp}
              >
                {renderPracticalComponent()}
              </PhoneFrame>
            ) : (
              <div className="expanded-view-container">
                <div className="expanded-inner-card">
                  {renderPracticalComponent()}
                </div>
              </div>
            )
          ) : (
            <RecordBookView practical={activePractical} onToast={addToast} />
          )}
        </main>
      </div>

      {/* Modals */}
      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onToast={addToast}
      />

      <TroubleshootingModal
        isOpen={isTroubleshootModalOpen}
        onClose={() => setIsTroubleshootModalOpen(false)}
        onToast={addToast}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
