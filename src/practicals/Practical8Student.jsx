// Practical 8: Student Management System (CRUD with Supabase)
// CRUD operations, real-time name search filter, total student count and average marks
import React, { useState, useEffect } from 'react';
import { getSupabase } from '../services/supabaseClient';
import { GraduationCap, Search, Edit3, Trash2, Plus, CheckCircle, Database, Award, BookOpen, User } from 'lucide-react';

export default function Practical8Student({ onToast, onOpenSupabaseModal }) {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [course, setCourse] = useState('');
  const [marks, setMarks] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMock, setIsMock] = useState(true);

  // READ: loadStudents
  const loadStudents = async () => {
    setLoading(true);
    try {
      const client = getSupabase();
      setIsMock(client.isMock);
      const { data, error } = await client
        .from('students')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        if (onToast) onToast(`Supabase Error: ${error.message}`, 'error');
      } else {
        setStudents(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // CREATE and UPDATE: saveStudent
  const saveStudent = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Validation as specified in practical manual
    if (name.trim() === '' || rollNo.trim() === '') {
      if (onToast) onToast('Please enter both student Name and Roll Number', 'error');
      return;
    }

    if (isNaN(parseFloat(marks))) {
      if (onToast) onToast('Enter marks as a valid number', 'error');
      return;
    }

    const row = {
      name: name.trim(),
      roll_no: rollNo.trim(),
      course: course.trim(),
      marks: parseFloat(marks)
    };

    setLoading(true);
    const client = getSupabase();

    if (editId === null) {
      const { error } = await client.from('students').insert(row);
      if (error) {
        if (onToast) onToast(`Insert error: ${error.message}`, 'error');
      } else {
        if (onToast) onToast('Student record saved!', 'success');
      }
    } else {
      const { error } = await client.from('students').update(row).eq('id', editId);
      if (error) {
        if (onToast) onToast(`Update error: ${error.message}`, 'error');
      } else {
        if (onToast) onToast('Student record updated!', 'success');
      }
    }

    // Clear form
    setName('');
    setRollNo('');
    setCourse('');
    setMarks('');
    setEditId(null);
    loadStudents();
  };

  // EDIT: editStudent
  const editStudent = (s) => {
    setName(s.name);
    setRollNo(s.roll_no);
    setCourse(s.course || '');
    setMarks(String(s.marks));
    setEditId(s.id);
    if (onToast) onToast(`Editing record of ${s.name}`, 'info');
  };

  // DELETE: deleteStudent
  const deleteStudent = async (id) => {
    setLoading(true);
    const client = getSupabase();
    const { error } = await client.from('students').delete().eq('id', id);
    if (error) {
      if (onToast) onToast(`Delete error: ${error.message}`, 'error');
    } else {
      if (onToast) onToast('Student record deleted', 'info');
    }
    loadStudents();
  };

  const cancelEdit = () => {
    setName('');
    setRollNo('');
    setCourse('');
    setMarks('');
    setEditId(null);
  };

  // SEARCH: keep only the students whose name matches search text
  const shown = students.filter((s) =>
    (s.name || '').toLowerCase().includes(search.toLowerCase())
  );

  // SUMMARY: calculate the average marks
  const average =
    students.length === 0
      ? 0
      : students.reduce((sum, s) => sum + Number(s.marks || 0), 0) / students.length;

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 8</div>
        <h2 className="rn-heading">Student Management</h2>
        <div
          className="rn-backend-badge"
          onClick={onOpenSupabaseModal}
          title="Click to configure Supabase"
        >
          <Database size={13} />
          <span>Backend: {isMock ? 'Local Mock Store' : 'Supabase Cloud'}</span>
          <span className="config-hint">(Config)</span>
        </div>
      </div>

      {/* SUMMARY BANNER as specified: Total students: {students.length} | Average marks: {average.toFixed(1)} */}
      <div className="rn-student-summary-banner">
        <div className="summary-stat-box">
          <span className="summary-stat-label">Total Students</span>
          <span className="summary-stat-number">{students.length}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-stat-box">
          <span className="summary-stat-label">Average Marks</span>
          <span className="summary-stat-number">{average.toFixed(1)}</span>
        </div>
      </div>

      {/* Form Fields for Student */}
      <form onSubmit={saveStudent} className="rn-student-form">
        <div className="rn-form-field">
          <input
            type="text"
            className="rn-text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student Name (e.g. Pooja Hegde)"
          />
        </div>

        <div className="rn-form-field">
          <input
            type="text"
            className="rn-text-input"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Roll Number (e.g. CS-2024-21)"
          />
        </div>

        <div className="rn-form-field">
          <input
            type="text"
            className="rn-text-input"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course (e.g. Computer Science)"
          />
        </div>

        <div className="rn-form-field">
          <input
            type="number"
            className="rn-text-input"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Marks (e.g. 88.5)"
            step="any"
          />
        </div>

        <div className="rn-form-actions">
          <button type="submit" className="rn-button rn-button-primary">
            {editId === null ? (
              <>
                <Plus size={16} />
                <span>Add Student</span>
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                <span>Update Student</span>
              </>
            )}
          </button>

          {editId !== null && (
            <button
              type="button"
              className="rn-button rn-button-ghost"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* SEARCH BOX: placeholder="Search by name" */}
      <div className="rn-student-search-container">
        <div className="rn-search-box">
          <Search size={16} className="rn-input-icon" />
          <input
            type="text"
            className="rn-text-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </div>
      </div>

      {/* FLATLIST with data={shown} */}
      <div className="rn-student-list-container">
        <div className="rn-list-header">
          <span className="list-title">
            Student Records {search ? `(Filtered: ${shown.length})` : `(${shown.length})`}
          </span>
          {loading && <span className="rn-refreshing">Updating...</span>}
        </div>

        {shown.length === 0 ? (
          <div className="rn-empty-state">
            <p>
              {search
                ? `No students matching "${search}"`
                : 'No student records yet. Add a student above!'}
            </p>
          </div>
        ) : (
          <div className="rn-student-cards-scroll">
            {shown.map((student) => (
              <div key={student.id} className="rn-student-card">
                <div className="student-main-info">
                  <div className="student-title-row">
                    <span className="student-name">{student.name}</span>
                    <span className="student-roll-badge">{student.roll_no}</span>
                  </div>

                  <div className="student-sub-row">
                    <span className="student-course">
                      <BookOpen size={13} /> {student.course || 'Unassigned'}
                    </span>
                    <span className="student-marks-pill">
                      <Award size={13} /> {student.marks} marks
                    </span>
                  </div>
                </div>

                <div className="student-action-btns">
                  <button
                    type="button"
                    className="rn-mini-btn edit-btn"
                    onClick={() => editStudent(student)}
                    title="Edit student"
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    className="rn-mini-btn delete-btn"
                    onClick={() => deleteStudent(student.id)}
                    title="Delete student"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
