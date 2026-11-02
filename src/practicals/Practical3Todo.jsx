// Practical 3: Todo App
// Tasks can be added, marked as done (strikethrough) and deleted
import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, ListTodo, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Practical3Todo({ onToast }) {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([
    { id: '1', text: 'Complete React Native Lab Record', done: false },
    { id: '2', text: 'Verify Expo SDK 54 dependencies', done: true },
    { id: '3', text: 'Submit project screenshot', done: false }
  ]);

  // ADD: exact algorithm implementation
  const addTodo = (customText) => {
    const textToAdd = typeof customText === 'string' ? customText : task;
    if (textToAdd.trim() === '') return;

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: textToAdd.trim(),
        done: false
      }
    ]);
    setTask('');
    if (onToast) onToast('New task added!', 'success');
  };

  // DONE: exact algorithm implementation
  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const nextState = !t.done;
          if (nextState) {
            try {
              confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
            } catch (e) {}
          }
          return { ...t, done: nextState };
        }
        return t;
      })
    );
  };

  // DELETE: exact algorithm implementation
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    if (onToast) onToast('Task deleted', 'info');
  };

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 3</div>
        <h2 className="rn-heading">Todo App</h2>
        <p className="rn-subheading">State Management & Strikethrough Lists</p>
      </div>

      {/* Progress pill */}
      <div className="rn-todo-stats">
        <span>Progress:</span>
        <span className="stats-pill">
          {completedCount} of {todos.length} done
        </span>
      </div>

      {/* Input Row: TextInput + Button "Add" */}
      <div className="rn-todo-input-row">
        <input
          type="text"
          className="rn-text-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Enter task (e.g. Study React Hooks)"
        />
        <button
          type="button"
          className="rn-button rn-button-primary rn-btn-inline"
          onClick={() => addTodo()}
        >
          <Plus size={18} />
          <span>Add</span>
        </button>
      </div>

      {/* FlatList simulator */}
      <div className="rn-flatlist-container">
        {todos.length === 0 ? (
          <div className="rn-empty-state">
            <ListTodo size={36} />
            <p>No tasks yet. Type above to add one!</p>
          </div>
        ) : (
          <ul className="rn-flatlist">
            {todos.map((item) => (
              <li key={item.id} className={`rn-todo-item ${item.done ? 'is-done' : ''}`}>
                {/* TouchableOpacity item toggle */}
                <div
                  className="rn-touchable"
                  onClick={() => toggleTodo(item.id)}
                  title="Tap to toggle completion"
                >
                  <div className="rn-checkbox-icon">
                    {item.done ? (
                      <CheckCircle2 size={20} className="checked-icon" />
                    ) : (
                      <Circle size={20} className="unchecked-icon" />
                    )}
                  </div>
                  {/* Style textDecorationLine: item.done ? 'line-through' : 'none' */}
                  <span
                    className="rn-todo-text"
                    style={{
                      textDecoration: item.done ? 'line-through' : 'none',
                      color: item.done ? '#94a3b8' : 'inherit'
                    }}
                  >
                    {item.text}
                  </span>
                </div>

                {/* Delete Button Beside Each Task */}
                <button
                  type="button"
                  className="rn-delete-btn"
                  onClick={() => deleteTodo(item.id)}
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Helpers */}
      <div className="rn-todo-footer-helpers">
        <span className="helper-label">Add quick task:</span>
        <button
          type="button"
          className="rn-mini-btn"
          onClick={() => addTodo('Review Expo SDK 54 docs')}
        >
          <Sparkles size={12} /> Expo SDK 54
        </button>
        <button
          type="button"
          className="rn-mini-btn"
          onClick={() => addTodo('Prepare college presentation')}
        >
          <Sparkles size={12} /> Presentation
        </button>
      </div>
    </div>
  );
}
