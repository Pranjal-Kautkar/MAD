// TroubleshootingModal.jsx - Guide for common Expo & Supabase issues from page 12 of the practical record
import React from 'react';
import { X, HelpCircle, Terminal, AlertTriangle, ShieldAlert, Wifi, RotateCcw, Copy } from 'lucide-react';
import { COMMON_TROUBLESHOOTING } from '../data/practicalData';

export default function TroubleshootingModal({ isOpen, onClose, onToast }) {
  if (!isOpen) return null;

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    if (onToast) onToast(`Copied "${cmd}" to clipboard!`, 'info');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog troubleshooting-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <HelpCircle className="modal-icon warning" size={22} />
            <div>
              <h3>Common Problems & Solutions</h3>
              <p>Expo SDK 54 & Supabase Troubleshooting Cheatsheet</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="troubleshoot-list">
            {COMMON_TROUBLESHOOTING.map((item, idx) => (
              <div key={idx} className="troubleshoot-card">
                <div className="troubleshoot-card-header">
                  <span className="troubleshoot-number">{idx + 1}</span>
                  <h4 className="troubleshoot-title">{item.title}</h4>
                </div>
                <p className="troubleshoot-text">{item.solution}</p>
              </div>
            ))}
          </div>

          <div className="handy-commands-card">
            <h4>Essential Expo Terminal Commands</h4>
            <div className="command-chip-list">
              <div className="command-chip" onClick={() => copyCommand('npx.cmd create-expo-app@latest --template default@sdk-54')}>
                <code>npx.cmd create-expo-app@latest --template default@sdk-54</code>
                <Copy size={13} />
              </div>
              <div className="command-chip" onClick={() => copyCommand('npm run reset-project')}>
                <code>npm run reset-project</code>
                <Copy size={13} />
              </div>
              <div className="command-chip" onClick={() => copyCommand('npx expo start -c')}>
                <code>npx expo start -c (Clear Cache)</code>
                <Copy size={13} />
              </div>
              <div className="command-chip" onClick={() => copyCommand('npx expo start --tunnel')}>
                <code>npx expo start --tunnel (Fix Phone Wi-Fi Connection)</code>
                <Copy size={13} />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
