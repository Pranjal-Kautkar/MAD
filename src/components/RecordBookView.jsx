// RecordBookView.jsx - Complete Lab Record Book entry with Aim, Algorithm, Code, and Screenshot Simulator
import React, { useState } from 'react';
import { Copy, Check, Printer, FileCode, CheckSquare, Sparkles, BookOpen, Terminal, Layers } from 'lucide-react';

export default function RecordBookView({ practical, onToast }) {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    if (onToast) onToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!practical) return null;

  return (
    <div className="record-book-container">
      {/* Top action banner */}
      <div className="record-action-header">
        <div>
          <span className="record-badge">Practical Record Book</span>
          <h2 className="record-title">Practical {practical.id}: {practical.title}</h2>
          <span className="record-expo-tag">Expo SDK 54 • TypeScript / TSX</span>
        </div>
        <div className="record-header-buttons">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => copyText(practical.code, 'Full index.tsx Code')}
          >
            {copiedItem === 'Full index.tsx Code' ? <Check size={14} /> : <Copy size={14} />}
            <span>Copy Full Code</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handlePrint}
            title="Print or Save as PDF for college submission"
          >
            <Printer size={14} />
            <span>Print Lab Record</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet View */}
      <div className="record-sheet">
        {/* Aim Section */}
        <div className="record-section">
          <div className="section-label-bar">
            <span className="section-number">1</span>
            <h3 className="section-title">Aim</h3>
          </div>
          <div className="section-content aim-box">
            <p>{practical.aim}</p>
          </div>
        </div>

        {/* Step 1: Project Creation */}
        <div className="record-section">
          <div className="section-label-bar">
            <span className="section-number">2</span>
            <h3 className="section-title">Step 1: Create the project (Commands)</h3>
          </div>
          <div className="section-content">
            <div className="command-terminal-box">
              <div className="terminal-header">
                <span className="term-dot red"></span>
                <span className="term-dot yellow"></span>
                <span className="term-dot green"></span>
                <span className="term-title">PowerShell / Command Prompt</span>
                <button
                  type="button"
                  className="terminal-copy-btn"
                  onClick={() => copyText(practical.step1, 'Step 1 Commands')}
                >
                  {copiedItem === 'Step 1 Commands' ? <Check size={13} /> : <Copy size={13} />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="terminal-pre">
                <code>{practical.step1}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Step 2: Extra Packages */}
        <div className="record-section">
          <div className="section-label-bar">
            <span className="section-number">3</span>
            <h3 className="section-title">Step 2: Install extra packages</h3>
          </div>
          <div className="section-content">
            <div className="packages-box">
              {practical.step2 === 'None needed.' ? (
                <span className="pkg-none">None needed</span>
              ) : (
                <div className="command-terminal-box">
                  <div className="terminal-header">
                    <span className="term-title">Terminal</span>
                    <button
                      type="button"
                      className="terminal-copy-btn"
                      onClick={() => copyText(practical.step2, 'Step 2 Command')}
                    >
                      {copiedItem === 'Step 2 Command' ? <Check size={13} /> : <Copy size={13} />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="terminal-pre">
                    <code>{practical.step2}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Supabase Specific SQL & lib/supabase.ts if present */}
        {practical.step3Sql && (
          <div className="record-section">
            <div className="section-label-bar">
              <span className="section-number">★</span>
              <h3 className="section-title">Step 3: Create the Supabase Table (SQL)</h3>
            </div>
            <div className="section-content">
              <div className="command-terminal-box">
                <div className="terminal-header">
                  <span className="term-title">Supabase SQL Editor</span>
                  <button
                    type="button"
                    className="terminal-copy-btn"
                    onClick={() => copyText(practical.step3Sql, 'SQL Script')}
                  >
                    {copiedItem === 'SQL Script' ? <Check size={13} /> : <Copy size={13} />}
                    <span>Copy SQL</span>
                  </button>
                </div>
                <pre className="terminal-pre">
                  <code>{practical.step3Sql}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {practical.step4File && (
          <div className="record-section">
            <div className="section-label-bar">
              <span className="section-number">★</span>
              <h3 className="section-title">Step 4: Create lib/supabase.ts Connection File</h3>
            </div>
            <div className="section-content">
              <div className="command-terminal-box">
                <div className="terminal-header">
                  <span className="term-title">lib/supabase.ts</span>
                  <button
                    type="button"
                    className="terminal-copy-btn"
                    onClick={() => copyText(practical.step4File, 'lib/supabase.ts')}
                  >
                    {copiedItem === 'lib/supabase.ts' ? <Check size={13} /> : <Copy size={13} />}
                    <span>Copy File</span>
                  </button>
                </div>
                <pre className="terminal-pre">
                  <code>{practical.step4File}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Algorithm */}
        <div className="record-section">
          <div className="section-label-bar">
            <span className="section-number">4</span>
            <h3 className="section-title">Step 3: Algorithm (As written in Practical Record)</h3>
          </div>
          <div className="section-content">
            <ol className="algorithm-steps-list">
              {practical.algorithm.map((step, idx) => (
                <li key={idx} className="algo-step-item">
                  <span className="step-idx">{idx + 1}.</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Complete Source Code for app/index.tsx */}
        <div className="record-section">
          <div className="section-label-bar">
            <span className="section-number">5</span>
            <h3 className="section-title">Source Code (app/index.tsx)</h3>
          </div>
          <div className="section-content">
            <div className="code-viewer-box">
              <div className="code-header">
                <div className="code-file-tag">
                  <FileCode size={14} />
                  <span>app/index.tsx</span>
                </div>
                <button
                  type="button"
                  className="terminal-copy-btn"
                  onClick={() => copyText(practical.code, 'Source Code')}
                >
                  {copiedItem === 'Source Code' ? <Check size={13} /> : <Copy size={13} />}
                  <span>Copy Code</span>
                </button>
              </div>
              <pre className="code-pre">
                <code>{practical.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="record-section">
          <div className="section-label-bar">
            <span className="section-number">6</span>
            <h3 className="section-title">Output & Verification</h3>
          </div>
          <div className="section-content output-box">
            <p className="output-text">
              <strong>Expected Result:</strong> {practical.sampleOutput}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
