
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { ShoppingCart, Search, Sun, Moon } from './components/Icons';

const LOGO_URL = 'https://i.postimg.cc/dts7TZmg/ARTBRASIL.png';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const categories = ['Todos', 'Santos', 'Entidades', 'Ciganos', 'Orixás', 'Outros'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeCategory === 'Todos') return matchesSearch;
      
      const nome = p.nome.toLowerCase();
      if (activeCategory === 'Santos' && (nome.includes('são') || nome.includes('santa') || nome.includes('santo') || nome.includes('n.s.'))) return matchesSearch;
      if (activeCategory === 'Ciganos' && nome.includes('cigan')) return matchesSearch;
      if (activeCategory === 'Orixás' && (nome.includes('oxum') || nome.includes('yemanjá') || nome.includes('iemanjá') || nome.includes('ogum') || nome.includes('xangô') || nome.includes('oxalá') || nome.includes('iansã'))) return matchesSearch;
      if (activeCategory === 'Entidades' && (nome.includes('exú') || nome.includes('pomba gira') || nome.includes('zé ') || nome.includes('preto velho') || nome.includes('cabocla') || nome.includes('marinheiro') || nome.includes('légua'))) return matchesSearch;
      
      const isOther = !['Santos', 'Ciganos', 'Orixás', 'Entidades'].some(cat => {
          const n = p.nome.toLowerCase();
          if (cat === 'Santos' && (n.includes('são') || n.includes('santa') || n.includes('santo') || n.includes('n.s.'))) return true;
          if (cat === 'Ciganos' && n.includes('cigan')) return true;
          if (cat === 'Orixás' && (n.includes('oxum') || n.includes('yemanjá') || n.includes('iemanjá') || n.includes('ogum') || n.includes('xangô') || n.includes('oxalá') || n.includes('iansã'))) return true;
          if (cat === 'Entidades' && (n.includes('exú') || n.includes('pomba gira') || n.includes('zé ') || n.includes('preto velho') || n.includes('cabocla') || n.includes('marinheiro') || n.includes('légua'))) return true;
          return false;
      });
      
      if (activeCategory === 'Outros' && isOther) return matchesSearch;

      return false;
    });
  }, [searchTerm, activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300 bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#f5f3ff_0%,_transparent_25%)] dark:bg-none">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-indigo-50/50 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-indigo-50 dark:border-slate-700">
                <img src={LOGO_URL} alt="Art Brasil Logo" className="h-10 w-auto object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">
                  ART<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">BRASIL</span>
                </span>
                <span className="text-[9px] font-bold text-indigo-400 dark:text-indigo-300 uppercase tracking-[0.15em] -mt-1">
                  O PODER QUE VEM DA ARTE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-transparent focus-within:border-indigo-300 dark:focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all shadow-inner">
                <Search className="w-4 h-4 text-indigo-400 mr-2" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="bg-transparent text-sm focus:outline-none w-48 lg:w-64 text-gray-700 dark:text-slate-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm flex items-center justify-center overflow-hidden relative group"
                title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
              >
                <div className={`transition-transform duration-500 transform ${isDarkMode ? 'rotate-0' : 'rotate-180'}`}>
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </div>
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white rounded-xl transition-all active:scale-95 shadow-sm"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800 shadow-md animate-pop">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="flex items-center bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 transition-all">
            <Search className="w-5 h-5 text-indigo-400 mr-3" />
            <input
              type="text"
              placeholder="Pesquisar estátuas..."
              className="bg-transparent text-base focus:outline-none w-full dark:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm transform active:scale-95 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200 dark:shadow-indigo-900/50 shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-indigo-50 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-slate-600 hover:bg-indigo-50/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="mb-4 text-indigo-200 dark:text-slate-700 flex justify-center">
                <Search className="w-16 h-16" />
              </div>
              <p className="text-gray-400 dark:text-slate-500 text-lg font-medium">Ops! Nenhum produto encontrado.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('Todos')}}
                className="mt-4 px-6 py-2 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors font-bold text-sm"
              >
                Ver todos os produtos
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-indigo-50 dark:border-slate-800 py-12 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-indigo-50 dark:border-slate-700">
              <img src={LOGO_URL} alt="Art Brasil Logo" className="h-8 w-auto object-contain" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-lg font-black text-gray-900 dark:text-white tracking-tighter">
                ART<span className="text-indigo-600">BRASIL</span>
              </span>
              <span className="text-[8px] font-bold text-indigo-400 dark:text-indigo-300 uppercase tracking-widest -mt-1">
                O PODER QUE VEM DA ARTE
              </span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xs mx-auto mb-6">Artesanato religioso com acabamento premium e entrega garantida para todo o Brasil.</p>
          <div className="flex justify-center gap-6 text-xs font-bold text-indigo-400 dark:text-indigo-300 uppercase tracking-widest">
            <span className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
               91 98645-3823
            </span>
            <span>•</span>
            <span>Belém-PA</span>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50 dark:border-slate-800 text-[10px] text-gray-400 dark:text-slate-600 font-medium">
            © {new Date().getFullYear()} Art Brasil - Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        isDarkMode={isDarkMode}
      />

      {/* Floating Cart Button */}
      {totalCartItems > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-40 transform hover:scale-110 active:scale-90 transition-all animate-bounce-subtle"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800">
            {totalCartItems}
          </span>
        </button>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 4s infinite ease-in-out; }
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
};

export default App;
