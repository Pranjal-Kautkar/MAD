// SupabaseConfigModal.jsx - Settings for Supabase Cloud connection or Local Mock mode
import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, Shield, AlertCircle, RefreshCw, Key } from 'lucide-react';
import { getStoredConfig, saveStoredConfig } from '../data/mockStore';
import { createClient } from '@supabase/supabase-js';

export default function SupabaseConfigModal({ isOpen, onClose, onToast }) {
  if (!isOpen) return null;

  const currentConfig = getStoredConfig();
  const [url, setUrl] = useState(currentConfig.url || '');
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey || '');
  const [useMock, setUseMock] = useState(currentConfig.useMock ?? true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [activeSqlTab, setActiveSqlTab] = useState('items');

  const handleSave = () => {
    saveStoredConfig({ url, anonKey, useMock });
    if (onToast) onToast('Supabase settings updated! Reloading app...', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  const handleTestConnection = async () => {
    if (!url || !anonKey) {
      setTestResult({ success: false, message: 'Please provide both URL and Publishable Key to test.' });
      return;
    }
    setTesting(true);
    setTestResult(null);

    try {
      const client = createClient(url, anonKey);
      const { data, error } = await client.from('items').select('count', { count: 'exact', head: true });
      if (error && error.code !== 'PGRST116') {
        // Table might not exist or auth issue
        setTestResult({
          success: false,
          message: `Connected to Supabase, but query gave error: ${error.message}. Make sure you ran the SQL table creation script in your Supabase SQL Editor!`
        });
      } else {
        setTestResult({
          success: true,
          message: 'Connection successful! Supabase project reached and responding.'
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `Failed to connect: ${err.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    if (onToast) onToast(`Copied ${label} to clipboard!`, 'info');
  };

  const ITEMS_SQL = `create table items (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  type text not null,
  place text,
  phone text
);
alter table items enable row level security;
create policy "public access" on items for all using (true) with check (true);`;

  const STUDENTS_SQL = `create table students (
  id bigint generated always as identity primary key,
  name text not null,
  roll_no text not null,
  course text,
  marks numeric
);
alter table students enable row level security;
create policy "public access" on students for all using (true) with check (true);`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog supabase-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Database className="modal-icon" size={22} />
            <div>
              <h3>Supabase Backend Configuration</h3>
              <p>Configure credentials for Practicals 6, 7 & 8</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Mode Switch Card */}
          <div className="config-card">
            <div className="mode-toggle-row">
              <div>
                <h4 className="card-heading">Persistence Mode</h4>
                <p className="card-sub">
                  {useMock
                    ? 'Using Built-in Local Storage (Ready out-of-the-box, no Supabase account required)'
                    : 'Connecting directly to your live Supabase Cloud project'}
                </p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!useMock}
                  onChange={(e) => setUseMock(!e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Credentials Inputs (Enabled when not using mock or optional) */}
          <div className={`config-card credentials-card ${useMock ? 'dimmed' : ''}`}>
            <h4 className="card-heading">Supabase Project API Credentials</h4>
            <p className="card-sub">Found in Supabase Dashboard → Project Settings → API</p>

            <div className="form-group">
              <label>Project URL:</label>
              <input
                type="text"
                className="input-control"
                placeholder="https://your-project-id.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Publishable / Anon Key (starts with sb_publishable_...):</label>
              <input
                type="password"
                className="input-control"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
              />
            </div>

            <div className="test-btn-row">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleTestConnection}
                disabled={testing}
              >
                {testing ? <RefreshCw size={14} className="spin" /> : <Key size={14} />}
                <span>Test Live Connection</span>
              </button>

              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="external-link"
              >
                <span>Supabase Dashboard</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {testResult && (
              <div className={`test-feedback ${testResult.success ? 'success' : 'error'}`}>
                {testResult.success ? <Check size={16} /> : <AlertCircle size={16} />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* SQL Setup Helper */}
          <div className="config-card sql-helper-card">
            <div className="sql-card-header">
              <div>
                <h4 className="card-heading">SQL Table Setup Scripts</h4>
                <p className="card-sub">Copy and run in Supabase SQL Editor as required by the record book</p>
              </div>
              <div className="sql-tab-buttons">
                <button
                  type="button"
                  className={`sql-tab ${activeSqlTab === 'items' ? 'active' : ''}`}
                  onClick={() => setActiveSqlTab('items')}
                >
                  Practical 6 (items)
                </button>
                <button
                  type="button"
                  className={`sql-tab ${activeSqlTab === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveSqlTab('students')}
                >
                  Practical 8 (students)
                </button>
              </div>
            </div>

            <div className="code-snippet-box">
              <button
                type="button"
                className="snippet-copy-btn"
                onClick={() =>
                  copyToClipboard(
                    activeSqlTab === 'items' ? ITEMS_SQL : STUDENTS_SQL,
                    `SQL for ${activeSqlTab}`
                  )
                }
              >
                <Copy size={13} /> Copy SQL
              </button>
              <pre>
                <code>{activeSqlTab === 'items' ? ITEMS_SQL : STUDENTS_SQL}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
