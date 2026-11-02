// PhoneFrame.jsx - Realistic Mobile Simulator mimicking Expo Go on mobile
import React, { useState } from 'react';
import { Wifi, Battery, RotateCcw, Smartphone, ShieldCheck, ChevronLeft } from 'lucide-react';

export default function PhoneFrame({ children, activePractical, onRefresh }) {
  const [currentTime] = useState('09:41');

  return (
    <div className="phone-simulator-wrapper">
      <div className="phone-device-bezel">
        {/* Dynamic Island / Speaker notch */}
        <div className="phone-dynamic-island">
          <div className="island-camera"></div>
          <div className="island-sensor"></div>
        </div>

        {/* Mobile Status Bar */}
        <div className="phone-status-bar">
          <div className="status-time">{currentTime}</div>
          <div className="status-icons">
            <span className="network-pill">5G</span>
            <Wifi size={13} />
            <div className="battery-badge">
              <span className="battery-level"></span>
              <Battery size={15} />
            </div>
          </div>
        </div>

        {/* Expo Go Header Bar */}
        <div className="expo-go-topbar">
          <div className="expo-info">
            <span className="expo-badge">Expo Go</span>
            <span className="expo-project-title">
              {activePractical ? activePractical.projectName : 'Expo App'}
            </span>
            <span className="expo-sdk-pill">SDK 54</span>
          </div>
          <button
            type="button"
            className="expo-refresh-btn"
            onClick={onRefresh}
            title="Reload app bundle (Expo Start -c)"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Screen Content Area */}
        <div className="phone-screen-viewport">
          {children}
        </div>

        {/* Bottom Navigation & iOS Home Indicator */}
        <div className="phone-bottom-bar">
          <div className="phone-home-indicator"></div>
        </div>
      </div>
    </div>
  );
}
