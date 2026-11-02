// mockStore.js - In-browser persistence for Practicals 6, 7, and 8
// Pre-populated with realistic initial data so the user can test immediately

const STORAGE_KEYS = {
  ITEMS: 'rn_practical_items',
  STUDENTS: 'rn_practical_students',
  USERS: 'rn_practical_users',
  SESSION: 'rn_practical_session',
  CONFIG: 'rn_supabase_config'
};

const INITIAL_ITEMS = [
  {
    id: 1,
    title: 'Blue Water Bottle',
    description: 'Milton stainless steel bottle left in Room 302',
    type: 'Lost',
    place: 'Main Seminar Hall',
    phone: '9876543210'
  },
  {
    id: 2,
    title: 'Black HP Scientific Calculator',
    description: 'Found on table 4 during Practical Exam',
    type: 'Found',
    place: 'Computer Lab 2',
    phone: '9123456780'
  },
  {
    id: 3,
    title: 'Titan Fastrack Watch',
    description: 'Leather strap black dial watch',
    type: 'Lost',
    place: 'College Library 1st Floor',
    phone: '9988776655'
  }
];

const INITIAL_STUDENTS = [
  {
    id: 1,
    name: 'Aarav Sharma',
    roll_no: 'CS-2024-01',
    course: 'Computer Science',
    marks: 88.5
  },
  {
    id: 2,
    name: 'Ananya Patel',
    roll_no: 'CS-2024-04',
    course: 'Information Technology',
    marks: 92.0
  },
  {
    id: 3,
    name: 'Rohan Deshmukh',
    roll_no: 'CS-2024-12',
    course: 'Computer Science',
    marks: 79.5
  },
  {
    id: 4,
    name: 'Sneha Verma',
    roll_no: 'CS-2024-18',
    course: 'Artificial Intelligence',
    marks: 84.0
  }
];

export const getStoredConfig = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return {
    url: '',
    anonKey: '',
    useMock: true
  };
};

export const saveStoredConfig = (config) => {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
};

// Mock Items CRUD
export const getMockItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ITEMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(INITIAL_ITEMS));
  return INITIAL_ITEMS;
};

export const saveMockItem = (item, editId = null) => {
  const items = getMockItems();
  let nextItems;
  if (editId !== null) {
    nextItems = items.map(i => i.id === editId ? { ...i, ...item } : i);
  } else {
    const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    nextItems = [{ id: newId, ...item }, ...items];
  }
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(nextItems));
  return nextItems;
};

export const deleteMockItem = (id) => {
  const items = getMockItems();
  const nextItems = items.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(nextItems));
  return nextItems;
};

// Mock Students CRUD
export const getMockStudents = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  return INITIAL_STUDENTS;
};

export const saveMockStudent = (student, editId = null) => {
  const students = getMockStudents();
  let next;
  if (editId !== null) {
    next = students.map(s => s.id === editId ? { ...s, ...student } : s);
  } else {
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    next = [{ id: newId, ...student }, ...students];
  }
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(next));
  return next;
};

export const deleteMockStudent = (id) => {
  const students = getMockStudents();
  const next = students.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(next));
  return next;
};

// Mock Auth
export const getMockUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const starter = [{ email: 'student@example.com', password: 'password123' }];
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(starter));
  return starter;
};

export const getMockSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
};

export const setMockSession = (session) => {
  if (session) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
};

export const mockSignUp = (email, password) => {
  const users = getMockUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { data: null, error: { message: 'User already registered' } };
  }
  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  const session = { user: { email, id: 'mock-user-' + Date.now() } };
  setMockSession(session);
  return { data: { session, user: session.user }, error: null };
};

export const mockSignIn = (email, password) => {
  const users = getMockUsers();
  const match = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!match) {
    return { data: null, error: { message: 'Invalid email or password' } };
  }
  const session = { user: { email: match.email, id: 'mock-user-' + match.email } };
  setMockSession(session);
  return { data: { session, user: session.user }, error: null };
};

export const mockSignOut = () => {
  setMockSession(null);
  return { error: null };
};
