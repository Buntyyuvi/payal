import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();
const API_URL = 'https://flower-backend-eight.vercel.app/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.products)) return data.products;
    return [];
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, { credentials: 'include' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setProducts(toArray(data));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setProducts(prev => Array.isArray(prev) ? [...prev, data] : [data]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setProducts(prev => Array.isArray(prev) ? prev.map(p => p.id === id ? data : p) : []);
    } catch (error) {
      console.error('Failed to edit product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setProducts(prev => Array.isArray(prev) ? prev.filter(p => p.id !== id) : []);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
