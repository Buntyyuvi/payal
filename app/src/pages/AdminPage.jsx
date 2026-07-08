import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Edit2, Trash2, TrendingUp, Package, AlertTriangle, IndianRupee, Plus, X, ClipboardList, Loader, LogOut } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://flower-backend-eight.vercel.app/api/orders';

export default function AdminPage() {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearchInput, setProductSearchInput] = useState('');
  const [orderSearchInput, setOrderSearchInput] = useState('');

  const handleProductSearch = () => setProductSearch(productSearchInput);
  const handleOrderSearch = () => setOrderSearch(orderSearchInput);
  const handleProductKeyDown = (e) => { if (e.key === 'Enter') handleProductSearch(); };
  const handleOrderKeyDown = (e) => { if (e.key === 'Enter') handleOrderSearch(); };

  const fetchOrders = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  };

  const deleteOrder = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchOrders();
      if (selectedOrder?.id === id) setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to delete order:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const defaultProduct = {
    title: '',
    category: 'Character Favorites',
    price: '',
    stock: '',
    img: '/images/WhatsApp Image 2026-07-08 at 18.47.01.jpeg',
    status: 'In Stock'
  };

  const [newProduct, setNewProduct] = useState(defaultProduct);

  const filteredProducts = products.filter(p =>
    !productSearch || p.title.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase())
  );
  const filteredOrders = orders.filter(o =>
    !orderSearch || o.name.toLowerCase().includes(orderSearch.toLowerCase()) || o.email.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, curr) => acc + (parseInt(curr.stock) || 0), 0);
  const lowStockCount = products.filter(p => parseInt(p.stock) < 10).length;

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    let parsedPrice = newProduct.price;
    if (typeof parsedPrice === 'string' && !parsedPrice.includes('₹')) {
       parsedPrice = `₹${parseInt(parsedPrice).toLocaleString()}`;
    }
    const productData = {
      ...newProduct,
      price: parsedPrice,
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 10 ? 'In Stock' : parseInt(newProduct.stock) > 0 ? 'Low Stock' : 'Out of Stock'
    };
    if (editingProductId) {
      editProduct(editingProductId, productData);
    } else {
      addProduct(productData);
    }
    setIsAddModalOpen(false);
    setEditingProductId(null);
    setNewProduct(defaultProduct);
  };

  const handleEditClick = (product) => {
    const priceNumber = product.price.replace(/[^0-9]/g, '');
    setNewProduct({ ...product, price: priceNumber });
    setEditingProductId(product.id);
    setIsAddModalOpen(true);
  };

  const handleAddNewClick = () => {
    setNewProduct(defaultProduct);
    setEditingProductId(null);
    setIsAddModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct({ ...newProduct, img: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const formatPrice = (num) => '₹' + Number(num).toLocaleString();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="bg-white border-b border-slate-100 px-8 py-2 flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          Admin access for Pretty Flowers Studio
        </div>
        <div className="flex gap-4">
          <button onClick={() => { localStorage.removeItem('adminAuth'); navigate('/admin-login'); }} className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-3 h-3" /> Logout
          </button>
        </div>
      </div>

      <nav className="bg-white px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 font-medium border transition-all ${activeTab === 'products' ? 'bg-slate-100 text-slate-800 border-slate-200' : 'text-slate-500 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}><Package className="w-4 h-4" /> Products</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 font-medium border transition-all ${activeTab === 'orders' ? 'bg-slate-100 text-slate-800 border-slate-200' : 'text-slate-500 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}><ClipboardList className="w-4 h-4" /> Orders</button>
        </div>
        <Link to="/" className="text-center">
          <h1 className="text-xl font-bold tracking-widest text-slate-800 leading-none">PRETTY FLOWERS</h1>
          <h2 className="text-lg font-light tracking-[0.3em] text-slate-600 leading-tight">STUDIO</h2>
          <p className="text-pink-500 text-[10px] italic mt-0.5 font-serif">handmade with love</p>
        </Link>
        <div /> {/* spacer */}
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-2">PRODUCT MANAGEMENT</p>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Manage your flower collection</h1>
                <p className="text-slate-500 text-sm">Add, edit, and organize products for the Pretty Flowers Studio storefront with a clean inventory workflow.</p>
              </div>
              <button onClick={handleAddNewClick} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-pink-200">
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-pink-50 p-2 rounded-full text-pink-500"><Package className="w-5 h-5" /></div>
                  <TrendingUp className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">{totalProducts}</h3>
                  <p className="text-slate-400 text-sm">Total Products</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-pink-50 p-2 rounded-full text-pink-500"><ShoppingCart className="w-5 h-5" /></div>
                  <TrendingUp className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">{orders.length}</h3>
                  <p className="text-slate-400 text-sm">Total Orders</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-pink-50 p-2 rounded-full text-pink-500"><AlertTriangle className="w-5 h-5" /></div>
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">{lowStockCount}</h3>
                  <p className="text-slate-400 text-sm">Low Stock Items</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-pink-50 p-2 rounded-full text-pink-500"><IndianRupee className="w-5 h-5" /></div>
                  <TrendingUp className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">₹{orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString()}</h3>
                  <p className="text-slate-400 text-sm">Revenue</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search products by name or category" value={productSearchInput} onChange={e => setProductSearchInput(e.target.value)} onKeyDown={handleProductKeyDown} className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-pink-300" />
                </div>
                <button onClick={handleProductSearch} className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium flex items-center gap-2 transition-all"><Search className="w-4 h-4" /> Search</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-medium">Image</th>
                      <th className="py-4 px-6 font-medium">Product Name</th>
                      <th className="py-4 px-6 font-medium">Category</th>
                      <th className="py-4 px-6 font-medium">Price</th>
                      <th className="py-4 px-6 font-medium">Stock</th>
                      <th className="py-4 px-6 font-medium">Status</th>
                      <th className="py-4 px-6 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-slate-400">No products found.</td>
                      </tr>
                    ) : filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                            <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-bold text-slate-800 text-sm">{product.title}</p>
                          <p className="text-xs text-slate-400">{product.subtitle || 'Beautiful arrangement'}</p>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-500">{product.category}</td>
                        <td className="py-4 px-6 font-bold text-slate-800">{product.price}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{product.stock}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.status === 'In Stock' ? 'bg-green-100 text-green-600' : product.status === 'Low Stock' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleEditClick(product)} className="text-slate-400 hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deleteProduct(product.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                <p>Showing 1 to {filteredProducts.length} of {filteredProducts.length} products</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 hover:bg-slate-50 rounded-full font-medium">Previous</button>
                  <button className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">1</button>
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600">2</button>
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600">3</button>
                  <button className="px-4 py-2 hover:bg-slate-50 rounded-full font-medium">Next</button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <div className="mb-8">
              <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-2">ORDER MANAGEMENT</p>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Manage Orders</h1>
              <p className="text-slate-500 text-sm">View and manage customer orders placed through the storefront.</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search orders by name or email..." value={orderSearchInput} onChange={e => setOrderSearchInput(e.target.value)} onKeyDown={handleOrderKeyDown} className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-pink-300" />
                </div>
                <button onClick={handleOrderSearch} className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium flex items-center gap-2 transition-all"><Search className="w-4 h-4" /> Search</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-medium">Order ID</th>
                      <th className="py-4 px-6 font-medium">Customer</th>
                      <th className="py-4 px-6 font-medium">Items</th>
                      <th className="py-4 px-6 font-medium">Total</th>
                      <th className="py-4 px-6 font-medium">Status</th>
                      <th className="py-4 px-6 font-medium">Date</th>
                      <th className="py-4 px-6 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-slate-400">No orders yet.</td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 font-mono text-xs text-slate-500">#{order.id?.slice(-6).toUpperCase()}</td>
                          <td className="py-4 px-6">
                            <p className="font-bold text-slate-800 text-sm">{order.name}</p>
                            <p className="text-xs text-slate-400">{order.email}</p>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</td>
                          <td className="py-4 px-6 font-bold text-slate-800">{formatPrice(order.total)}</td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-600">{order.status}</span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <button onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} className="text-pink-500 hover:text-pink-700 text-xs font-bold uppercase tracking-wider">
                                {selectedOrder?.id === order.id ? 'Hide' : 'View'}
                              </button>
                              <button onClick={() => setConfirmDeleteId(order.id)} disabled={deletingId === order.id} className="text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50">
                                {deletingId === order.id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedOrder && (
              <div className="mt-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Order #{selectedOrder.id?.slice(-6).toUpperCase()}</h3>
                    <p className="text-slate-400 text-sm">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Customer Details</p>
                    <div className="bg-slate-50 rounded-2xl p-5 space-y-2">
                      <p className="text-sm"><span className="font-medium text-slate-600">Name:</span> {selectedOrder.name}</p>
                      <p className="text-sm"><span className="font-medium text-slate-600">Email:</span> {selectedOrder.email}</p>
                      <p className="text-sm"><span className="font-medium text-slate-600">Phone:</span> {selectedOrder.phone}</p>
                      <p className="text-sm"><span className="font-medium text-slate-600">Address:</span> {selectedOrder.address}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Order Summary</p>
                    <div className="bg-slate-50 rounded-2xl p-5 space-y-2">
                      <p className="text-sm"><span className="font-medium text-slate-600">Items:</span> {selectedOrder.items?.length}</p>
                      <p className="text-sm"><span className="font-medium text-slate-600">Status:</span> {selectedOrder.status}</p>
                      <p className="text-lg font-bold text-pink-500 mt-2">{formatPrice(selectedOrder.total)}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Order Items</p>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-slate-800">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Order?</h2>
            <p className="text-slate-500 text-sm mb-8">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => { deleteOrder(confirmDeleteId); setConfirmDeleteId(null); }} className="flex-1 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={newProduct.img} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 transition-colors cursor-pointer" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                <input required type="text" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm" placeholder="e.g. Sunny Daisy Bouquet" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm">
                  <option>Character Favorites</option>
                  <option>Seasonal Delights</option>
                  <option>All Time Classics</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₹)</label>
                  <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm" placeholder="e.g. 1499" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stock Qty</label>
                  <input required type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 text-sm" placeholder="e.g. 20" />
                </div>
              </div>
              <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-4 rounded-xl transition-colors mt-4">Save Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
