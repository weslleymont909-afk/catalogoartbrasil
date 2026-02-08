
import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingCart } from './Icons';
import { WHATSAPP_NUMBER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  isDarkMode?: boolean;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const total = items.reduce((acc, item) => acc + item.valor * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0 || !customerName || !customerPhone) return;

    const itemsText = items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.nome} (${item.cm}cm) - R$ ${(
            item.valor * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `*NOVO PEDIDO - ARTESANATO SAGRADO*\n\n` +
      `*CLIENTE:* ${customerName}\n` +
      `*CONTATO:* ${customerPhone}\n\n` +
      `*ITENS:*\n${itemsText}\n\n` +
      `*TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-indigo-950/20 dark:bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-[0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-slide-left transition-colors duration-300">
        <div className="p-6 border-b border-indigo-50 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10 transition-colors duration-300">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Seu Carrinho</h2>
            <p className="text-[10px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-widest">{items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-gray-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-2xl transition-all active:scale-95"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-indigo-200 dark:text-slate-700" />
              </div>
              <p className="text-gray-900 dark:text-slate-200 font-bold mb-1">Puxa, está vazio!</p>
              <p className="text-gray-400 dark:text-slate-500 text-sm mb-6">Escolha suas obras favoritas para começar o pedido.</p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
              >
                Explorar Vitrine
              </button>
            </div>
          ) : (
            <>
              {/* Lista de Produtos */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-indigo-50 dark:border-slate-700 shadow-sm"
                  >
                    <div className="w-20 h-20 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.imagem ? (
                        <img src={item.imagem} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-indigo-100 dark:text-slate-700"><ShoppingCart className="w-8 h-8" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-slate-200 line-clamp-1 pr-2">
                          {item.nome}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-300 dark:text-slate-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-widest">{item.cm} cm</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-gray-50 dark:bg-slate-900 rounded-xl p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-black text-gray-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-black text-sm text-indigo-600 dark:text-indigo-400">
                          R$ {(item.valor * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulário do Cliente */}
              <div className="pt-6 border-t border-indigo-50 dark:border-slate-800 space-y-5">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
                   <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Informações de Entrega</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest ml-1">Seu Nome</label>
                    <input
                      type="text"
                      placeholder="Ex: João Silva"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/20 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest ml-1">WhatsApp de Contato</label>
                    <input
                      type="tel"
                      placeholder="(91) 00000-0000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/20 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-indigo-50 dark:border-slate-800 bg-indigo-50/30 dark:bg-slate-900/50">
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">Subtotal do pedido</span>
              <span className="text-3xl font-black text-gray-900 dark:text-white">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <button
              disabled={!customerName || !customerPhone}
              onClick={handleCheckout}
              className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform shadow-2xl active:scale-95 text-sm uppercase tracking-widest ${
                (!customerName || !customerPhone) 
                ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed shadow-none' 
                : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200 dark:shadow-none hover:scale-[1.02]'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              Enviar para WhatsApp
            </button>
            
            {!customerName || !customerPhone ? (
               <p className="text-center text-[10px] text-red-400 dark:text-red-500 mt-6 font-black uppercase tracking-widest">
                ⚠️ Por favor, preencha seus dados acima
              </p>
            ) : (
              <p className="text-center text-[9px] text-indigo-400 dark:text-indigo-500 mt-6 uppercase tracking-[0.2em] font-bold">
                Entre em contato para frete e prazos
              </p>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
