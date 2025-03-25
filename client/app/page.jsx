'use client';
import { useState, useEffect } from 'react';
import ItemForm from '@/components/ItemForm';
import ItemList from '@/components/ItemList';
import { getItems, createItem, deleteItem } from '@/api';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();

      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item) => {
    try {
      const newItem = await createItem(item);
      setItems([newItem, ...items]);
    } catch (err) {
      setError('Failed to add item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">MERN Stack Todo App</h1>
      
      <ItemForm addItem={handleAddItem} />
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <ItemList items={items} deleteItem={handleDeleteItem} />
      )}
    </main>
  );
}