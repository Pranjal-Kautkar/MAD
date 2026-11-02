// supabaseClient.js - Dual-mode Supabase connector
// Supports real @supabase/supabase-js AND built-in Mock Store fallback

import { createClient } from '@supabase/supabase-js';
import {
  getStoredConfig,
  getMockItems,
  saveMockItem,
  deleteMockItem,
  getMockStudents,
  saveMockStudent,
  deleteMockStudent,
  getMockSession,
  mockSignUp,
  mockSignIn,
  mockSignOut
} from '../data/mockStore';

let realClient = null;

export const initSupabase = () => {
  const config = getStoredConfig();
  if (config.url && config.anonKey && !config.useMock) {
    try {
      realClient = createClient(config.url, config.anonKey);
      return { client: realClient, isMock: false };
    } catch (e) {
      console.warn('Failed to init real Supabase client, falling back to mock:', e);
    }
  }
  realClient = null;
  return { client: null, isMock: true };
};

// Create a wrapper that matches Supabase syntax closely
export const getSupabase = () => {
  const config = getStoredConfig();
  if (config.url && config.anonKey && !config.useMock) {
    if (!realClient) {
      realClient = createClient(config.url, config.anonKey);
    }
    return {
      isMock: false,
      from: (table) => realClient.from(table),
      auth: realClient.auth
    };
  }

  // Fallback Mock implementation matching the exact Expo algorithm methods
  return {
    isMock: true,
    from: (table) => {
      if (table === 'items') {
        return {
          select: (fields) => ({
            order: (col, { ascending }) => {
              const data = getMockItems();
              return Promise.resolve({ data, error: null });
            }
          }),
          insert: (row) => {
            const next = saveMockItem(row);
            return Promise.resolve({ data: next, error: null });
          },
          update: (row) => ({
            eq: (col, val) => {
              const next = saveMockItem(row, val);
              return Promise.resolve({ data: next, error: null });
            }
          }),
          delete: () => ({
            eq: (col, val) => {
              const next = deleteMockItem(val);
              return Promise.resolve({ data: next, error: null });
            }
          })
        };
      }

      if (table === 'students') {
        return {
          select: (fields) => ({
            order: (col, { ascending }) => {
              const data = getMockStudents();
              return Promise.resolve({ data, error: null });
            }
          }),
          insert: (row) => {
            const next = saveMockStudent(row);
            return Promise.resolve({ data: next, error: null });
          },
          update: (row) => ({
            eq: (col, val) => {
              const next = saveMockStudent(row, val);
              return Promise.resolve({ data: next, error: null });
            }
          }),
          delete: () => ({
            eq: (col, val) => {
              const next = deleteMockStudent(val);
              return Promise.resolve({ data: next, error: null });
            }
          })
        };
      }

      return {
        select: () => Promise.resolve({ data: [], error: null })
      };
    },
    auth: {
      getSession: () => {
        const session = getMockSession();
        return Promise.resolve({ data: { session } });
      },
      onAuthStateChange: (callback) => {
        // Simple listener mechanism
        const listener = (event) => {
          const session = getMockSession();
          callback(event, session);
        };
        window.addEventListener('storage', listener);
        return {
          data: {
            listener: {
              subscription: {
                unsubscribe: () => window.removeEventListener('storage', listener)
              }
            }
          }
        };
      },
      signUp: ({ email, password }) => {
        return Promise.resolve(mockSignUp(email, password));
      },
      signInWithPassword: ({ email, password }) => {
        return Promise.resolve(mockSignIn(email, password));
      },
      signOut: () => {
        return Promise.resolve(mockSignOut());
      }
    }
  };
};
