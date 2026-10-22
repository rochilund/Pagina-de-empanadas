"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { empanadas, formatPrecio, whatsappLink } from "../data";

type CartState = Record<string, number>;

type CartContextValue = {
  items: CartState;
  total: number;
  cantidad: number;
  agregar: (id: string) => void;
  quitar: (id: string) => void;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartState>({});
  const [abierto, setAbierto] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const cantidad = Object.values(items).reduce((a, b) => a + b, 0);
    const total = Object.entries(items).reduce((acc, [id, n]) => {
      const e = empanadas.find((x) => x.id === id);
      return acc + (e ? e.precio * n : 0);
    }, 0);
    return {
      items,
      total,
      cantidad,
      abierto,
      setAbierto,
      agregar: (id) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 })),
      quitar: (id) =>
        setItems((s) => {
          const n = (s[id] ?? 0) - 1;
          const next = { ...s };
          if (n <= 0) delete next[id];
          else next[id] = n;
          return next;
        }),
    };
  }, [items, abierto]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <BarraPedido />
      <CartDrawer />
    </CartContext.Provider>
  );
}

function BolsaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function CartButton() {
  const { cantidad, setAbierto } = useCart();
  return (
    <button
      onClick={() => setAbierto(true)}
      className="relative inline-flex items-center gap-2 rounded-full bg-rojo px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rojo-oscuro"
    >
      <BolsaIcon />
      Mi pedido
      {cantidad > 0 && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-dorado px-1 text-xs font-bold text-tinta">
          {cantidad}
        </span>
      )}
    </button>
  );
}

/** Barra fija abajo en celulares: el pedido siempre a mano. */
function BarraPedido() {
  const { cantidad, total, setAbierto } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-tinta/10 bg-crema/95 p-3 backdrop-blur md:hidden">
      {cantidad > 0 ? (
        <button
          onClick={() => setAbierto(true)}
          className="flex w-full items-center justify-between rounded-full bg-rojo px-5 py-3.5 font-semibold text-white"
        >
          <span className="flex items-center gap-2">
            <BolsaIcon />
            Ver pedido ({cantidad})
          </span>
          <span className="tabular-nums">{formatPrecio(total)}</span>
        </button>
      ) : (
        <div className="flex gap-2">
          <a
            href="#menu"
            className="flex-1 rounded-full bg-rojo py-3.5 text-center font-semibold text-white"
          >
            Pedir empanadas
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp"
            className="grid w-14 place-items-center rounded-full bg-oliva text-white"
          >
            <WhatsappIcon />
          </a>
        </div>
      )}
    </div>
  );
}

export function WhatsappIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

function CartDrawer() {
  const { items, total, cantidad, agregar, quitar, abierto, setAbierto } = useCart();
  const lineas = Object.entries(items)
    .map(([id, n]) => ({ e: empanadas.find((x) => x.id === id)!, n }))
    .filter((l) => l.e);

  const mensaje = `¡Hola La Esquina! Quiero pedir:\n${lineas
    .map((l) => `• ${l.n}x ${l.e.nombre}`)
    .join("\n")}\nTotal: ${formatPrecio(total)}`;

  return (
    <div
      className={`fixed inset-0 z-50 transition ${abierto ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!abierto}
    >
      <div
        onClick={() => setAbierto(false)}
        className={`absolute inset-0 bg-tinta/50 transition-opacity duration-300 ${
          abierto ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Tu pedido"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-crema shadow-2xl transition-transform duration-300 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-tinta/10 px-6 py-5">
          <h2 className="font-titulo text-2xl font-bold text-rojo">Tu pedido</h2>
          <button
            onClick={() => setAbierto(false)}
            className="rounded-full p-2 text-tinta/60 transition hover:bg-tinta/5 hover:text-tinta"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lineas.length === 0 ? (
            <div className="grid h-full place-items-center text-center text-tinta/60">
              <p>
                Todavía está vacío.
                <br />
                ¿Arrancamos con una de carne?
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-tinta/10">
              {lineas.map(({ e, n }) => (
                <li key={e.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">{e.nombre}</p>
                    <p className="text-sm text-tinta/60">{formatPrecio(e.precio)} c/u</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => quitar(e.id)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-tinta/20 text-lg transition hover:border-rojo hover:text-rojo"
                      aria-label={`Quitar ${e.nombre}`}
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-semibold tabular-nums">{n}</span>
                    <button
                      onClick={() => agregar(e.id)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-tinta/20 text-lg transition hover:border-rojo hover:text-rojo"
                      aria-label={`Agregar ${e.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-tinta/10 px-6 py-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-tinta/70">
              {cantidad} {cantidad === 1 ? "empanada" : "empanadas"}
            </span>
            <span className="font-titulo text-2xl font-bold tabular-nums">{formatPrecio(total)}</span>
          </div>
          <a
            href={lineas.length ? whatsappLink(mensaje) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!lineas.length}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold transition ${
              lineas.length
                ? "bg-rojo text-white hover:bg-rojo-oscuro"
                : "cursor-not-allowed bg-tinta/10 text-tinta/40"
            }`}
          >
            <WhatsappIcon />
            Enviar pedido por WhatsApp
          </a>
        </footer>
      </aside>
    </div>
  );
}
