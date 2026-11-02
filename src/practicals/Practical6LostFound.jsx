// Practical 6: Lost and Found (CRUD with Supabase)
// Create, Read, Update, and Delete items stored in Supabase (or persistent mock)
import React, { useState, useEffect } from 'react';
import { getSupabase } from '../services/supabaseClient';
import { Tag, MapPin, Phone, Edit3, Trash2, Plus, Database, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export default function Practical6LostFound({ onToast, onOpenSupabaseModal }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Lost');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMock, setIsMock] = useState(true);

  // READ: loadItems
  const loadItems = async () => {
    setLoading(true);
    try {
      const client = getSupabase();
      setIsMock(client.isMock);
      const { data, error } = await client
        .from('items')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        if (onToast) onToast(`Supabase Error: ${error.message}`, 'error');
      } else {
        setItems(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // CREATE and UPDATE: saveItem
  const saveItem = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (title.trim() === '') {
      if (onToast) onToast('Please enter an item title', 'error');
      return;
    }

    const row = {
      title: title.trim(),
      description: description.trim(),
      type,
      place: place.trim(),
      phone: phone.trim()
    };

    setLoading(true);
    const client = getSupabase();

    if (editId === null) {
      const { error } = await client.from('items').insert(row);
      if (error) {
        if (onToast) onToast(`Insert error: ${error.message}`, 'error');
      } else {
        if (onToast) onToast('New item added to database!', 'success');
      }
    } else {
      const { error } = await client.from('items').update(row).eq('id', editId);
      if (error) {
        if (onToast) onToast(`Update error: ${error.message}`, 'error');
      } else {
        if (onToast) onToast('Item updated successfully!', 'success');
      }
    }

    // Clear form
    setTitle('');
    setDescription('');
    setPlace('');
    setPhone('');
    setType('Lost');
    setEditId(null);
    loadItems();
  };

  // EDIT: editItem
  const editItem = (item) => {
    setTitle(item.title);
    setDescription(item.description || '');
    setType(item.type || 'Lost');
    setPlace(item.place || '');
    setPhone(item.phone || '');
    setEditId(item.id);
    if (onToast) onToast(`Editing "${item.title}"`, 'info');
  };

  // DELETE: deleteItem
  const deleteItem = async (id) => {
    setLoading(true);
    const client = getSupabase();
    const { error } = await client.from('items').delete().eq('id', id);
    if (error) {
      if (onToast) onToast(`Delete error: ${error.message}`, 'error');
    } else {
      if (onToast) onToast('Item removed from database', 'info');
    }
    loadItems();
  };

  const cancelEdit = () => {
    setTitle('');
    setDescription('');
    setPlace('');
    setPhone('');
    setType('Lost');
    setEditId(null);
  };

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 6</div>
        <h2 className="rn-heading">Lost & Found</h2>
        <div className="rn-backend-badge" onClick={onOpenSupabaseModal} title="Click to configure Supabase">
          <Database size={13} />
          <span>Backend: {isMock ? 'Local Mock Store' : 'Supabase Cloud'}</span>
          <span className="config-hint">(Config)</span>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={saveItem} className="rn-crud-form">
        {/* Type Toggle Buttons */}
        <div className="rn-type-selector">
          <button
            type="button"
            className={`rn-type-btn lost ${type === 'Lost' ? 'active' : ''}`}
            onClick={() => setType('Lost')}
          >
            Lost
          </button>
          <button
            type="button"
            className={`rn-type-btn found ${type === 'Found' ? 'active' : ''}`}
            onClick={() => setType('Found')}
          >
            Found
          </button>
        </div>

        {/* Selected: {type} text */}
        <div className="rn-selected-type-text">
          Selected: <strong className={type.toLowerCase()}>{type}</strong>
        </div>

        {/* Four TextInput boxes */}
        <div className="rn-form-field">
          <input
            type="text"
            className="rn-text-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (e.g. Blue Water Bottle)"
          />
        </div>

        <div className="rn-form-field">
          <input
            type="text"
            className="rn-text-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (e.g. Left in Lab 2)"
          />
        </div>

        <div className="rn-form-field">
          <input
            type="text"
            className="rn-text-input"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Place (e.g. Room 302, Library)"
          />
        </div>

        <div className="rn-form-field">
          <input
            type="tel"
            className="rn-text-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
          />
        </div>

        <div className="rn-form-actions">
          <button type="submit" className="rn-button rn-button-primary">
            {editId === null ? (
              <>
                <Plus size={16} />
                <span>Add Item</span>
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                <span>Update Item</span>
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

      {/* FlatList of Items */}
      <div className="rn-items-list-area">
        <div className="rn-list-header">
          <span className="list-title">Registered Items ({items.length})</span>
          {loading && <span className="rn-refreshing">Syncing...</span>}
        </div>

        {items.length === 0 ? (
          <div className="rn-empty-state">
            <p>No items found in the database. Add your first item above!</p>
          </div>
        ) : (
          <div className="rn-items-scroll">
            {items.map((item) => (
              <div
                key={item.id}
                className={`rn-lost-item-card ${item.type.toLowerCase()}-card`}
              >
                <div className="item-badge-row">
                  <span className={`rn-item-tag ${item.type.toLowerCase()}`}>
                    {item.type}
                  </span>
                  <span className="item-id">ID: #{item.id}</span>
                </div>

                <h4 className="item-card-title">{item.title}</h4>
                {item.description && (
                  <p className="item-card-desc">{item.description}</p>
                )}

                <div className="item-card-meta">
                  {item.place && (
                    <span className="meta-info">
                      <MapPin size={13} /> {item.place}
                    </span>
                  )}
                  {item.phone && (
                    <span className="meta-info">
                      <Phone size={13} /> {item.phone}
                    </span>
                  )}
                </div>

                <div className="item-card-buttons">
                  <button
                    type="button"
                    className="rn-mini-btn edit-btn"
                    onClick={() => editItem(item)}
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    className="rn-mini-btn delete-btn"
                    onClick={() => deleteItem(item.id)}
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
