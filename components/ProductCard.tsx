
import React from 'react';
import { Product } from '../types';
import { Plus } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-none border border-indigo-50/50 dark:border-slate-800 overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
        {product.imagem ? (
          <img
            src={product.imagem}
            alt={product.nome}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-indigo-100 dark:text-slate-700 transition-colors group-hover:text-indigo-200 dark:group-hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[9px] uppercase font-black tracking-[0.2em] opacity-60">Sem Imagem</span>
          </div>
        )}
        
        {/* Glass Badge */}
        <div className="absolute top-3 left-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shadow-sm border border-white/50 dark:border-slate-700/50">
          {product.cm} cm
        </div>

        {/* Floating Action (on mobile always visible, on desktop hover) */}
        <div className="absolute inset-0 bg-indigo-900/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      <div className="p-5 flex flex-col h-44">
        <h3 className="text-gray-900 dark:text-slate-200 font-bold text-sm leading-tight line-clamp-2 mb-1 h-10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.nome}
        </h3>
        <p className="text-[10px] font-bold text-indigo-300 dark:text-indigo-500 uppercase tracking-widest mb-4">Escultura Religiosa</p>
        
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase -mb-1">A partir de</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">
              R$ {product.valor.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 active:scale-90 text-white p-3 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200"
            title="Adicionar ao carrinho"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
