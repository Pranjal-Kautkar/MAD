// Practical 7: Login and Signup (Supabase Authentication)
// Email and password sign-up, login, and session persistence
import React, { useState, useEffect } from 'react';
import { getSupabase } from '../services/supabaseClient';
import { LogIn, UserPlus, LogOut, Mail, Lock, UserCheck, ShieldCheck, Database, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Practical7Auth({ onToast, onOpenSupabaseModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMock, setIsMock] = useState(true);

  // Step 4 & 5: Check existing session and listen for auth state changes
  useEffect(() => {
    const client = getSupabase();
    setIsMock(client.isMock);

    client.auth.getSession().then(({ data }) => {
      setSession(data?.session || null);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => {
      if (listener?.subscription?.unsubscribe) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  // Step 6: SIGNUP
  const signUp = async () => {
    if (email === '' || password === '') {
      if (onToast) onToast('Enter email and password', 'error');
      return;
    }

    setLoading(true);
    const client = getSupabase();
    const { data, error } = await client.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      if (onToast) onToast(`Signup failed: ${error.message}`, 'error');
    } else {
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
      if (onToast) onToast('Account created successfully!', 'success');
      if (data?.session) {
        setSession(data.session);
      }
    }
  };

  // Step 7: LOGIN
  const signIn = async () => {
    if (email === '' || password === '') {
      if (onToast) onToast('Enter email and password', 'error');
      return;
    }

    setLoading(true);
    const client = getSupabase();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      if (onToast) onToast(`Login failed: ${error.message}`, 'error');
    } else {
      if (onToast) onToast('Welcome back! Logged in successfully.', 'success');
      if (data?.session) {
        setSession(data.session);
      }
    }
  };

  // Step 8: LOGOUT
  const signOut = async () => {
    setLoading(true);
    const client = getSupabase();
    await client.auth.signOut();
    setSession(null);
    setLoading(false);
    if (onToast) onToast('Logged out successfully', 'info');
  };

  const autofillDemoUser = () => {
    setEmail('student@example.com');
    setPassword('password123');
    if (onToast) onToast('Sample credentials filled!', 'info');
  };

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 7</div>
        <h2 className="rn-heading">Authentication App</h2>
        <div
          className="rn-backend-badge"
          onClick={onOpenSupabaseModal}
          title="Click to configure Supabase"
        >
          <Database size={13} />
          <span>Auth: {isMock ? 'Local Mock Auth' : 'Supabase Cloud'}</span>
          <span className="config-hint">(Config)</span>
        </div>
      </div>

      {/* Step 9: If user is logged in, show the welcome screen */}
      {session ? (
        <div className="rn-auth-logged-in-card">
          <div className="rn-auth-avatar">
            <UserCheck size={40} className="avatar-icon" />
          </div>
          <h3 className="rn-welcome-title">Welcome!</h3>
          <p className="rn-logged-in-label">Logged in as</p>
          <p className="rn-user-email-tag">{session.user?.email}</p>

          <div className="rn-session-meta">
            <ShieldCheck size={16} />
            <span>Session verified & persisted</span>
          </div>

          <div className="rn-auth-actions">
            <button
              type="button"
              className="rn-button rn-button-danger"
              onClick={signOut}
              disabled={loading}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : (
        /* Step 10: Otherwise show the login form */
        <div className="rn-auth-form-card">
          <p className="rn-auth-subtitle">Sign in or create a student account</p>

          {/* Email input */}
          <div className="rn-input-group">
            <label className="rn-label">Email Address:</label>
            <div className="rn-search-box">
              <Mail size={16} className="rn-input-icon" />
              <input
                type="email"
                className="rn-text-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (e.g. student@example.com)"
                autoCapitalize="none"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="rn-input-group">
            <label className="rn-label">Password:</label>
            <div className="rn-search-box">
              <Lock size={16} className="rn-input-icon" />
              <input
                type="password"
                className="rn-text-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          {/* Login and Signup Action Buttons */}
          <div className="rn-button-stack" style={{ marginTop: '14px' }}>
            <button
              type="button"
              className="rn-button rn-button-primary"
              onClick={signIn}
              disabled={loading}
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>

            <button
              type="button"
              className="rn-button rn-button-secondary"
              onClick={signUp}
              disabled={loading}
            >
              <UserPlus size={16} />
              <span>Create account</span>
            </button>
          </div>

          {/* Quick Demo Credentials Autofill */}
          <div className="rn-demo-account-hint">
            <button
              type="button"
              className="rn-autofill-btn"
              onClick={autofillDemoUser}
            >
              <Key size={13} />
              <span>Fill Demo Credentials (student@example.com)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
